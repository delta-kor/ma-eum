import GradientIcon from '@/components/core/GradientIcon';

const examples = [
  'When did CSR debut?',
  'Who is the current leader of CSR?',
  "What are the names of CSR's albums?",
];

export default function SparkPromptExamples() {
  return (
    <div className="flex w-full flex-col gap-8">
      {examples.map((example, index) => (
        <div
          key={index}
          className="flex cursor-pointer items-center gap-12 rounded-16 bg-gray-50 px-24 py-16"
        >
          <GradientIcon type="sparkMessage" className="w-16 shrink-0" />
          <div className="grow text-16 font-500 text-black">{example}</div>
        </div>
      ))}
    </div>
  );
}
