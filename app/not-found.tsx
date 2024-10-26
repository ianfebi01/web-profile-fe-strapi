'use client'
import Button2 from '@/components/Buttons/Button2'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function NotFound() {
  const router = useRouter()

  return (
    <div className="h-screen flex flex-col items-center justify-center relative">
      <div className="absolute container w-full h-full z-10">
        <Image
          src="/shape.svg"
          fill
          sizes="auto"
          alt="Error image"
          className="object-contain"
        />
      </div>
      <article className=" max-w-xl flex flex-col items-center justify-center text-center p-4 border rounded-lg border-none relative z-20">
        <div className="relative w-60 h-60">
          <Image
            src="/404.svg"
            fill
            sizes="auto"
            alt="Not found image"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="text-xl mb-4">Look like you&apos;ve got lost...</h2>
        <Button2
          variant="primary"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => router.push( '/' )
          }
        >
          Back to home
        </Button2>
      </article>
    </div>
  )
}
