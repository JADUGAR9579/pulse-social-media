import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { MailCheck } from 'lucide-react';

import { forgotPasswordSchema } from '../../utils/validators';
import { authService } from '../../services/authService';
import AuthCard from '../../components/forms/AuthCard';
import AuthHeader from '../../components/forms/AuthHeader';
import FormField from '../../components/forms/FormField';
import Button from '../../components/ui/Button';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(data) {
    setSubmitting(true);
    try {
      await authService.forgotPassword(data);
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <>
        <Helmet><title>Check your email · Pulse</title></Helmet>
        <AuthCard>
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-accent-muted">
              <MailCheck size={32} className="text-accent" />
            </div>
            <AuthHeader
              title="Check your inbox"
              subtitle={`We sent a reset link to ${getValues('email')}. It expires in 15 minutes.`}
            />
            <Link to="/login">
              <Button variant="secondary" size="md">
                Back to login
              </Button>
            </Link>
          </div>
        </AuthCard>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Forgot password · Pulse</title></Helmet>

      <AuthCard>
        <AuthHeader
          title="Forgot your password?"
          subtitle="Enter your email and we'll send you a reset link."
        />

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <FormField
            id="email"
            label="Email address"
            type="email"
            placeholder="alex@pulse.dev"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Remember it?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Back to login
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
