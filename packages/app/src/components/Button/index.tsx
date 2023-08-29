import * as React from 'react'

const style = {
  text: 'font-semibold',
  button:
    'tracking-wide font-semibold py-2 px-4 rounded-full border-2 min-w-[200px]',
}

const colour = {
  primary: {
    button:
      'bg-dark-moss-green hover:bg-transparent text-alice-blue border-dark-moss-green',
    text: 'text-dark-moss-green',
  },
  secondary: {
    button:
      'bg-transparent hover:bg-alice-blue text-alice-blue border-alice-blue',
    text: 'text-alice-blue',
  },
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: keyof typeof style
  colour?: keyof typeof colour
  startIcon?: React.ReactNode
}

export const Button = ({
  style: styleKey = 'button',
  colour: colourKey = 'primary',
  startIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${style[styleKey]} ${colour[colourKey][styleKey]}`}
      {...props}
    >
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
