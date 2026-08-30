import { cn } from '../../lib/cn';

/**
 * Glass card wrapper used by Login, Signup, ForgotPassword, OTP, Reset pages.
 */
export default function AuthCard({ className, children }) {
  return (
    <div
      className={cn(
        'glass flex w-full flex-col gap-6 rounded-2xl p-8 shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
