import * as React from 'react'

const theme = {
  primary:
    'flex justify-center items-center bg-white hover:bg-transparent text-black font-bold py-2 px-4 rounded-full border border-white min-w-[200px] uppercase',
  secondary:
    'flex justify-center items-center bg-transparent hover:bg-white text-black font-bold py-2 px-4 rounded-full border border-white min-w-[200px] uppercase',
  text: 'flex justify-center items-center text-black uppercase',
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
      {startIcon && <span className="mr-2 block h-4 w-4">{startIcon}</span>}
      {props.children}
    </button>
  )
}

Button.displayName = 'Button'
