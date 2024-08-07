import GradientIcon from '@/components/core/GradientIcon';

interface Props {
  message: string;
  streaming: boolean;
}

export default function SparkAiBubble({ message, streaming }: Props) {
  return (
    <div className="mb-32 flex flex-col gap-8 rounded-16 bg-gray-50 p-16">
      <div className="flex items-center gap-8">
        <GradientIcon type="aiMessage" className="w-16" />
        <div className="text-16 font-700 text-primary-500">Spark</div>
      </div>
      <div className="text-14 font-400 leading-6 text-black">{message}</div>
    </div>
  );
}
