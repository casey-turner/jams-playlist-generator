import * as React from 'react'

const theme = {
  primary:
    'bg-white hover:bg-transparent text-black font-bold py-2 px-4 rounded-full border border-white w-40',
  secondary:
    'bg-transparent hover:bg-white text-black font-bold py-2 px-4 rounded-full border border-white w-40',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: keyof typeof theme
}

export const Button = ({
  theme: themeKey = 'primary',
  ...props
}: ButtonProps) => {
  return <button className={theme[themeKey]} {...props} />
}

Button.displayName = 'Button'
