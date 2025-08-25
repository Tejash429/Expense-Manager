# Money Minder - Type Definitions

## Overview

This document provides comprehensive TypeScript type definitions for all interfaces, types, and data structures used in the Money Minder application.

## Table of Contents

- [Core Data Types](#core-data-types)
- [Component Props](#component-props)
- [Form Data Types](#form-data-types)
- [Utility Types](#utility-types)
- [Database Types](#database-types)
- [API Response Types](#api-response-types)

---

## Core Data Types

### `Expense`

```typescript
interface Expense {
  id?: string;
  amount: number;
  category: string;
  date: string;
  payee: string;
  payment: string;
  created_at?: string;
  updated_at?: string;
}
```

**Usage Example:**
```typescript
const expense: Expense = {
  amount: 1500,
  category: 'food',
  date: '2024-01-15',
  payee: 'Restaurant ABC',
  payment: 'credit card'
};
```

### `Income`

```typescript
interface Income {
  id?: string;
  amount: number;
  date: string;
  income_source: string;
  created_at?: string;
  updated_at?: string;
}
```

**Usage Example:**
```typescript
const income: Income = {
  amount: 50000,
  date: '2024-01-01',
  income_source: 'Salary'
};
```

### `Transaction`

```typescript
interface Transaction {
  id: string;
  amount: number;
  date: string;
  created_at: string;
  
  // Expense fields (optional)
  category?: string;
  payee?: string;
  payment?: string;
  
  // Income fields (optional)
  income_source?: string;
}
```

**Type Guards:**
```typescript
function isExpense(transaction: Transaction): transaction is Transaction & Required<Pick<Transaction, 'category' | 'payee' | 'payment'>> {
  return 'payee' in transaction && transaction.payee !== undefined;
}

function isIncome(transaction: Transaction): transaction is Transaction & Required<Pick<Transaction, 'income_source'>> {
  return 'income_source' in transaction && transaction.income_source !== undefined;
}
```

---

## Component Props

### `PieChart` Props

```typescript
interface PieChartProps {
  categoryTotals: CategoryTotals;
}
```

### `Progress` Props

```typescript
interface ProgressProps {
  value: number;
  label: string;
  maxValue: number;
  color?: CategoryColor;
}

type CategoryColor = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'default';
```

### `ExpenseCarousel` Props

```typescript
interface ExpenseCarouselProps {
  data: Expense[];
  categoryTotals: CategoryTotals;
}
```

### `TransactionList` Props

```typescript
interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
  error?: string | null;
  onTransactionClick?: (transaction: Transaction) => void;
}
```

---

## Form Data Types

### `ExpenseFormData`

```typescript
interface ExpenseFormData {
  amount: string | number;
  category: string;
  date: string;
  payee: string;
  payment: string;
}

// Form validation schema
const expenseFormSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  payee: z.string().min(1, 'Payee is required'),
  payment: z.string().min(1, 'Payment method is required'),
});

type ValidatedExpenseFormData = z.infer<typeof expenseFormSchema>;
```

### `IncomeFormData`

```typescript
interface IncomeFormData {
  amount: string | number;
  date: string;
  income_source: string;
}

// Form validation schema
const incomeFormSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  income_source: z.string().min(1, 'Income source is required'),
});

type ValidatedIncomeFormData = z.infer<typeof incomeFormSchema>;
```

### `FormState`

```typescript
interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Usage example
type ExpenseFormState = FormState<ExpenseFormData>;
type IncomeFormState = FormState<IncomeFormData>;
```

---

## Utility Types

### `CategoryTotals`

```typescript
interface CategoryTotals {
  [category: string]: number;
}

// Predefined categories
type ExpenseCategory = 
  | 'food'
  | 'transportation'
  | 'housing'
  | 'entertainment'
  | 'utilities'
  | 'health'
  | 'personalCare'
  | 'education'
  | 'others';

type CategoryTotalsTyped = Record<ExpenseCategory, number>;
```

### `PaymentMethod`

```typescript
type PaymentMethod = 
  | 'credit card'
  | 'debit card'
  | 'cash'
  | 'online payment'
  | 'other';

interface PaymentMethodOption {
  label: string;
  value: PaymentMethod;
}

const paymentMethods: PaymentMethodOption[] = [
  { label: 'Credit Card', value: 'credit card' },
  { label: 'Debit Card', value: 'debit card' },
  { label: 'Cash', value: 'cash' },
  { label: 'Online Payment', value: 'online payment' },
  { label: 'Other', value: 'other' },
];
```

### `DateRange`

```typescript
interface DateRange {
  start: string; // ISO date string
  end: string;   // ISO date string
}

interface DateRangeFilter {
  range: DateRange;
  isActive: boolean;
}
```

### `SortOptions`

```typescript
type SortField = 'date' | 'amount' | 'category' | 'payee' | 'created_at';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface SortedTransactionList {
  transactions: Transaction[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}
```

---

## Database Types

### Supabase Generated Types

```typescript
// Generated from Supabase CLI
export interface Database {
  public: {
    Tables: {
      expense: {
        Row: {
          id: string;
          amount: number;
          category: string;
          date: string;
          payee: string;
          payment: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          amount: number;
          category: string;
          date: string;
          payee: string;
          payment: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          amount?: number;
          category?: string;
          date?: string;
          payee?: string;
          payment?: string;
          updated_at?: string;
        };
      };
      income: {
        Row: {
          id: string;
          amount: number;
          date: string;
          income_source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          amount: number;
          date: string;
          income_source: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          amount?: number;
          date?: string;
          income_source?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Type aliases for convenience
export type ExpenseRow = Database['public']['Tables']['expense']['Row'];
export type ExpenseInsert = Database['public']['Tables']['expense']['Insert'];
export type ExpenseUpdate = Database['public']['Tables']['expense']['Update'];

export type IncomeRow = Database['public']['Tables']['income']['Row'];
export type IncomeInsert = Database['public']['Tables']['income']['Insert'];
export type IncomeUpdate = Database['public']['Tables']['income']['Update'];
```

### Query Result Types

```typescript
interface QueryResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

type ExpensesQuery = QueryResult<Expense[]>;
type IncomesQuery = QueryResult<Income[]>;
type TransactionsQuery = QueryResult<Transaction[]>;

interface PaginatedResult<T> {
  data: T[];
  count: number;
  hasMore: boolean;
  nextCursor?: string;
}

type PaginatedTransactions = PaginatedResult<Transaction>;
```

---

## API Response Types

### Server Action Results

```typescript
interface ServerActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

type AddExpenseResult = ServerActionResult<{ id: string }>;
type AddIncomeResult = ServerActionResult<{ id: string }>;

// Usage in components
const handleAddExpense = async (formData: FormData): Promise<AddExpenseResult> => {
  try {
    await addExpense(formData);
    return { success: true, data: { id: 'generated-id' } };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
```

### Chart Data Types

```typescript
interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface PieChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset?: number;
  }>;
}

interface BarChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth: number;
  }>;
}
```

---

## Advanced Types

### Generic Hook Types

```typescript
interface UseDataHook<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

type UseExpensesHook = UseDataHook<Expense[]>;
type UseIncomesHook = UseDataHook<Income[]>;
type UseCategoryTotalsHook = UseDataHook<CategoryTotals>;

// Custom hook implementation
function useExpenses(): UseExpensesHook {
  // Implementation details...
}
```

### Filter and Search Types

```typescript
interface FilterOptions {
  categories: string[];
  paymentMethods: PaymentMethod[];
  dateRange: DateRange | null;
  amountRange: {
    min: number;
    max: number;
  } | null;
}

interface SearchOptions {
  query: string;
  fields: Array<keyof Transaction>;
  caseSensitive: boolean;
}

interface TransactionFilters {
  search: SearchOptions;
  filters: FilterOptions;
  sort: SortConfig;
}
```

### Theme and Styling Types

```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

type ThemeColor = keyof Theme['colors'];
type ThemeSpacing = keyof Theme['spacing'];
```

---

## Type Utilities

### Utility Functions

```typescript
// Type-safe object keys
function getObjectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

// Type-safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Type guards
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

// Array type utilities
type NonEmptyArray<T> = [T, ...T[]];

function isNonEmptyArray<T>(array: T[]): array is NonEmptyArray<T> {
  return array.length > 0;
}
```

### Conditional Types

```typescript
// Extract transaction type
type TransactionType<T extends Transaction> = 
  T extends { income_source: string } 
    ? 'income' 
    : T extends { payee: string } 
      ? 'expense' 
      : never;

// Conditional props based on transaction type
type TransactionDisplayProps<T extends Transaction> = {
  transaction: T;
} & (T extends { income_source: string }
  ? { showSource: boolean }
  : { showPayee: boolean; showCategory: boolean }
);
```

---

## Module Declarations

### Extending NextUI Types

```typescript
declare module '@nextui-org/react' {
  interface ButtonProps {
    customVariant?: 'expense' | 'income';
  }
  
  interface InputProps {
    currencySymbol?: string;
  }
}
```

### Global Type Augmentation

```typescript
declare global {
  interface Window {
    MoneyMinder: {
      version: string;
      theme: Theme;
      config: AppConfig;
    };
  }
}

interface AppConfig {
  currency: {
    symbol: string;
    code: string;
    locale: string;
  };
  features: {
    charts: boolean;
    export: boolean;
    categories: boolean;
  };
}
```

---

## Usage Examples

### Type-Safe Component Implementation

```typescript
// Type-safe props with generic constraints
interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }>;
  onRowClick?: (item: T) => void;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick
}: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={String(column.key)}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} onClick={() => onRowClick?.(item)}>
            {columns.map(column => (
              <td key={String(column.key)}>
                {column.render 
                  ? column.render(item[column.key], item)
                  : String(item[column.key])
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage with type inference
const transactionColumns: Array<{
  key: keyof Transaction;
  label: string;
  render?: (value: any, item: Transaction) => React.ReactNode;
}> = [
  { key: 'amount', label: 'Amount', render: (value) => `₹${value}` },
  { key: 'date', label: 'Date' },
  { key: 'payee', label: 'Payee' },
];

<DataTable 
  data={transactions} 
  columns={transactionColumns}
  onRowClick={(transaction) => console.log(transaction.id)}
/>
```

This comprehensive type definition guide ensures type safety throughout the Money Minder application and provides clear interfaces for all components and functions.