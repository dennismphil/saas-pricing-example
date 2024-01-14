import type { MouseEventHandler, ReactElement } from "react";

interface ButtonProps {
  children: ReactElement | string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const {children, className, ...rest} = props;

  const classes = [
    'text-yellow-900',
    'bg-white border',
    'border-yellow-500',
    'focus:outline-none',
    'hover:bg-yellow-900',
    'hover:text-yellow-100',
    'focus:ring-4',
    'focus:ring-gray-200',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'px-5',
    'py-2.5',
    'me-2',
    'mb-2',
    className ?? ''
  ]

  return (
    <button
      type="button"
      className={classes.join(' ')}
      {...rest}
    >{children}</button>
  );
}
