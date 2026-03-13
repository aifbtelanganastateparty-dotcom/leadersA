import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFormHandler, RULES } from '../forms';

describe('Form Utility', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="test-form">
        <input name="email" id="email" />
        <span id="error-email" class="form-error"></span>
        <input name="phone" id="phone" />
        <span id="error-phone" class="form-error"></span>
        <button type="submit">Submit</button>
      </form>
    `;
  });

  it('validates required fields', async () => {
    const onSubmit = vi.fn();
    const handler = createFormHandler(
      {
        email: [RULES.required('Email is required')],
      },
      onSubmit,
    );

    handler.init('test-form');
    const form = document.getElementById('test-form') as HTMLFormElement;

    // Trigger submit with empty values
    form.dispatchEvent(new Event('submit'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(document.getElementById('error-email')?.textContent).toBe('Email is required');
  });

  it('validates email format', async () => {
    const onSubmit = vi.fn();
    const handler = createFormHandler(
      {
        email: [RULES.email('Invalid email')],
      },
      onSubmit,
    );

    handler.init('test-form');
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'not-an-email';

    const form = document.getElementById('test-form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(document.getElementById('error-email')?.textContent).toBe('Invalid email');
  });

  it('submits successfully when valid', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const handler = createFormHandler(
      {
        email: [RULES.required(), RULES.email()],
      },
      onSubmit,
    );

    handler.init('test-form');
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'test@example.com';

    const form = document.getElementById('test-form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    // Wait for the async onSubmit
    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com', phone: '' });
    });
  });

  it('validates Indian phone numbers', () => {
    const rule = RULES.phone();
    expect(rule.validate('9876543210')).toBe(true);
    expect(rule.validate('1234567890')).toBe(false); // Doesn't start with 6-9
    expect(rule.validate('98765')).toBe(false); // Too short
  });
});
