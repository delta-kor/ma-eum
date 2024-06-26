import Translate from '@/components/core/Translate';
import { AlertModal as AlertModalInterface, ModalResolver } from '@/providers/ModalProvider';

interface Props {
  modal: AlertModalInterface;
  onResolve: ModalResolver;
}

export default function AlertModal({ modal, onResolve }: Props) {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-24 rounded-16 bg-white p-24">
      <div className="whitespace-pre-line text-18 font-500 text-black">
        <Translate>{modal.content}</Translate>
      </div>
      <div
        onClick={() => onResolve({ type: 'confirm' })}
        className="-m-16 cursor-pointer p-16 text-center text-16 font-600 text-primary-500"
      >
        확인
      </div>
    </div>
  );
}
