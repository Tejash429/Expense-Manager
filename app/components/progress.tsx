'use client';
import { Progress } from '@nextui-org/react';

interface Props {
  value: number;
  label: string;
  maxValue: number;
  color?: string;
}
type categoryColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'default';

export default function Progres({
  value,
  label,
  maxValue,
  color = 'danger',
}: Props) {
  return (
    <Progress
      label={label}
      size='sm'
      value={value}
      maxValue={maxValue}
      formatOptions={{ style: 'currency', currency: 'IND' }}
      showValueLabel
      className='max-w-md'
      color={color as categoryColors}
    />
  );
}
