import Translate from '@/components/core/Translate';
import { ConfirmModal as ConfirmModalInterface, ModalResolver } from '@/providers/ModalProvider';

interface Props {
  modal: ConfirmModalInterface;
  onResolve: ModalResolver;
}

export default function ConfirmModal({ modal, onResolve }: Props) {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-24 rounded-16 bg-white p-24">
      <div className="whitespace-pre-line text-18 font-500 text-black">
        <Translate>{modal.content}</Translate>
      </div>
      <div className="flex items-center justify-end gap-24">
        <div
          onClick={() => onResolve({ type: 'cancel' })}
          className="-m-12 cursor-pointer p-12 text-center text-16 font-600 text-gray-500"
        >
          취소
        </div>
        <div
          onClick={() => onResolve({ type: 'confirm' })}
          className="-m-12 cursor-pointer p-12 text-center text-16 font-600 text-primary-500"
        >
          확인
        </div>
      </div>
    </div>
  );
}
