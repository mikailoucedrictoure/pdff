/** Fond nocturne animé : halos de couleur, sol quadrillé en perspective, grain. */
export function Scene({
  children,
  className = "",
  floor = true,
}: {
  children: React.ReactNode;
  className?: string;
  floor?: boolean;
}) {
  return (
    <div className={`scene ${className}`}>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      {floor && <div className="floor" aria-hidden="true" />}
      <div className="grain" aria-hidden="true" />
      {children}
    </div>
  );
}
