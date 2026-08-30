import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FormField from './FormField';

/**
 * Password input with a visibility toggle button.
 * Extends FormField so all validation + a11y wiring is inherited.
 */
const PasswordField = forwardRef(function PasswordField(props, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      ref={ref}
      type={visible ? 'text' : 'password'}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="text-text-faint hover:text-text-primary"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
      {...props}
    />
  );
});

export default PasswordField;
