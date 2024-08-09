'use client';

import Icon from '@/components/core/Icon';
import useModal from '@/hooks/modal';
import { teachSpark } from '@/utils/spark.util';
import { useRef } from 'react';

export default function SparkTeach() {
  const modal = useModal();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleTextareaChange() {
    const element = textareaRef.current;
    if (!element) return;

    element.style.height = '132px';
    element.style.height = element.scrollHeight + 'px';
  }

  async function handleSubmit() {
    const element = textareaRef.current;
    if (!element) return;

    const content = element.value;
    if (!content || !content.trim()) return;

    const teachResult = await teachSpark(content);
    modal.alert(
      teachResult
        ? 'Thank you for your contribution!\nThe information you provided will be reflected in the model after 24 hours.'
        : 'Failed to submit your input. Please try again later.'
    );

    if (teachResult) element.value = '';
  }

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-24">
      <div className="flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex items-center gap-12 lg:gap-16">
          <Icon type="book" className="w-20 shrink-0 text-primary-500 lg:w-24" />
          <div className="text-20 font-700 text-black lg:text-24">Teach Spark</div>
        </div>
        <div className="text-center text-16 font-500 leading-6 text-gray-500 lg:text-18 lg:leading-7">
          Spark isn&apos;t a finished model yet and still needs further training.{' '}
          <br className="hidden md:block" />
          Please share what you know to help us improve it.
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <textarea
          ref={textareaRef}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          maxLength={300}
          name="content"
          placeholder={
            'Write anything about CSR that Spark might not know.\nYou can enter multiple lines of text.\ne.g. The first leader of CSR is Sua.'
          }
          rows={5}
          spellCheck="false"
          onChange={handleTextareaChange}
          className="resize-none self-stretch rounded-16 bg-gray-50 px-20 py-16 text-14 font-400 leading-5 text-black outline-none placeholder:text-gray-500 lg:text-16 lg:leading-6"
        />
        <div
          onClick={handleSubmit}
          className="jelly cursor-pointer select-none self-end rounded-8 bg-primary-500 px-16 py-12 text-16 font-500 text-white hover:scale-105"
        >
          Submit
        </div>
      </div>
    </div>
  );
}
