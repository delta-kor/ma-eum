import TalkLoginContent from '@/components/talk/TalkLoginContent';
import {
  ModalResolver,
  TalkLoginModal as TalkLoginModalInterface,
} from '@/providers/ModalProvider';

interface Props {
  modal: TalkLoginModalInterface;
  onResolve: ModalResolver;
}

export default function TalkLoginModal({ modal, onResolve }: Props) {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-24 rounded-16 bg-white p-24">
      <TalkLoginContent type="modal" onResolve={onResolve} />
    </div>
  );
}
