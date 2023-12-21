import React from 'react';
import { Textarea } from '@nextui-org/react';

export default function Description() {
  return (
    <Textarea
      label='Description'
      placeholder='Enter your description'
      labelPlacement='outside'
      className='max-w-full'
    />
  );
}
