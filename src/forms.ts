/**
 * Type-safe form validation and handling utility.
 */

export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

export const RULES = {
  required: (msg = 'This field is required'): ValidationRule => ({
    validate: val => val.trim().length > 0,
    message: msg,
  }),
  email: (msg = 'Invalid email address'): ValidationRule => ({
    validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    message: msg,
  }),
  phone: (msg = 'Invalid Indian phone number'): ValidationRule => ({
    validate: val => /^[6-9]\d{9}$/.test(val.replace(/\D/g, '')),
    message: msg,
  }),
  minLength: (min: number, msg?: string): ValidationRule => ({
    validate: val => val.length >= min,
    message: msg || `Minimum ${min} characters required`,
  }),
  maxLength: (max: number, msg?: string): ValidationRule => ({
    validate: val => val.length <= max,
    message: msg || `Maximum ${max} characters allowed`,
  }),
  pattern: (regex: RegExp, msg: string): ValidationRule => ({
    validate: val => regex.test(val),
    message: msg,
  }),
  url: (msg = 'Invalid URL'): ValidationRule => ({
    validate: val => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    message: msg,
  }),
};

export interface FormConfig {
  [key: string]: ValidationRule[];
}

export interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

/**
 * Creates a form handler that manages state and validation.
 */
export function createFormHandler(
  config: FormConfig,
  onSubmit: (values: Record<string, string>) => Promise<void>,
) {
  const state: FormState = {
    values: {},
    errors: {},
    isSubmitting: false,
  };

  const validateField = (name: string, value: string) => {
    const fieldRules = config[name] || [];
    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        state.errors[name] = rule.message;
        return false;
      }
    }
    delete state.errors[name];
    return true;
  };

  const init = (formId: string) => {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (state.isSubmitting) return;

      state.values = {};
      state.errors = {};
      const formData = new FormData(form);
      let isValid = true;

      // Validate all configured fields, even if they're missing from FormData
      // (e.g. empty inputs/textareas in some environments).
      for (const fieldName of Object.keys(config)) {
        const rawValue = formData.get(fieldName);
        const value = rawValue ? rawValue.toString() : '';
        state.values[fieldName] = value;
        if (!validateField(fieldName, value)) {
          isValid = false;
        }
      }

      // Capture any additional form values not specified in the config.
      formData.forEach((rawValue, key) => {
        if (Object.prototype.hasOwnProperty.call(config, key)) return;
        state.values[key] = rawValue.toString();
      });

      renderErrors(form);

      if (isValid) {
        state.isSubmitting = true;
        const submitBtn = form.querySelector('[type="submit"]') as HTMLButtonElement;
        const originalText = submitBtn?.textContent;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
        }

        try {
          await onSubmit(state.values);
          form.reset();
          state.values = {};
        } catch (err) {
          console.error('Form submission failed:', err);
        } finally {
          state.isSubmitting = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText || 'Submit';
          }
        }
      }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('blur', e => {
        const target = e.target as HTMLInputElement;
        validateField(target.name, target.value);
        renderErrors(form);
      });
    });
  };

  const renderErrors = (form: HTMLFormElement) => {
    form.querySelectorAll('.form-error').forEach(el => (el.textContent = ''));
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

    Object.entries(state.errors).forEach(([name, msg]) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input) {
        input.classList.add('has-error');
        const errorEl = form.querySelector(`#error-${name}`);
        if (errorEl) errorEl.textContent = msg;
      }
    });
  };

  return { init };
}
