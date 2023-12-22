import { Input } from '@nextui-org/react';
import React from 'react';

export default function IncomeSource() {
  return (
    <Input
      type='text'
      label='Income Source'
      placeholder='Enter your income source'
      labelPlacement='outside'
    />
  );
}
