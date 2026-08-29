import { cn } from '../../lib/cn';

/**
 * Brand mark for Pulse. The ambient glow is the app's signature element —
 * used here at the anchor point (the logo) and echoed sparingly elsewhere
 * (active nav indicator), never as generic decoration.
 */
export default function Logo({ className, showLabel = true }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="pulse-glow relative grid h-9 w-9 place-items-center rounded-xl bg-accent">
        <span className="font-display text-lg font-bold leading-none text-white">P</span>
      </div>
      {showLabel && (
        <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
          Pulse
        </span>
      )}
    </div>
  );
}
