import Icon from '@/components/core/Icon';
import useHistory from '@/hooks/history';

export default function MixerPlayerCloseIcon() {
  const history = useHistory();

  function handleClick() {
    history.back();
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
