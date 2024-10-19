import { cn } from '@/lib/utils'
import Image from 'next/image'

const ErrorLoadingData = () => {
  return (
    <main
      className={cn(
        'main__section !px-0 sm:px-0 md:px-0 bg-dark relative grow mt-20 flex items-center justify-center'
      )}
    >
      <article className="max-w-xl flex flex-col items-center justify-center text-center p-4 border rounded-lg border-none relative z-20">
        <div className="relative w-60 h-60">
          <Image
            src="/error.svg"
            fill
            sizes="auto"
            alt="Not found image"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="text-xl mb-4">Failed to load data...</h2>
      </article>
    </main>
  )
}

export default ErrorLoadingData
