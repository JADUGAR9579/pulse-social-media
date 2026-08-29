import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function Login() {
  return (
    <div className="glass flex flex-col gap-5 rounded-2xl p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Log in to Pulse</h1>
        <p className="mt-1 text-sm text-text-muted">Welcome back. Enter your details below.</p>
      </div>

      <form className="flex flex-col gap-3" aria-describedby="login-status">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-text-muted">Email or username</span>
          <input
            type="text"
            name="identifier"
            className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none focus-visible:border-accent"
            autoComplete="username"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-text-muted">Password</span>
          <input
            type="password"
            name="password"
            className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none focus-visible:border-accent"
            autoComplete="current-password"
          />
        </label>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-text-muted">
            <input type="checkbox" className="accent-accent" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-accent hover:underline">
            Forgot password?
          </Link>
        </div>

        <p id="login-status" className="text-xs text-text-faint">
          Authentication is wired up fully in Phase 2 — this form is the visual shell.
        </p>

        <Button type="submit" size="lg" className="mt-1 w-full">
          Log in
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        New to Pulse?{' '}
        <Link to="/signup" className="text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
