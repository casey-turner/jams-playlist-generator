import * as React from 'react'

const widths = {
  full: 'mx-auto px-4 sm:px-6 lg:px-8',
  contained: 'container mx-auto px-4 sm:px-6 lg:px-8 ',
}

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: keyof typeof widths
}

export const Container = ({
  width = 'contained',
  children,
  ...props
}: ContainerProps) => {
  return (
    <div className={widths[width]} {...props}>
      {children}
    </div>
  )
}

Container.displayName = 'Container'
