// Max content width + horizontal gutters.
export function PageShell({
  children,
  rail: _rail = false,
}: {
  children: React.ReactNode;
  rail?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      {children}
    </div>
  );
}
