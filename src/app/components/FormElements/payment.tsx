import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const categorys = [
  {
    label: 'Credit Card',
    value: 'creditCard',
  },
  {
    label: 'Dedit Card',
    value: 'deditCard',
  },
  {
    label: 'Cash',
    value: 'cash',
  },
  { label: 'Online Payment', value: 'onlinePayment' },
  { label: 'Other', value: 'Other' },
];

export default function Payment() {
  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
      <Select
        placeholder='Payment Method'
        name='payment'
        label='Category'
        labelPlacement='outside'
        className='max-w-xs'
      >
        {categorys.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
