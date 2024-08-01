import { getExpenses } from './list';

export async function calculateCategoryTotals() {
  const expenses = await getExpenses();

  return expenses?.reduce(
    (
      acc: { [x: string]: number },
      curr: { category: string; amount: number }
    ) => {
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
}
