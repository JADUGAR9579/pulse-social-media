import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

import { loginSchema } from '../../utils/validators';
import { useAuthStore } from '../../store/authStore';
import AuthCard from '../../components/forms/AuthCard';
import AuthHeader from '../../components/forms/AuthHeader';
import FormField from '../../components/forms/FormField';
import PasswordField from '../../components/forms/PasswordField';
import Button from '../../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/home';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', rememberMe: false },
  });

  async function onSubmit(data) {
    setSubmitting(true);
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Log in · Pulse</title>
      </Helmet>

      <AuthCard>
        <AuthHeader
          title="Log in to Pulse"
          subtitle="Welcome back. Enter your details below."
        />

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <FormField
            id="identifier"
            label="Email or username"
            placeholder="alex@pulse.dev"
            autoComplete="username"
            error={errors.identifier?.message}
            {...register('identifier')}
          />

          <PasswordField
            id="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-text-muted">
              <input
                type="checkbox"
                className="accent-accent"
                {...register('rememberMe')}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-1 w-full"
            disabled={submitting}
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </Button>
        </form>

        <div className="relative flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-text-faint">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <p className="rounded-xl border border-border bg-surface px-4 py-3 text-xs text-text-muted">
          <strong className="text-text-primary">Demo credentials:</strong>
          <br />
          Email: <code className="text-accent">alex@pulse.dev</code> &nbsp;/&nbsp;
          Password: <code className="text-accent">Password1</code>
        </p>

        <p className="text-center text-sm text-text-muted">
          New to Pulse?{' '}
          <Link to="/signup" className="text-accent hover:underline">
            Create an account
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
