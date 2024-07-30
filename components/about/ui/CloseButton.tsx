import Icon from '@/components/core/Icon';
import useAbout from '@/hooks/about';
import useHistory from '@/hooks/history';

export default function CloseButton() {
  const about = useAbout();
  const history = useHistory();

  function handleClick() {
    if (about.page !== 'landing') about.setPage('landing', 0);
    else history.back();
  }

  return (
    <div
      onClick={handleClick}
      className="jelly jelly-increased absolute left-32 top-32 z-10 -m-16 cursor-pointer rounded-8 p-16 hover:bg-white/10 selected:bg-white/10"
    >
      <Icon type="close" className="w-16 text-white" />
    </div>
  );
}
