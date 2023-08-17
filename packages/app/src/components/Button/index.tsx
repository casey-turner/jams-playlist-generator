import * as React from 'react'

const theme = {
  primary:
    'tracking-wide bg-alice-blue hover:bg-transparent text-dark-moss-green hover:text-alice-blue font-poppins font-semibold py-2 px-4 rounded-full border-2 border-alice-blue min-w-[200px]',
  secondary:
    'tracking-wide bg-transparent hover:bg-alice-blue text-alice-blue font-poppins font-semibold py-2 px-4 rounded-full border border-alice-blue min-w-[200px]',
  text: 'text-alice-blue font-poppins font-semibold',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: keyof typeof theme
  startIcon?: React.ReactNode
}

export const Button = ({
  theme: themeKey = 'primary',
  startIcon,
  ...props
}: ButtonProps) => {
  return (
    <button className={theme[themeKey]} {...props}>
      {startIcon && (
        <span className="flex items-center">
          <span className="mr-2 block h-3 w-3">{startIcon}</span>
          {props.children}
        </span>
      )}
      {!startIcon && props.children}
    </button>
  )
}

Button.displayName = 'Button'
