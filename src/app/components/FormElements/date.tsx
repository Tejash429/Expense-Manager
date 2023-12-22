import { Input } from '@nextui-org/react';
import React from 'react';

export default function Date() {
  return (
    <Input
      type='date'
      label='Date'
      placeholder='Select Date'
      labelPlacement='outside'
    />
  );
}