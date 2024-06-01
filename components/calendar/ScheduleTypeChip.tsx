import { ScheduleType } from '@prisma/client';

interface Props {
  active?: boolean;
  type: ScheduleType;
}

export default function ScheduleTypeChip({ active, type }: Props) {
  if (active) return <div className="size-6 rounded-full bg-white" />;
  if (type === ScheduleType.OTHERS) return <div className="size-6 rounded-full bg-gray-500" />;
}
