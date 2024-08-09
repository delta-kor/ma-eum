import GradientIcon from '@/components/core/GradientIcon';
import useTranslate from '@/hooks/translate';

const englishExamples = [
  'When did CSR debut?',
  'Who is the current leader of CSR?',
  "Create a table summarizing CSR's album.",
];

const koreanExamples = [
  '첫사랑은 언제 데뷔했어?',
  '첫사랑의 리더가 누구야?',
  '첫사랑의 앨범을 표로 정리해줘.',
];

interface Props {
  onSelected: (prompt: string) => void;
}

export default function SparkPromptExamples({ onSelected }: Props) {
  const { language } = useTranslate();

  function handleSelect(prompt: string) {
    onSelected(prompt);
  }

  const examples = language === 'ko' ? koreanExamples : englishExamples;

  return (
    <div className="flex w-full flex-col gap-8">
      {examples.map((example, index) => (
        <div
          key={index}
          onClick={() => handleSelect(example)}
          className="flex cursor-pointer items-center gap-12 rounded-16 bg-gray-50 px-24 py-16"
        >
          <GradientIcon type="sparkMessage" className="w-16 shrink-0" />
          <div className="grow text-16 font-500 text-black">{example}</div>
        </div>
      ))}
    </div>
  );
}
