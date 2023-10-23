import AnimatedStars from '@assets/AnimatedStars'

type LoadingProps = {
  title?: string
  copy?: string
}

export const Loading = ({ title, copy }: LoadingProps) => {
  return (
    <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-x-3 md:flex-row">
      <span className="text-white">
        <AnimatedStars />
      </span>
      <span className="from-pear to-yale-blue bg-gradient-to-r bg-clip-text text-center">
        {title && (
          <h1 className="mb-1 text-4xl font-bold text-transparent">{title}</h1>
        )}
        {copy && <p className="text-transparent">{copy}</p>}
      </span>
    </div>
  )
}

Loading.displayName = 'Loading'
