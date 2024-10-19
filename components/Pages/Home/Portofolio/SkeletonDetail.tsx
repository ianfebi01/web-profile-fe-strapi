const SkeletonDetail = () => {
  return (
    <div className="article__container mt-20 sm:mt-20 mb-8 flex flex-col gap-4 animate-pulse">
      <div className="my-4 flex flex-col gap-2">
        <div className="h-12 min-w-60 bg-dark"></div>
        <div className="h-4 max-w-xs bg-dark"></div>
      </div>
      <div className="relative aspect-video bg-dark"></div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="h-3 max-w-xs bg-dark"></div>
        <div className="h-3 w-full bg-dark"></div>
        <div className="h-3 w-full bg-dark"></div>
        <div className="h-3 w-full bg-dark"></div>
        <div className="h-3 w-full bg-dark"></div>
        <div className="h-3 w-full bg-dark"></div>
        <div className="h-3 max-w-xs bg-dark"></div>
      </div>
    </div>
  )
}

export default SkeletonDetail
