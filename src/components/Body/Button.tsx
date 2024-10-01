import React, { MouseEventHandler } from 'react'

function Button({className, onClick, children, type, disabled}: {className?: string, onClick?: MouseEventHandler<HTMLButtonElement>, children: React.ReactNode, type: "submit" | "reset" | "button", disabled?: boolean}) {
    return (
        <button className={className} type={type} onClick={onClick} disabled = {disabled}>{children}</button>
  )
}

export default Button