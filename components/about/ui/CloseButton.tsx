import Icon from '@/components/core/Icon';
import useHistory from '@/hooks/history';

export default function CloseButton() {
  const history = useHistory();

  function handleClick() {
    history.back();
  }

  return (
    <div
      onClick={handleClick}
      className="jelly jelly-increased absolute left-32 top-32 -m-16 cursor-pointer rounded-8 p-16 hover:bg-white/10 selected:bg-white/10"
    >
      <Icon type="close" className="w-16 text-white" />
    </div>
  );
}
