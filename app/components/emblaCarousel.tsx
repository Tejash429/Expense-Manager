'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  calculateExpenseAmount,
  categoryColors,
  CategoryTotals,
  Expense,
} from './sideBar';
import PieChart from './chart';
import { Progress } from '@nextui-org/react';

export default function ExpenseCarousel({
  data,
  categoryTotals,
}: {
  data: Expense[];
  categoryTotals: CategoryTotals;
}) {
  const [emblaRef] = useEmblaCarousel();
  const [expeseAmount, setExpenseAmount] = useState(0);

  useEffect(() => {
    setExpenseAmount(calculateExpenseAmount(data));
  }, [data]);

  return (
    <div className='embla' ref={emblaRef}>
      <div className='embla__container'>
        <div className='embla__slide'>
          <div className='p-4 bg-white rounded-lg shadow'>
            <h2 className='text-xl font-bold mb-4'>
              Where does your Money go?
            </h2>
            <ul className='flex flex-col gap-4 '>
              {Object.keys(categoryTotals).map((category) => (
                <li className='capitalize' key={category}>
                  <Progress
                    value={categoryTotals[category]}
                    label={category}
                    maxValue={expeseAmount}
                    color={categoryColors[category] || 'default'}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='embla__slide'>
          <PieChart categoryTotals={categoryTotals} />
        </div>
      </div>
    </div>
  );
}
