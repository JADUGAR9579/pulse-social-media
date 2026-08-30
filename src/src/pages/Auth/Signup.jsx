import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

import { signupSchema } from '../../utils/validators';
import { useAuthStore } from '../../store/authStore';
import AuthCard from '../../components/forms/AuthCard';
import AuthHeader from '../../components/forms/AuthHeader';
import FormField from '../../components/forms/FormField';
import PasswordField from '../../components/forms/PasswordField';
import Button from '../../components/ui/Button';

export default function Signup() {
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password', '');

  async function onSubmit(data) {
    setSubmitting(true);
    try {
      await signup(data);
      toast.success('Account created! Verify your email to get started.');
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Simple password strength indicator
  function getStrength(pw) {
    if (!pw) return null;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: 'Weak', color: 'bg-danger', width: 'w-1/4' };
    if (score === 2) return { label: 'Fair', color: 'bg-warning', width: 'w-2/4' };
    if (score === 3) return { label: 'Good', color: 'bg-positive', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-positive', width: 'w-full' };
  }

  const strength = getStrength(password);

  return (
    <>
      <Helmet>
        <title>Sign up · Pulse</title>
      </Helmet>

      <AuthCard>
        <AuthHeader
          title="Create your account"
          subtitle="Join the conversation on Pulse."
        />

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              id="name"
              label="Full name"
              placeholder="Alex Rivera"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />
            <FormField
              id="username"
              label="Username"
              placeholder="alexrivera"
              autoComplete="username"
              error={errors.username?.message}
              {...register('username')}
            />
          </div>

          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="alex@email.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="flex flex-col gap-2">
            <PasswordField
              id="password"
              label="Password"
              placeholder="Min. 8 chars, 1 uppercase, 1 number"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
            {strength && (
              <div className="flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface">
                  <div
                    className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`}
                  />
                </div>
                <span className="text-xs text-text-faint">{strength.label}</span>
              </div>
            )}
          </div>

          <PasswordField
            id="confirmPassword"
            label="Confirm password"
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            size="lg"
            className="mt-1 w-full"
            disabled={submitting}
          >
            {submitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-xs text-text-faint">
          By signing up you agree to Pulse's{' '}
          <button type="button" className="text-accent hover:underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-accent hover:underline">
            Privacy Policy
          </button>
          .
        </p>

        <p className="text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
