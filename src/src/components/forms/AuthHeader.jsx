export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-display text-2xl font-semibold text-text-primary">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-text-muted">{subtitle}</p>
      )}
    </div>
  );
}
