'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { submitBrief } from '@/app/actions';
import { errorText, validateBrief, type Brief, type BriefErrors } from '@/lib/brief';
import { Arrow, Icon } from '../Icon';

type T = {
  name: string; nameP: string; email: string; phone: string; service: string; budget: string; msg: string; msgP: string;
  budgets: string[]; submit: string; sending: string; reqNote: string;
  eReq: string; eEmail: string; ePhone: string; eSvc: string; eServer: string;
  okT: string; okD: string; again: string;
};

const EMPTY = { name: '', email: '', phone: '', svc: '', budget: '', msg: '', website: '' };

function ErrorMsg({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <span className="msg" id={id}>
      <Icon name="alert" />
      {text}
    </span>
  );
}

/** Short quote form on the homepage (#contact). */
export function QuoteForm({ t, services, locale }: { t: T; services: string[]; locale: string }) {
  const [f, setF] = useState(EMPTY);
  const [tried, setTried] = useState(false);
  const [serverErrors, setServerErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [pending, startTransition] = useTransition();

  const brief = (): Brief => ({
    source: 'home',
    locale,
    name: f.name,
    email: f.email,
    phone: f.phone,
    services: f.svc === '' ? [] : [services[+f.svc]],
    budget: f.budget === '' ? '' : t.budgets[+f.budget],
    message: f.msg,
    website: f.website,
  });

  const errs: BriefErrors = tried ? { ...validateBrief(brief()), ...serverErrors } : {};
  const msg = (k: keyof BriefErrors) => (k === 'services' ? (errs.services ? t.eSvc : undefined) : errorText(errs[k], t));
  const cls = (k: 'name' | 'email' | 'phone') => (errs[k] ? 'field err' : tried && f[k] ? 'field ok' : 'field');
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    setServerErrors({});
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTried(true);
    const data = brief();
    if (Object.keys(validateBrief(data)).length) return;
    startTransition(async () => {
      const res = await submitBrief(data);
      if (res.ok) {
        setStatus('sent');
        setTried(false);
      } else if (res.errors) setServerErrors(res.errors);
      else setStatus('error');
    });
  };

  if (status === 'sent') {
    return (
      <div className="success" role="status">
        <span className="chk">
          <Icon name="check" />
        </span>
        <h3>{t.okT}</h3>
        <p>{t.okD}</p>
        <button
          type="button"
          className="btn btn-line btn-sm"
          onClick={() => {
            setF(EMPTY);
            setStatus('idle');
          }}
        >
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form className="form-grid" noValidate onSubmit={onSubmit}>
      <div className={cls('name')}>
        <label htmlFor="q-name">
          {t.name} <span className="req">*</span>
        </label>
        <input className="inp" id="q-name" type="text" autoComplete="name" placeholder={t.nameP} value={f.name} onChange={set('name')} aria-invalid={!!errs.name} aria-describedby={errs.name ? 'q-name-e' : undefined} />
        <ErrorMsg id="q-name-e" text={msg('name')} />
      </div>
      <div className={cls('email')}>
        <label htmlFor="q-email">
          {t.email} <span className="req">*</span>
        </label>
        <input className="inp" id="q-email" type="email" dir="ltr" autoComplete="email" placeholder="name@company.com" value={f.email} onChange={set('email')} aria-invalid={!!errs.email} aria-describedby={errs.email ? 'q-email-e' : undefined} />
        <ErrorMsg id="q-email-e" text={msg('email')} />
      </div>
      <div className={`${cls('phone')} full`}>
        <label htmlFor="q-phone">
          {t.phone} <span className="req">*</span>
        </label>
        <input className="inp" id="q-phone" type="tel" dir="ltr" autoComplete="tel" placeholder="+90 5XX XXX XX XX" value={f.phone} onChange={set('phone')} aria-invalid={!!errs.phone} aria-describedby={errs.phone ? 'q-phone-e' : undefined} />
        <ErrorMsg id="q-phone-e" text={msg('phone')} />
      </div>
      <fieldset className={`${errs.services ? 'field err' : 'field'} full`} aria-describedby={errs.services ? 'q-svc-e' : undefined}>
        <legend>
          {t.service} <span className="req">*</span>
        </legend>
        <div className="opts">
          {services.map((label, i) => (
            <label className="opt" key={label}>
              <input type="radio" name="q-svc" value={i} checked={f.svc === String(i)} onChange={set('svc')} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <ErrorMsg id="q-svc-e" text={msg('services')} />
      </fieldset>
      <fieldset className="field full">
        <legend>{t.budget}</legend>
        <div className="opts">
          {t.budgets.map((label, i) => (
            <label className="opt" key={label}>
              <input type="radio" name="q-bud" value={i} checked={f.budget === String(i)} onChange={set('budget')} />
              <span dir="auto">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field full">
        <label htmlFor="q-msg">{t.msg}</label>
        <textarea className="inp" id="q-msg" rows={4} placeholder={t.msgP} value={f.msg} onChange={set('msg')} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
      </div>
      {status === 'error' && (
        <p className="form-alert full" role="alert">
          <Icon name="alert" />
          {t.eServer}
        </p>
      )}
      <div className="fsub full">
        <small>{t.reqNote}</small>
        <button type="submit" className="btn btn-gold" disabled={pending} aria-busy={pending}>
          {pending ? t.sending : t.submit}
          <Arrow />
        </button>
      </div>
    </form>
  );
}
