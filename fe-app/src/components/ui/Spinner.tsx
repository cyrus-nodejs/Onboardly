export default function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-4 border-slate-300 border-t-slate-900"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
