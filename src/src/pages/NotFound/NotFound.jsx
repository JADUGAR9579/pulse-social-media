import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-7xl font-bold text-accent">404</span>
      <h1 className="font-display text-2xl font-semibold">This page doesn't exist</h1>
      <p className="max-w-sm text-sm text-text-muted">
        The link may be broken, or the page may have moved.
      </p>
      <Link to="/home">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
