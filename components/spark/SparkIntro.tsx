import GradientIcon from '@/components/core/GradientIcon';

export default function SparkIntro() {
  return (
    <div className="flex flex-col items-center gap-16">
      <GradientIcon type="spark" className="w-64" />
      <div className="flex flex-col items-center gap-8">
        <div className="text-center text-32 font-700 text-primary-500">Spark!</div>
        <div className="text-center text-20 font-500 text-gray-500">Ask anything about CSR</div>
      </div>
    </div>
  );
}
