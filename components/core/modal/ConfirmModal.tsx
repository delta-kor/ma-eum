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
          className="jelly -m-12 cursor-pointer rounded-8 p-12 text-center text-16 font-400 text-gray-500 transition-colors hover:bg-gray-50 selected:bg-gray-50"
        >
          <Translate>$modal_cancel</Translate>
        </div>
        <div
          onClick={() => onResolve({ type: 'confirm' })}
          className="jelly -m-12 cursor-pointer rounded-8 p-12 text-center text-16 font-700 text-primary-500 transition-colors hover:bg-gray-50 selected:bg-gray-50"
        >
          <Translate>$modal_confirm</Translate>
        </div>
      </div>
    </div>
  );
}
