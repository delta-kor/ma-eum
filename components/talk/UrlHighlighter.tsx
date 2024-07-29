import { ReactNode } from 'react';

interface Props {
  children: string;
}

export default function UrlHighlighter({ children }: Props) {
  const urlPattern =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*/g;
  const splitText = children.split(urlPattern);
  const matches = children.match(urlPattern) || [];
  const content: ReactNode[] = [];

  for (let i = 0; i < splitText.length; i++) {
    content.push(splitText[i]);
    if (i < matches.length) {
      const chip = matches[i];
      content.push(
        <a
          key={i}
          href={chip}
          target="_blank"
          className="inline cursor-pointer font-500 text-primary-500 underline"
        >
          {chip}
        </a>
      );
    }
  }

  return content;
}
