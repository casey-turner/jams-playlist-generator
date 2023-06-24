import * as React from 'react'

const theme = {
  primary:
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
  secondary:
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
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
