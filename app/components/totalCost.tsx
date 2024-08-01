import { getExpenses, getIncomes } from './list';
import Progress from './progress';

export default async function SideBar() {
  const expenseData = await getExpenses();
  const incomeData = await getIncomes();

  const expenseAmount = expenseData?.reduce(
    (acc: any, curr: { amount: any }) => acc + curr.amount,
    0
  );

  const incomeAmount = incomeData?.reduce(
    (acc: any, curr: { amount: any }) => acc + curr.amount,
    0
  );

  const expenseCategoryTotals = expenseData?.reduce(
    (acc: { [x: string]: any }, curr: { category: any; amount: any }) => {
      const category = curr.category;

      if (!acc[category]) {
        acc[category] = curr.amount;
      } else {
        acc[category] += curr.amount;
      }

      return acc;
    },
    {}
  );

  const incomeCategoryTotals = incomeData?.reduce(
    (acc: { [x: string]: any }, curr: { category: any; amount: any }) => {
      const category = curr.category;

      if (!acc[category]) {
        acc[category] = curr.amount;
      } else {
        acc[category] += curr.amount;
      }

      return acc;
    },
    {}
  );

  return (
    ((expenseData && expenseData.length > 0) ||
      (incomeData && incomeData.length > 0)) && (
      <div className=' p-6 mr-4 shadow-xl bg-[#1a202c] h-fit text-[#cbd5e0] rounded-2xl'>
        <h2 className='font-bold text-xl mb-4'>Where does your Money go?</h2>
        {((expenseData && expenseData.length > 0) ||
          (incomeData && incomeData.length > 0)) && (
          <ul className='flex flex-col gap-4'>
            {Object.keys(expenseCategoryTotals).map((key) => (
              <li className='capitalize' key={key}>
                <Progress
                  value={expenseCategoryTotals[key]}
                  label={key}
                  maxValue={expenseAmount}
                />
              </li>
            ))}
            {Object.keys(incomeCategoryTotals).map((key) => (
              <li className='capitalize' key={key}>
                <Progress
                  value={incomeCategoryTotals[key]}
                  label={key}
                  maxValue={incomeAmount}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
}
