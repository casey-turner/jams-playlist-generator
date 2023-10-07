import * as React from 'react'
import { Link } from 'react-router-dom'

export type TextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  onClick?: () => void
  startIcon?: React.ReactNode
}

export const TextLink = ({ onClick, startIcon, ...props }: TextLinkProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link
      {...props}
      onClick={handleClick}
      className="text-paynes-gray hover:text-pear flex  text-xs font-semibold transition-colors duration-500"
    >
      {startIcon && <div className="mr-0.5 h-4 w-4">{startIcon}</div>}
      {props.children}
    </Link>
  )
}

TextLink.displayName = 'Text Link'
