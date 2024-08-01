import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const categorys = [
  {
    label: 'Credit Card',
    value: 'credit Card',
  },
  {
    label: 'Dedit Card',
    value: 'dedit Card',
  },
  {
    label: 'Cash',
    value: 'cash',
  },
  { label: 'Online Payment', value: 'online Payment' },
  { label: 'Other', value: 'Other' },
];

export default function Payment() {
  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
      <Select
        placeholder='Payment Method'
        name='payment'
        label='Payment Method'
        labelPlacement='outside'
        className='max-w-xs'
        required
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
