'use client';

import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type Fields = { name: string; email: string; message: string };
export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [feedback, setFeedback] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: Fields = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
    };
    const nextErrors: Partial<Fields> = {};
    if (values.name.length < 2)
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      nextErrors.email = 'Please enter a valid email address.';
    if (values.message.length < 10)
      nextErrors.message = 'Tell me a little more (at least 10 characters).';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      setFeedback('');
      form
        .querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    setStatus('sending');
    setFeedback('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: data.get('website') }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            'Your message could not be sent. Please try LinkedIn instead.'
        );
      setStatus('success');
      setFeedback(
        'Your message has been sent. Thank you for getting in touch.'
      );
      form.reset();
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error && error.name !== 'TimeoutError'
          ? error.message
          : 'The request timed out. Please try again or connect on LinkedIn.'
      );
    }
  }
  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      <div className="form-heading">
        <span className="eyebrow">START A CONVERSATION</span>
        <span className="mono">↗</span>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">
            Your name <span>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="How should I call you?"
            maxLength={100}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">
            Email address <span>*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {errors.email}
            </span>
          )}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">
          What do you have in mind? <span>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="A project, an opportunity, or just a hello…"
          minLength={10}
          maxLength={5000}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-bottom">
        <span>
          Good things start
          <br />
          with a conversation.
        </span>
        <button
          className="button button-primary"
          disabled={status === 'sending'}
          type="submit"
        >
          {status === 'sending' ? (
            <>
              Sending <LoaderCircle className="spin" size={17} />
            </>
          ) : (
            <>
              Send Message <ArrowUpRight size={17} />
            </>
          )}
        </button>
      </div>
      <div
        className={`form-feedback ${status}`}
        role="status"
        aria-live="polite"
      >
        {status === 'success' && <CheckCircle2 size={16} />}
        {feedback}
      </div>
    </form>
  );
}
