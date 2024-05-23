'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Transistor({ children }: Props) {
  const pathname = usePathname();
  // const [isInitial, setIsInitial] = useState<boolean>(true);

  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     setIsInitial(false);
  //   }, 2000);
  // }, []);
  //
  // if (isInitial)
  //   return (
  //     <div>
  //       <div>hello</div>
  //       <div className="hidden">{children}</div>
  //     </div>
  //   );

  return (
    <div key={pathname} className="animate-fade">
      {children}
    </div>
  );
}
