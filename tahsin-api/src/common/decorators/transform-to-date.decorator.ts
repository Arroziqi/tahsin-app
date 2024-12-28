import { Transform } from 'class-transformer';

export function TransformToDate() {
  return Transform(({ value }) => (value ? new Date(value) : value));
}
