'use client';
import { Progress } from '@nextui-org/react';

interface Props {
  value: number;
  label: string;
  maxValue: number;
}

export default function Progres({ value, label, maxValue }: Props) {
  return (
    <>
      <Progress
        label={label}
        size='sm'
        value={value}
        maxValue={maxValue}
        color='danger'
        formatOptions={{ style: 'currency', currency: 'IND' }}
        showValueLabel={true}
        className='max-w-md'
      />
    </>
  );
}
