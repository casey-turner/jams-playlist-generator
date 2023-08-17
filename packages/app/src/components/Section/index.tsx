import * as React from 'react'

const sectionStyles = {
  contentCentre: 'min-h-[calc(100vh-140px)] flex flex-col justify-center py-8',
  contentTop: 'min-h-[calc(100vh-140px)] py-8',
  contentAuto: 'py-8',
}

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  sectionStyle?: keyof typeof sectionStyles
}

export const Section = ({
  sectionStyle = 'contentCentre',
  children,
  ...props
}: SectionProps) => {
  return (
    <div className={sectionStyles[sectionStyle]} {...props}>
      {children}
    </div>
  )
}

Section.displayName = 'Section'
