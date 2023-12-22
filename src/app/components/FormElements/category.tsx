import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const categorys = [
  {
    label: 'Food',
    value: 'food',
  },
  {
    label: 'Transportation',
    value: 'transportation',
  },
  {
    label: 'Housing',
    value: 'housing',
  },
  { label: 'Entertainment', value: 'entertainment' },
];

export default function Category() {
  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
      <Select
        placeholder='Select a Category'
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
