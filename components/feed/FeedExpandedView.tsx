import Icon from '@/components/core/Icon';
import { MouseEvent, useEffect } from 'react';

interface Props {
  hasMultipleMedia: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  thumbnailUrl: string;
  updateMediaIndex: (direction: number) => void;
}

export default function FeedExpandedView({
  hasMultipleMedia,
  open,
  setOpen,
  thumbnailUrl,
  updateMediaIndex,
}: Props) {
  useEffect(() => {
    if (open) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = 'unset';
  }, [open]);

  function handleClose(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black-real/90 p-16 lg:p-64">
      <img key={thumbnailUrl} alt="image" src={thumbnailUrl} className="size-full object-contain" />
      <div
        onClick={handleClose}
        className="absolute right-16 top-16 cursor-pointer rounded-full bg-black-real/30 p-24"
      >
        <Icon type="close" className="w-16 cursor-pointer text-white" />
      </div>
      {hasMultipleMedia && (
        <div className="">
          <div
            onClick={e => {
              e.stopPropagation();
              updateMediaIndex(-1);
            }}
            className="absolute left-24 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black-real/70 p-20"
          >
            <Icon type="left" className="w-16 text-white" />
          </div>
          <div
            onClick={e => {
              e.stopPropagation();
              updateMediaIndex(1);
            }}
            className="absolute right-24 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black-real/70 p-20"
          >
            <Icon type="right" className="w-16 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
