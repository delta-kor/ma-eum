import CmsMetaInput from '@/components/cms/videos/CmsMetaInput';
import { EpisodeVideoMeta, VideoMeta } from '@/utils/video';
import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

interface Props<T extends VideoMeta> {
  data?: T;
  type: T['type'];
  onRemove: (type: T['type']) => void;
  onSet: (data: T) => void;
}

function CmsVideosMetaBase<T extends VideoMeta>({
  data,
  type,
  onRemove,
  children,
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> &
  Omit<Props<T>, 'onSet'>) {
  return (
    <form
      data-active={!!data}
      className="flex flex-col gap-8 rounded-8 border-primary-300 bg-gray-100 px-16 py-12 data-[active=false]:border-3"
      {...props}
    >
      <div className="grow text-16 font-600">{type}</div>
      {children}
      <div className="flex justify-start gap-16">
        <button type="submit" className="cursor-pointer text-14 text-primary-500 underline">
          Save
        </button>
        <button
          type="button"
          onClick={() => onRemove(type)}
          className="cursor-pointer text-14 text-gray-500 underline"
        >
          Remove
        </button>
      </div>
    </form>
  );
}

export default function CmsVideosMeta<T extends VideoMeta>({
  data,
  type,
  onRemove,
  onSet,
}: Props<T>) {
  if (type === 'shorts') {
    return (
      <CmsVideosMetaBase
        action={() => onSet({ type: 'shorts' } as T)}
        data={data}
        type={type}
        onRemove={onRemove}
      />
    );
  }

  if (type === 'episode') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            episode: formData.get('episode'),
            title: formData.get('title'),
            type: 'episode',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as EpisodeVideoMeta)?.episode}
          id="episode"
          label="Episode"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as EpisodeVideoMeta)?.title}
          id="title"
          label="Title"
          type="text"
        />
      </CmsVideosMetaBase>
    );
  }

  return null;
}
