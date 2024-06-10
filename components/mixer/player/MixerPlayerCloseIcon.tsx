import Icon from '@/components/core/Icon';
import { useRouter } from 'next/navigation';

export default function MixerPlayerCloseIcon() {
  const router = useRouter();

  function handleClick() {
    const referrer = document.referrer;
    console.log(referrer);
    router.back();
  }

  return (
    <div
      onClick={handleClick}
      className="flex size-details-header-height cursor-pointer items-center justify-center"
    >
      <Icon type="close" className="w-16 text-gray-200" />
    </div>
  );
}
