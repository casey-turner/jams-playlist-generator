import * as React from 'react'

const width = {
  full: 'mx-auto px-4',
  contained: 'container mx-auto px-4',
}

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: keyof typeof width
}

export const Container = ({
  width: widthKey = 'contained',
  children,
  ...props
}: ContainerProps) => {
  return (
    <div className={width[widthKey]} {...props}>
      {children}
    </div>
  )
}

Container.displayName = 'Container'
