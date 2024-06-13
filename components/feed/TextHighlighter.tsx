import { HTMLAttributes, ReactNode, RefObject } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  innerRef?: RefObject<HTMLDivElement>;
  children: string;
}

export default function TextHighlighter({ innerRef, children, ...props }: Props) {
  const urlPattern =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*/g;
  const tagPattern =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*|#[^\s#]+/g;
  const splitText = children.split(tagPattern);
  const matches = children.match(tagPattern) || [];
  const content: ReactNode[] = [];

  for (let i = 0; i < splitText.length; i++) {
    content.push(splitText[i]);
    if (i < matches.length) {
      const chip = matches[i];
      const isUrl = chip.match(urlPattern);

      if (isUrl) {
        content.push(
          <a
            key={i}
            href={chip}
            target="_blank"
            className="cursor-pointer font-500 text-primary-500 underline"
          >
            {chip}
          </a>
        );
      } else {
        content.push(
          <span key={i} className="font-500 text-primary-500">
            {chip}
          </span>
        );
      }
    }
  }

  return (
    <div ref={innerRef} {...props}>
      {content}
    </div>
  );
}
