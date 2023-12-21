import React from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

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
      <Autocomplete label='Select a Category' className='max-w-xs'>
        {categorys.map((category) => (
          <AutocompleteItem key={category.value} value={category.value}>
            {category.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
