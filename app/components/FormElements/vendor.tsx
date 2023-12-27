import { Input } from '@nextui-org/react';
import { Mail } from 'lucide-react';

export default function Vendor() {
  return (
    <div className='flex w-full flex-wrap items-end md:flex-nowrap  md:mb-0 gap-4'>
      <Input
        key='outside'
        type='text'
        label='Payee'
        labelPlacement='outside'
        placeholder="e.g., Amazon, Grocery Store, John's Plumbing"
        name='payee'
        required
      />
    </div>
  );
}
