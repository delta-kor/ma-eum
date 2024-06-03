import { Member } from '@/utils/video.util';

export interface Line {
  chips: Chip[];
  inline: boolean;
  part: (Member | null)[];
}

export type Chip = PunctuationChip | TextChip;

export interface PunctuationChip {
  text: string;
  type: 'punctuation';
}

export interface TextChip {
  end: number;
  start: number;
  text: string;
  type: 'text';
}

export const LineOffsetDelay = 0.4;
export const OffsetDelay = 0.2;
