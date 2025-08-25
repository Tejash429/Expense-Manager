# Money Minder - API Documentation

## Overview

Money Minder is a comprehensive expense tracking application built with Next.js 13, featuring server actions for data management and a modern UI with NextUI components. This documentation covers all public APIs, server actions, and utility functions.

## Table of Contents

- [Server Actions](#server-actions)
- [Data Fetching Functions](#data-fetching-functions)
- [Utility Functions](#utility-functions)
- [Type Definitions](#type-definitions)

## Server Actions

### `addExpense(formData: FormData)`

**Description**: Server action to add a new expense to the database.

**Location**: `app/actions.ts`

**Parameters**:
- `formData: FormData` - Form data containing expense details

**Form Data Fields**:
- `amount: number` - The expense amount
- `category: string` - Expense category (food, transportation, health, etc.)
- `date: string` - Date of the expense
- `payee: string` - Vendor or payee name
- `payment: string` - Payment method used

**Returns**: `Promise<void>`

**Throws**: Database error if insertion fails

**Example Usage**:
```tsx
// In a form component
<form action={addExpense}>
  <input name="amount" type="number" required />
  <input name="category" type="text" required />
  <input name="date" type="date" required />
  <input name="payee" type="text" required />
  <input name="payment" type="text" required />
  <button type="submit">Add Expense</button>
</form>
```

**Side Effects**:
- Revalidates the root path (`/`) to refresh cached data
- Inserts data into the `expense` table in Supabase

---

### `addIncome(formData: FormData)`

**Description**: Server action to add a new income entry to the database.

**Location**: `app/actions.ts`

**Parameters**:
- `formData: FormData` - Form data containing income details

**Form Data Fields**:
- `amount: number` - The income amount
- `date: string` - Date of the income
- `income_source: string` - Source of income

**Returns**: `Promise<void>`

**Throws**: Database error if insertion fails

**Example Usage**:
```tsx
// In a form component
<form action={addIncome}>
  <input name="amount" type="number" required />
  <input name="date" type="date" required />
  <input name="income_source" type="text" required />
  <button type="submit">Add Income</button>
</form>
```

**Side Effects**:
- Revalidates the root path (`/`) to refresh cached data
- Inserts data into the `income` table in Supabase

---

## Data Fetching Functions

### `getExpenses()`

**Description**: Fetches all expense records from the database.

**Location**: `app/components/List.tsx`

**Parameters**: None

**Returns**: `Promise<Expense[] | null>`

**Example Usage**:
```tsx
const expenses = await getExpenses();
if (expenses) {
  console.log(`Found ${expenses.length} expenses`);
}
```

**Database Table**: `expense`

**Error Handling**: Logs errors to console and returns null on failure

---

### `getIncomes()`

**Description**: Fetches all income records from the database.

**Location**: `app/components/List.tsx`

**Parameters**: None

**Returns**: `Promise<Income[] | null>`

**Example Usage**:
```tsx
const incomes = await getIncomes();
if (incomes) {
  console.log(`Found ${incomes.length} income entries`);
}
```

**Database Table**: `income`

**Error Handling**: Logs errors to console and returns null on failure

---

### `combinedDatas()`

**Description**: Combines expense and income data, sorted by creation date (newest first).

**Location**: `app/components/List.tsx`

**Parameters**: None

**Returns**: `Promise<(Expense | Income)[]>`

**Example Usage**:
```tsx
const transactions = await combinedDatas();
// Returns array with both expenses and incomes, sorted by created_at desc
```

**Sorting**: Results are sorted by `created_at` timestamp in descending order

---

## Utility Functions

### `calculateCategoryTotals()`

**Description**: Calculates total expenses grouped by category.

**Location**: `app/components/calculateCategoryTotals.ts`

**Parameters**: None

**Returns**: `Promise<CategoryTotals | undefined>`

**Type**: 
```typescript
type CategoryTotals = {
  [key: string]: number;
}
```

**Example Usage**:
```tsx
const categoryTotals = await calculateCategoryTotals();
// Returns: { food: 5000, transportation: 2000, health: 1500, ... }
```

**Example Output**:
```json
{
  "food": 15000,
  "transportation": 8000,
  "health": 3500,
  "entertainment": 2000,
  "others": 1200
}
```

---

### `calculateExpenseAmount(expenses: Expense[])`

**Description**: Calculates the total amount from an array of expenses.

**Location**: `app/components/sideBar.tsx`

**Parameters**:
- `expenses: Expense[]` - Array of expense objects

**Returns**: `number` - Total expense amount

**Example Usage**:
```tsx
const expenses = await getExpenses();
const total = calculateExpenseAmount(expenses);
console.log(`Total expenses: ₹${total}`);
```

**Type Safety**: Handles null/undefined expenses arrays gracefully

---

## Type Definitions

### `Transaction`

```typescript
interface Transaction {
  transaction: {
    category: string;
    amount: number;
    date: string;
    payee: string;
    payment: string;
    income_source: string;
  };
}
```

### `Expense`

```typescript
interface Expense {
  category: string;
  amount: number;
  date?: string;
  payee?: string;
  payment?: string;
  created_at?: string;
  id?: string;
}
```

### `CategoryTotals`

```typescript
interface CategoryTotals {
  [key: string]: number;
}
```

### `Income`

```typescript
interface Income {
  amount: number;
  date?: string;
  income_source: string;
  created_at?: string;
  id?: string;
}
```

---

## Error Handling

All database operations include error handling:

1. **Server Actions**: Throw errors that can be caught by error boundaries
2. **Data Fetching**: Log errors to console and return null/undefined
3. **Utility Functions**: Handle null/undefined inputs gracefully

## Authentication

All database operations use Supabase authentication with server-side cookies:

```typescript
const cookieStore = cookies();
const supabase = createServerActionClient({ cookies: () => cookieStore });
```

## Database Schema

### Expense Table
- `id`: Primary key
- `amount`: Number (required)
- `category`: String (required)
- `date`: String (required)
- `payee`: String (required)
- `payment`: String (required)
- `created_at`: Timestamp (auto-generated)

### Income Table
- `id`: Primary key
- `amount`: Number (required)
- `date`: String (required)
- `income_source`: String (required)
- `created_at`: Timestamp (auto-generated)

## Cache Management

The application uses Next.js cache revalidation:

```typescript
revalidatePath('/'); // Revalidates the home page cache
```

This ensures that data is fresh after mutations without requiring client-side refetching.