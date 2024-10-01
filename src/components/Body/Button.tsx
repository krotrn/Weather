import React, { MouseEventHandler } from 'react'

function Button({className, onClick, children, type}: {className?: string, onClick?: MouseEventHandler<HTMLButtonElement>, children: React.ReactNode, type: "submit" | "reset" | "button"}) {
    return (
        <button className={className} type={type} onClick={onClick}>{children}</button>
  )
}

export default Button