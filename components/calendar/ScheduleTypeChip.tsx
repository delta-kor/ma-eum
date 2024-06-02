import Icon, { IconType } from '@/components/core/Icon';
import { ScheduleType } from '@prisma/client';

interface Props {
  active?: boolean;
  kind: 'dot' | 'icon';
  type: ScheduleType;
}

export default function ScheduleTypeChip({ active, kind, type }: Props) {
  if (kind === 'dot') {
    if (active) return <div className="size-6 rounded-full bg-white" />;
    if (type === ScheduleType.ALBUM) return <div className="size-6 rounded-full bg-c-green" />;
    if (type === ScheduleType.PROGRAM) return <div className="size-6 rounded-full bg-c-blue" />;
    if (type === ScheduleType.FANSIGN) return <div className="size-6 rounded-full bg-c-yellow" />;
    if (type === ScheduleType.CONCERT) return <div className="size-6 rounded-full bg-c-red" />;
    if (type === ScheduleType.RADIO) return <div className="size-6 rounded-full bg-c-purple" />;
    if (type === ScheduleType.OTHERS) return <div className="size-6 rounded-full bg-c-gray" />;
  }

  if (kind === 'icon') {
    let icon: IconType, color: string;

    switch (type) {
      case ScheduleType.ALBUM:
        icon = 'music';
        color = 'bg-gradient-green';
        break;
      case ScheduleType.CONCERT:
        icon = 'fire';
        color = 'bg-gradient-red';
        break;
      case ScheduleType.FANSIGN:
        icon = 'star';
        color = 'bg-gradient-yellow';
        break;
      case ScheduleType.PROGRAM:
        icon = 'tv';
        color = 'bg-gradient-primary';
        break;
      case ScheduleType.RADIO:
        icon = 'radio';
        color = 'bg-gradient-purple';
        break;
      case ScheduleType.OTHERS:
      default:
        icon = 'calendar';
        color = 'bg-gradient-gray';
    }

    return (
      <div className={`rounded-8 p-8 ${color}`}>
        <Icon type={icon} className="w-18 text-white" />
      </div>
    );
  }

  return null;
}
