import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

function Tag(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...otherProps } = props;
  return (
    <div className={twMerge("inline-flex border border-lime-400 gap-2 text-lime-400 px-3 py-1 rounded-full uppercase items-center ", className)} {...otherProps}>
      <span className='text-sm'>&#10038;</span>
      <span>{children}</span>

    </div>
  )
}

export default Tag