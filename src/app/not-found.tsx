export default function NotFound() {
  return (
    <main className="flex-1 min-h-[60vh] flex items-center bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-row items-center gap-6 sm:gap-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-2xl">?</span>
          </div>
          <div className="flex-1 min-w-[14rem] max-w-2xl">
            <h1 className="text-2xl font-bold text-foreground whitespace-nowrap">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mt-1 whitespace-nowrap">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
