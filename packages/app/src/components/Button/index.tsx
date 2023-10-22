import * as React from 'react'

const colours = {
  primary:
    'bg-pear hover:bg-yale-blue hover:border-yale-blue hover:text-pear text-yale-blue border-pear transition-colors duration-500',
  secondary:
    'bg-pear hover:bg-yale-blue hover:border-yale-blue hover:text-pear text-yale-blue border-pear transition-colors duration-500',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  colour?: keyof typeof colours
}

export const Button = ({ colour = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`min-w-[160px] rounded-full px-4 py-2 text-sm font-semibold tracking-wide md:min-w-[200px] md:text-base ${colours[colour]}`}
    >
      {props.children}
    </button>
  )
}

Button.displayName = 'Button'
