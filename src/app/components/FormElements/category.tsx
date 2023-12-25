import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const categorys = [
  { label: 'Food', value: 'food' },
  { label: 'Transportation', value: 'transportation' },
  { label: 'Housing', value: 'housing' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Utilities', value: 'utilities' },
  { label: 'Health', value: 'health' },
  { label: 'Personal Care', value: 'personal Care' },
  { label: 'Education', value: 'education' },
  { label: 'Others', value: 'other' },
];

export default function Category() {
  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
      <Select
        placeholder='Select a Category'
        name='category'
        label='Category'
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
