import crypto from 'crypto';

export default function createId(length: number) {
  return crypto.randomBytes(length / 2).toString('hex');
}
