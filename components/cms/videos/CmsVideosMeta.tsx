import CmsMetaInput from '@/components/cms/videos/CmsMetaInput';
import {
  CoverVideoMeta,
  EpisodeVideoMeta,
  FancamVideoMeta,
  InboundChallengeVideoMeta,
  LinkVideoMeta,
  LiveVideoMeta,
  Members,
  MembersVideoMeta,
  MusicVideoMeta,
  OfficialVideoMeta,
  OutboundChallengeVideoMeta,
  PromotionVideoMeta,
  StageVideoMeta,
  VideoMeta,
} from '@/utils/video';
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
  if (type === 'promotion') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            albumId: formData.get('albumId'),
            order: parseInt(formData.get('order') as string),
            title: formData.get('title'),
            type: 'promotion',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as PromotionVideoMeta)?.albumId}
          id="albumId"
          label="Album Id"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as PromotionVideoMeta)?.title}
          id="title"
          label="Title"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as PromotionVideoMeta)?.order}
          id="order"
          label="Order"
          type="text"
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'music') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            musicId: formData.get('musicId'),
            type: 'music',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as MusicVideoMeta)?.musicId}
          id="musicId"
          label="Music Id"
          type="text"
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'official') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            order: parseInt(formData.get('order') as string),
            title: formData.get('title'),
            type: 'official',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as OfficialVideoMeta)?.title}
          id="title"
          label="Title"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as OfficialVideoMeta)?.order}
          id="order"
          label="Order"
          type="text"
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'stage') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            order: parseInt(formData.get('order') as string),
            sessionId: formData.get('sessionId'),
            tag: formData.get('tag'),
            type: 'stage',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as StageVideoMeta)?.sessionId}
          id="sessionId"
          label="Session Id"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as StageVideoMeta)?.tag}
          id="tag"
          label="Tag"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as StageVideoMeta)?.order}
          id="order"
          label="Order"
          type="text"
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'fancam') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            embed: formData.get('embed') === 'on',
            ownerId: formData.get('ownerId'),
            type: 'fancam',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as FancamVideoMeta)?.ownerId}
          id="ownerId"
          label="Owner Id"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as FancamVideoMeta)?.embed}
          id="embed"
          label="Embed"
          type="checkbox"
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'members') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            members: Members.filter(member => formData.get(member) === 'on'),
            type: 'members',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as MembersVideoMeta)?.members}
          id="member"
          label="Members"
          type="members"
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'cover') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            kind: formData.get('kind'),
            title: formData.get('title'),
            type: 'cover',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as CoverVideoMeta)?.kind}
          id="kind"
          label="Kind (dance | vocal)"
          type="cover"
        />
        <CmsMetaInput
          defaultValue={(data as CoverVideoMeta)?.title}
          id="title"
          label="Title"
          type="text"
        />
      </CmsVideosMetaBase>
    );
  }

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

  if (type === 'link') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            type: 'link',
            videoId: formData.get('videoId'),
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as LinkVideoMeta)?.videoId}
          id="videoId"
          label="Video Id"
          type="text"
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'inbound_challenge') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            from: formData.get('from') || null,
            type: 'inbound_challenge',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as InboundChallengeVideoMeta)?.from}
          id="from"
          label="From"
          type="text"
          optional
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'outbound_challenge') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            music: formData.get('music'),
            to: formData.get('to') || null,
            type: 'outbound_challenge',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as OutboundChallengeVideoMeta)?.music}
          id="music"
          label="Music"
          type="text"
        />
        <CmsMetaInput
          defaultValue={(data as OutboundChallengeVideoMeta)?.to}
          id="to"
          label="To"
          type="text"
          optional
        />
      </CmsVideosMetaBase>
    );
  }

  if (type === 'live') {
    return (
      <CmsVideosMetaBase
        action={formData =>
          onSet({
            disable: formData.get('disable') === 'on',
            type: 'live',
          } as T)
        }
        data={data}
        type={type}
        onRemove={onRemove}
      >
        <CmsMetaInput
          defaultValue={(data as LiveVideoMeta)?.disable}
          id="disable"
          label="Disable"
          type="checkbox"
        />
      </CmsVideosMetaBase>
    );
  }

  return null;
}
