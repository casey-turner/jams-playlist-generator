import AnimatedStars from '@assets/AnimatedStars'

type LoadingProps = {
  title?: string
  copy?: string
}

export const Loading = ({ title, copy }: LoadingProps) => {
  return (
    <div className=" absolute left-1/2 top-1/3 flex w-[95dvw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-3 md:flex-row md:gap-x-3">
      <span className="text-white">
        <AnimatedStars />
      </span>
      <span className="from-pear to-yale-blue bg-gradient-to-r bg-clip-text text-center">
        {title && (
          <h1 className="mb-1 text-3xl font-bold text-transparent md:text-4xl">
            {title}
          </h1>
        )}
        {copy && (
          <p className=" text-sm text-transparent md:text-base">{copy}</p>
        )}
      </span>
    </div>
  )
}

Loading.displayName = 'Loading'
