'use client';

import { ChangeEvent } from 'react';

interface Props {
  nickname: string;
}

export default function TalkWriteFrame({ nickname }: Props) {
  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const element = e.target;
    element.style.height = '120px';
    element.style.height = element.scrollHeight + 'px';
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          name="title"
          placeholder="제목"
          spellCheck="false"
          type="text"
          className="text-24 font-700 text-black outline-none placeholder:text-gray-200"
        />
        <div className="text-18 font-600 text-gray-200">{nickname}</div>
      </div>
      <div className="h-2 bg-gray-100" />
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        name="content"
        placeholder="내용을 입력해주세요."
        rows={5}
        spellCheck="false"
        onChange={handleTextareaChange}
        className="resize-none text-16 font-400 leading-6 text-black outline-none placeholder:text-gray-200"
      />
      <div className="text-14 font-400 leading-5 text-gray-500">
        마음토크는 모두를 위한 공간입니다.
        <br />
        따뜻한 소통을 위해 다음과 같은 글은 삼가해 주시기 바랍니다:
        <ul className="mt-8 list-disc px-20 leading-5">
          <li>욕설 및 비하</li>
          <li>차별적 발언</li>
          <li>정치적 내용</li>
          <li>비슷한 내용의 도배</li>
          <li>관련 없는 홍보</li>
        </ul>
      </div>
    </div>
  );
}
