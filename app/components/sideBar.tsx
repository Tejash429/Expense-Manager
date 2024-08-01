import { getExpenses } from './list';
import Progress from './progress';
import PieChart from './chart';
import { calculateCategoryTotals } from './calculateCategoryTotals';

export const categoryColors: Record<string, string> = {
  health: 'primary',
  entertainment: 'secondary',
  transportation: 'success',
  food: 'warning',
  others: 'danger',
  personalCare: 'default',
};

export interface Expense {
  category: string;
  amount: number;
}

export interface CategoryTotals {
  [key: string]: number;
}

export default async function SideBar() {
  const expenses = await getExpenses();

  const expeseAmount = calculateExpenseAmount(expenses as Expense[]);
  const categoryTotals: CategoryTotals = await calculateCategoryTotals();

  if (!expenses || expenses.length === 0) {
    return (
      <div className='w-[35%] p-6 mr-4 shadow-xl bg-[#1E1E1E] h-fit text-[#cbd5e0] rounded-2xl'>
        <p>No expense data available.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-[35%] h-[78vh] gap-5 overflow-y-scroll overflow-x-hidden'>
      <div className='p-6 mr-4 shadow-xl bg-[#1E1E1E] h-fit text-[#cbd5e0] rounded-2xl'>
        <h2 className='font-bold text-xl mb-4'>Where does your Money go?</h2>
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
      <div className='w-fit h-fit'>
        <PieChart categoryTotals={categoryTotals} />
      </div>
    </div>
  );
}

export function calculateExpenseAmount(expenses: Expense[]) {
  const expeseAmount = expenses?.reduce(
    (acc: number, curr: { amount: number }) => {
      return acc + curr.amount;
    },
    0
  );
  return expeseAmount;
}
