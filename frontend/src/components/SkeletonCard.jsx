function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-card border border-char/10 dark:border-flour/10">
      <div className="aspect-square bg-char/10 dark:bg-flour/10" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 rounded bg-char/10 dark:bg-flour/10" />
        <div className="h-3 w-1/2 rounded bg-char/10 dark:bg-flour/10" />
      </div>
    </div>
  )
}

export default SkeletonCard
