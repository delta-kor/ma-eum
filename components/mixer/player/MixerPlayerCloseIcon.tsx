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
      className="jelly flex size-details-header-height shrink-0 cursor-pointer items-center justify-center rounded-8 hover:bg-gray-50 selected:bg-gray-50"
    >
      <Icon type="close" className="w-16 text-gray-200" />
    </div>
  );
}
