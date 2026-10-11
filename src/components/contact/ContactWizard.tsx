'use client';

import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react';
import { submitBrief } from '@/app/actions';
import { errorText, validateContact, type BriefErrors } from '@/lib/brief';
import { fill } from '@/lib/paths';
import { Arrow, Icon } from '../Icon';

type T = {
  stepsLabel: string; steps: string[];
  s1Title: string; s1Hint: string; services: string[]; eSvc: string;
  s2Title: string; when: string; times: string[]; msg: string; msgP: string;
  s3Title: string; company: string; companyP: string; via: string; vias: string[];
  sumSvc: string; sumBud: string; sumTime: string; listSep: string;
  back: string; next: string; stepOf: string; okT: string; okD: string;
};
type FormT = {
  name: string; nameP: string; email: string; phone: string; budget: string; budgets: string[];
  submit: string; sending: string; eReq: string; eEmail: string; ePhone: string; eServer: string; again: string;
};

const EMPTY = { name: '', company: '', email: '', phone: '', msg: '', bud: '', when: '', via: '0', website: '' };
type Fields = typeof EMPTY;

/** Three-step quote request: services → project details → contact info. */
export function ContactWizard({ t, f: ft, locale }: { t: T; f: FormT; locale: string }) {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<number[]>([]);
  const [f, setF] = useState<Fields>(EMPTY);
  const [tried, setTried] = useState(false);
  const [svcTried, setSvcTried] = useState(false);
  const [serverErrors, setServerErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [pending, startTransition] = useTransition();
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Move focus to the new step's heading after Next/Back (not on first render).
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step]);

  const go = (n: number) => {
    moved.current = true;
    setStep(n);
  };

  const errs: BriefErrors = tried ? { ...validateContact(f), ...serverErrors } : {};
  const cls = (k: 'name' | 'email' | 'phone') => (errs[k] ? 'field err' : tried && f[k] ? 'field ok' : 'field');
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    setServerErrors({});
  };
  const errSvc = svcTried && sel.length === 0;
  const chosen = sel.slice().sort((a, b) => a - b).map((i) => t.services[i]);

  const next = () => {
    if (step === 1 && sel.length === 0) {
      setSvcTried(true);
      return;
    }
    go(step + 1);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) return next();
    setTried(true);
    if (Object.keys(validateContact(f)).length) return;
    startTransition(async () => {
      const res = await submitBrief({
        source: 'contact',
        locale,
        name: f.name,
        company: f.company,
        email: f.email,
        phone: f.phone,
        services: chosen,
        budget: f.bud === '' ? '' : ft.budgets[+f.bud],
        timing: f.when === '' ? '' : t.times[+f.when],
        contactVia: t.vias[+f.via],
        message: f.msg,
        website: f.website,
      });
      if (res.ok) setStatus('sent');
      else if (res.errors?.services) {
        setSvcTried(true);
        go(1);
      } else if (res.errors) setServerErrors(res.errors);
      else setStatus('error');
    });
  };

  const reset = () => {
    setStatus('idle');
    setStep(1);
    setSel([]);
    setF(EMPTY);
    setTried(false);
    setSvcTried(false);
  };

  if (status === 'sent') {
    return (
      <div className="success" role="status">
        <span className="chk">
          <Icon name="check" />
        </span>
        <h3>{fill(t.okT, { name: f.name.trim() })}</h3>
        <p>{fill(t.okD, { via: t.vias[+f.via] })}</p>
        <button type="button" className="btn btn-line btn-sm" onClick={reset}>
          {ft.again}
        </button>
      </div>
    );
  }

  const radios = (name: keyof Fields, options: string[], autoDir = false) => (
    <div className="opts">
      {options.map((label, i) => (
        <label className="opt" key={label}>
          <input type="radio" name={`c-${name}`} value={i} checked={f[name] === String(i)} onChange={set(name)} />
          <span dir={autoDir ? 'auto' : undefined}>{label}</span>
        </label>
      ))}
    </div>
  );

  const fieldError = (id: string, k: 'name' | 'email' | 'phone') => {
    const text = errorText(errs[k], ft);
    return text ? (
      <span className="msg" id={id}>
        <Icon name="alert" />
        {text}
      </span>
    ) : null;
  };

  const pc = (n: number) => (n < step ? 'done' : n === step ? 'on' : undefined);

  return (
    <>
      <ol className="progress" aria-label={t.stepsLabel}>
        {t.steps.map((label, i) => (
          <StepItem key={label} n={i + 1} label={label} cls={pc(i + 1)} last={i === t.steps.length - 1} step={step} />
        ))}
      </ol>

      <form noValidate onSubmit={onSubmit}>
        {step === 1 && (
          <fieldset className={`${errSvc ? 'field err' : 'field'} wz-step`} aria-describedby={errSvc ? 'c-svc-e' : undefined}>
            <legend>
              <h3 ref={heading} tabIndex={-1}>
                {t.s1Title}
              </h3>
              <span className="wz-hint">{t.s1Hint}</span>
            </legend>
            <div className="svc-pick" style={{ marginTop: 0 }}>
              {t.services.map((label, i) => (
                <label key={label}>
                  <input
                    type="checkbox"
                    checked={sel.includes(i)}
                    onChange={() => {
                      setSel((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
                      setSvcTried(false);
                    }}
                  />
                  <span className="box">
                    <Icon name="check" />
                    {label}
                  </span>
                </label>
              ))}
            </div>
            {errSvc && (
              <span className="msg" id="c-svc-e">
                <Icon name="alert" />
                {t.eSvc}
              </span>
            )}
          </fieldset>
        )}

        {step === 2 && (
          <div className="wz-step">
            <h3 ref={heading} tabIndex={-1}>
              {t.s2Title}
            </h3>
            <fieldset className="field">
              <legend>{ft.budget}</legend>
              {radios('bud', ft.budgets, true)}
            </fieldset>
            <fieldset className="field">
              <legend>{t.when}</legend>
              {radios('when', t.times)}
            </fieldset>
            <div className="field">
              <label htmlFor="c-msg">{t.msg}</label>
              <textarea className="inp" id="c-msg" rows={4} placeholder={t.msgP} value={f.msg} onChange={set('msg')} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wz-step">
            <h3 ref={heading} tabIndex={-1}>
              {t.s3Title}
            </h3>
            <div className="f2">
              <div className={cls('name')}>
                <label htmlFor="c-name">
                  {ft.name} <span className="req">*</span>
                </label>
                <input className="inp" id="c-name" type="text" autoComplete="name" placeholder={ft.nameP} value={f.name} onChange={set('name')} aria-invalid={!!errs.name} aria-describedby={errs.name ? 'c-name-e' : undefined} />
                {fieldError('c-name-e', 'name')}
              </div>
              <div className="field">
                <label htmlFor="c-co">{t.company}</label>
                <input className="inp" id="c-co" type="text" autoComplete="organization" placeholder={t.companyP} value={f.company} onChange={set('company')} />
              </div>
              <div className={cls('email')}>
                <label htmlFor="c-email">
                  {ft.email} <span className="req">*</span>
                </label>
                <input className="inp" id="c-email" type="email" dir="ltr" autoComplete="email" placeholder="name@company.com" value={f.email} onChange={set('email')} aria-invalid={!!errs.email} aria-describedby={errs.email ? 'c-email-e' : undefined} />
                {fieldError('c-email-e', 'email')}
              </div>
              <div className={cls('phone')}>
                <label htmlFor="c-phone">
                  {ft.phone} <span className="req">*</span>
                </label>
                <input className="inp" id="c-phone" type="tel" dir="ltr" autoComplete="tel" placeholder="+90 5XX XXX XX XX" value={f.phone} onChange={set('phone')} aria-invalid={!!errs.phone} aria-describedby={errs.phone ? 'c-phone-e' : undefined} />
                {fieldError('c-phone-e', 'phone')}
              </div>
              <fieldset className="field full">
                <legend>{t.via}</legend>
                {radios('via', t.vias)}
              </fieldset>
            </div>
            <dl className="summary">
              <div>
                <dt>{t.sumSvc}</dt>
                <dd>{chosen.length ? chosen.join(t.listSep) : '—'}</dd>
              </div>
              <div>
                <dt>{t.sumBud}</dt>
                <dd dir="auto">{f.bud !== '' ? ft.budgets[+f.bud] : '—'}</dd>
              </div>
              <div>
                <dt>{t.sumTime}</dt>
                <dd>{f.when !== '' ? t.times[+f.when] : '—'}</dd>
              </div>
            </dl>
            <div className="hp" aria-hidden="true">
              <label htmlFor="c-website">Website</label>
              <input id="c-website" type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
            </div>
            {status === 'error' && (
              <p className="form-alert" role="alert">
                <Icon name="alert" />
                {ft.eServer}
              </p>
            )}
          </div>
        )}

        <div className="wz-nav">
          {step > 1 && (
            <button type="button" className="btn btn-line btn-sm" onClick={() => go(step - 1)}>
              <Icon name="arrowBack" className="dir-ic" />
              {t.back}
            </button>
          )}
          {step === 1 && <small>{fill(t.stepOf, { n: 1 })}</small>}
          {step < 3 ? (
            <button type="button" className="btn btn-gold btn-sm push" onClick={next}>
              {t.next}
              <Arrow />
            </button>
          ) : (
            <button type="submit" className="btn btn-gold push" disabled={pending} aria-busy={pending}>
              {pending ? ft.sending : ft.submit}
              <Arrow />
            </button>
          )}
        </div>
      </form>
    </>
  );
}

function StepItem({ n, label, cls, last, step }: { n: number; label: string; cls?: string; last: boolean; step: number }) {
  return (
    <>
      <li className={cls} aria-current={n === step ? 'step' : undefined}>
        <span className="pn">{n}</span>
        <span className="pl">{label}</span>
      </li>
      {!last && <li className={n < step ? 'bar done' : 'bar'} aria-hidden="true" />}
    </>
  );
}
