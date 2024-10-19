import { cn } from '@/lib/utils'

interface Props {
  label: string
  bg?: 'dark' | 'dark-secondary'
  className?: string
}
const Chip = ( { label, bg = 'dark', className }: Props ) => {
  return (
    <div
      className={cn( [
        'py-1 px-2 border border-none rounded-md w-fit',
        [bg === 'dark' && 'bg-dark'],
        [bg === 'dark-secondary' && 'bg-dark-secondary'],
        className,
      ] )}
    >
      <span className="text-sm-medium">{label}</span>
    </div>
  )
}

export default Chip
