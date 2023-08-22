import AnimatedStars from '@assets/AnimatedStars'

type LoadingProps = {
  title?: string
  copy?: string
}

export const Loading = ({ title, copy }: LoadingProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-x-3">
      <span className="text-white">
        <AnimatedStars />
      </span>
      <span>
        {title && <h1 className="text-4xl font-bold text-white">{title}</h1>}
        {copy && <p className="text-white">{copy}</p>}
      </span>
    </div>
  )
}

Loading.displayName = 'Loading'
