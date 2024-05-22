import Icon from '@/components/core/Icon';

export default function LandingWidget() {
  return (
    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-12 rounded-16 bg-gradient-primary px-16 py-8">
      <Icon type="csr" className="h-20 text-white" />
      <div className="text-22 font-700 text-white">D+662</div>
    </div>
  );
}
