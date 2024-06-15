export type Member = 'duna' | 'geumhee' | 'seoyeon' | 'sihyeon' | 'sua' | 'yeham' | 'yuna';

export const Members: Member[] = ['geumhee', 'sihyeon', 'seoyeon', 'yuna', 'duna', 'sua', 'yeham'];

export function getMemberName(member: Member | null): string {
  switch (member) {
    case 'geumhee':
      return '$member_geumhee';
    case 'sihyeon':
      return '$member_sihyeon';
    case 'seoyeon':
      return '$member_seoyeon';
    case 'yuna':
      return '$member_yuna';
    case 'duna':
      return '$member_duna';
    case 'sua':
      return '$member_sua';
    case 'yeham':
      return '$member_yeham';
    default:
      return 'CSR';
  }
}

export function sanitizeMember(member: null | string): Member | null {
  if (Members.includes(member as Member)) {
    return member as Member;
  }
  return null;
}
