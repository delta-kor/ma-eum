import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
}

export default function CmsButton({ children, ...props }: Props) {
  return (
    <button
      style={{
        backgroundColor: '#E5EDF2',
        borderRadius: '8px',
        color: '#474E53',
        cursor: 'pointer',
        padding: '8px 16px',
        userSelect: 'none',
      }}
      {...props}
    >
      {children}
    </button>
  );
}
