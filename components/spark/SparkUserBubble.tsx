interface Props {
  message: string;
}

export default function SparkUserBubble({ message }: Props) {
  return (
    <div className="flex items-center gap-16">
      <div className="text-16 font-600 text-gray-500">You</div>
      <div className="text-14 font-400 text-black">{message}</div>
    </div>
  );
}
