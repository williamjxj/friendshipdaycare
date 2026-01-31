import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
          <span className="text-primary-foreground font-bold text-2xl">?</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground text-balance">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Go back home
          </Link>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link href="/about" className="text-primary hover:text-primary/80">
              About Us
            </Link>
            <Link href="/programs" className="text-primary hover:text-primary/80">
              Our Programs
            </Link>
            <Link href="/contact" className="text-primary hover:text-primary/80">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
