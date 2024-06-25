'use client';

export default function TalkLoginFrame() {
  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col gap-8">
        <div className="text-20 font-600 text-black">사용하실 닉네임을 입력해주세요</div>
        <div className="text-16 font-500 text-gray-500">닉네임은 나중에 바꿀 수 있어요.</div>
      </div>
      <input
        name="nickname"
        placeholder="닉네임을 입력해주세요"
        type="text"
        className="text-24 font-700 outline-none"
      />
    </div>
  );
}
