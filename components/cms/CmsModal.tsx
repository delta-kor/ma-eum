import React from 'react';

interface Props {
  onCancel: () => void;
  children: React.ReactNode;
}

export default function Modal({ onCancel, children }: Props) {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/20">
      <div className="flex min-w-[400px] flex-col gap-4 rounded-16 bg-white p-16">
        {children}
        <div className="flex justify-center gap-2">
          <div
            onClick={onCancel}
            className="inline-block cursor-pointer rounded-16 px-16 py-8 text-gray-500"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
