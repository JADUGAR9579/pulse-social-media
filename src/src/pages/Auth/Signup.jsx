import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function Signup() {
  return (
    <div className="glass flex flex-col gap-5 rounded-2xl p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-text-muted">Join the conversation.</p>
      </div>

      <form className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-text-muted">Full name</span>
          <input
            type="text"
            name="name"
            className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none focus-visible:border-accent"
            autoComplete="name"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-text-muted">Email</span>
          <input
            type="email"
            name="email"
            className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none focus-visible:border-accent"
            autoComplete="email"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-text-muted">Password</span>
          <input
            type="password"
            name="password"
            className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none focus-visible:border-accent"
            autoComplete="new-password"
          />
        </label>

        <p className="text-xs text-text-faint">
          Validation (Zod + React Hook Form) and OTP verification land in Phase 2.
        </p>

        <Button type="submit" size="lg" className="mt-1 w-full">
          Sign up
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-accent hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
