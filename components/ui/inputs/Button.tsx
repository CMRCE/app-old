import * as React from 'react';
import cx from 'clsx';

export default function Button({as: Component = 'button', variant="primary", className, children, ...props}: React.HTMLProps<HTMLButtonElement> & { as?: any; variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary'; }) {
  return (
    <Component data-component="Button" className={cx(className,
			'p-2 rounded-md text-sm font-semibold',
			'hover:text-opacity-60 hover:bg-gray-80',
			{
				'bg-black text-white': variant === 'primary',
				'bg-brand-yellow text-black': variant === 'secondary',
				'bg-transparent border-b border-black text-black': variant === 'outline-primary',
				'bg-transparent border-b border-brand-yellow text-yellow': variant === 'outline-secondary',
			})} {...props}>
      {children}
    </Component>
  );
}