import Translate from '@/components/core/Translate';
import useTranslate from '@/hooks/translate';
import { ModalResolver, PromptModal as PromptModalInterface } from '@/providers/ModalProvider';
import { i18n } from '@/utils/i18n.util';
import { useRef } from 'react';

interface Props {
  modal: PromptModalInterface;
  onResolve: ModalResolver;
}

export default function PromptModal({ modal, onResolve }: Props) {
  const { language } = useTranslate();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleConfirmClick() {
    const value = inputRef.current?.value || '';
    onResolve({ type: 'prompt', value });
  }

  const placeholder = i18n(modal.placeholder, language);

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-24 rounded-16 bg-white p-24">
      <div className="flex flex-col gap-12">
        <div className="whitespace-pre-line text-18 font-500 text-black">
          <Translate>{modal.content}</Translate>
        </div>
        <input
          ref={inputRef}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder={placeholder}
          spellCheck="false"
          type="text"
          autoFocus
          className="w-full rounded-8 bg-gray-50 p-16 text-16 outline-none"
        />
      </div>
      <div className="flex items-center justify-end gap-24">
        <div
          onClick={() => onResolve({ type: 'cancel' })}
          className="jelly -m-12 cursor-pointer rounded-8 p-12 text-center text-16 font-400 text-gray-500 transition-colors hover:bg-gray-50 selected:bg-gray-50"
        >
          <Translate>$modal_cancel</Translate>
        </div>
        <div
          onClick={handleConfirmClick}
          className="jelly -m-12 cursor-pointer rounded-8 p-12 text-center text-16 font-700 text-primary-500 transition-colors hover:bg-gray-50 selected:bg-gray-50"
        >
          <Translate>$modal_confirm</Translate>
        </div>
      </div>
    </div>
  );
}
