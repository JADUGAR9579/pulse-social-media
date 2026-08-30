import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';

import { authService } from '../../services/authService';
import AuthCard from '../../components/forms/AuthCard';
import AuthHeader from '../../components/forms/AuthHeader';
import Button from '../../components/ui/Button';

const CODE_LENGTH = 6;

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [submitting, setSubmitting] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const inputRefs = useRef([]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  function handleDigitChange(index, value) {
    const char = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill('');
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  }

  async function onSubmit(e) {
    e.preventDefault();
    const otp = digits.join('');
    if (otp.length < CODE_LENGTH) {
      toast.error('Enter the full 6-digit code.');
      return;
    }
    setSubmitting(true);
    try {
      await authService.verifyOtp({ otp });
      toast.success('Email verified!');
      navigate('/home');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleResend() {
    setResendCountdown(30);
    toast.success('New code sent!');
  }

  return (
    <>
      <Helmet><title>Verify email · Pulse</title></Helmet>

      <AuthCard>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-accent-muted">
            <ShieldCheck size={28} className="text-accent" />
          </div>
          <AuthHeader
            title="Verify your email"
            subtitle={`We sent a 6-digit code to ${email}. Enter it below.`}
          />
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div
            className="flex justify-center gap-2"
            onPaste={handlePaste}
            role="group"
            aria-label="One-time passcode input"
          >
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                aria-label={`Digit ${i + 1}`}
                className={`h-12 w-12 rounded-xl border text-center text-lg font-semibold
                  text-text-primary outline-none transition-colors
                  focus-visible:border-accent
                  ${digit ? 'border-accent bg-accent-muted' : 'border-border bg-bg'}`}
              />
            ))}
          </div>

          <p className="text-center text-xs text-text-faint">
            Hint: the code is <code className="text-accent">123456</code>
          </p>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting || digits.join('').length < CODE_LENGTH}
          >
            {submitting ? 'Verifying…' : 'Verify email'}
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Didn't receive it?{' '}
          {resendCountdown > 0 ? (
            <span className="text-text-faint">Resend in {resendCountdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-accent hover:underline"
            >
              Resend code
            </button>
          )}
        </p>

        <p className="text-center text-sm text-text-muted">
          <Link to="/login" className="text-accent hover:underline">
            Back to login
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
