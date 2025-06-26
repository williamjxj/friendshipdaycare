export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
          <span className="text-primary-foreground font-bold text-2xl">F</span>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-48 animate-pulse"></div>
          <div className="h-3 bg-muted/60 rounded w-32 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
