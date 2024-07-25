import Translate from '@/components/core/Translate';
import { AlertModal as AlertModalInterface, ModalResolver } from '@/providers/ModalProvider';

interface Props {
  modal: AlertModalInterface;
  onResolve: ModalResolver;
}

export default function AlertModal({ modal, onResolve }: Props) {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-8 rounded-16 bg-white p-24">
      <div className="text-20 font-600 text-black">
        <Translate>$modal_alert</Translate>
      </div>
      <div className="whitespace-pre-line text-18 font-500 text-black">
        <Translate>{modal.content}</Translate>
      </div>
      <div
        onClick={() => onResolve({ type: 'confirm' })}
        className="-mb-24 -mt-12 flex cursor-pointer items-center justify-center rounded-8 p-16 text-16 font-600 text-primary-500"
      >
        <div className="rounded-8 px-12 py-8 transition-colors hover:bg-gray-50 selected:bg-gray-50">
          <Translate>$modal_ok</Translate>
        </div>
      </div>
    </div>
  );
}
