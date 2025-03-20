import React from 'react'

type InputProps = {
    placeholder?: string;
    className?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
}
export const Input = (props: InputProps) => {
    const { placeholder, isDisabled = false, isRequired = false } = props
  const classNames = `border-gray-400 border-[1px] px-2 py-1 rounded-md input-bg ${props.className}`
  return (
    <input type="text" placeholder={placeholder} className={classNames} disabled={isDisabled} required={isRequired}/>
  )
}
