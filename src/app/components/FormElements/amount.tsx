import { Input } from '@nextui-org/react';
import React from 'react';

export default function Amount() {
  return (
    <Input
      type='number'
      label='Price'
      placeholder='0.00'
      labelPlacement='outside'
      name='amount'
      startContent={
        <div className='pointer-events-none flex items-center'>
          <span className='text-default-400 text-small'>₹</span>
        </div>
      }
    />
  );
}
