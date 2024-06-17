import { Member } from '@/utils/member.util';
import { PaginationOptions, PaginationResult } from '@/utils/pagination.util';
import { AvailableMetaTypes, VideoMetaType } from '@/utils/video.util';

export class PrismaUtil {
  public static buildPagination<T extends { id: string }>(items: T[]): PaginationResult<T> {
    return {
      items,
      nextCursor: items[items.length - 1]?.id || null,
    };
  }

  public static extendVideo(...keys: VideoMetaType[]) {
    if (keys.length === 0) return {};

    const select: Record<string, true> = {};
    for (const key of keys) {
      select[key] = true;
    }

    return {
      metaInfo: {
        select,
      },
    };
  }

  public static extendVideoAll() {
    return PrismaUtil.extendVideo(...AvailableMetaTypes);
  }

  public static filterMember(member: Member | null) {
    return {
      members: member
        ? {
            members: {
              has: member,
            },
          }
        : undefined,
    };
  }

  public static filterMemberExclusive(member: Member | null | undefined) {
    if (typeof member === 'undefined') return {};
    if (member === null)
      return {
        metaInfo: {
          members: null,
        },
      };

    return {
      metaInfo: {
        members: {
          members: {
            has: member,
          },
        },
      },
    };
  }

  public static paginate(pagination: PaginationOptions) {
    return {
      cursor: pagination.cursor ? { id: pagination.cursor } : undefined,
      skip: pagination.cursor ? 1 : 0,
      take: pagination.limit,
    };
  }

  public static sortVideo(): any {
    return [{ date: 'desc' }, { id: 'asc' }];
  }
}
