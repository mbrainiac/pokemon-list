import React from 'react';

export interface ButtonProps {
  label: string;
  className?: string;
  selected?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  selected,
  onClick,
  className,
}) => {
  const cls =
    'inline-flex items-center justify-center m-1 px-4 py-2 text-base font-medium leading-6 whitespace-no-wrap border border-blue-700 rounded-md shadow-sm hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'.split(
      ' '
    );

  if (selected) {
    cls.push('text-white bg-blue-900');
  } else {
    cls.push('text-blue-900');
  }

  return (
    <a href="#_" className={cls.join(' ')} onClick={onClick}>
      {label}
    </a>
  );
};

export { Button };
