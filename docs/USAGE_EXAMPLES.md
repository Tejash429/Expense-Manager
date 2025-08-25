# Money Minder - Usage Examples & Integration Guide

## Overview

This guide provides comprehensive examples of how to use Money Minder components, integrate with the API, and implement common patterns in your application.

## Table of Contents

- [Quick Start](#quick-start)
- [Component Integration Examples](#component-integration-examples)
- [Form Handling Examples](#form-handling-examples)
- [Data Fetching Patterns](#data-fetching-patterns)
- [Custom Implementations](#custom-implementations)
- [Error Handling](#error-handling)
- [Testing Examples](#testing-examples)

---

## Quick Start

### Basic Dashboard Setup

```tsx
// app/dashboard/page.tsx
import List from '../components/List';
import SideBar from '../components/sideBar';
import ExpenseForm from '../components/expenseForm';
import IncomeForm from '../components/incomeForm';
import NavBar from '../components/navBar';

export default async function Dashboard() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <NavBar />
      
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <ExpenseForm />
          <IncomeForm />
        </div>
        
        {/* Main Content */}
        <div className="flex gap-4">
          <div className="flex-1">
            <List />
          </div>
          <div className="w-1/3">
            <SideBar />
          </div>
        </div>
      </div>
    </main>
  );
}
```

### Mobile-First Dashboard

```tsx
// app/mobile/page.tsx
import { combinedDatas } from '../components/List';
import { calculateCategoryTotals } from '../components/calculateCategoryTotals';
import { getExpenses } from '../components/List';
import ExpenseCarousel from '../components/emblaCarousel';
import ExpenseForm from '../components/expenseForm';
import IncomeForm from '../components/incomeForm';

export default async function MobileDashboard() {
  const expenses = await getExpenses();
  const categoryTotals = await calculateCategoryTotals();
  
  return (
    <main className="bg-[#121212] min-h-screen p-4">
      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <ExpenseForm />
        <IncomeForm />
      </div>
      
      {/* Mobile Carousel */}
      <ExpenseCarousel 
        data={expenses || []}
        categoryTotals={categoryTotals || {}}
      />
    </main>
  );
}
```

---

## Component Integration Examples

### Custom Transaction List

```tsx
// components/CustomTransactionList.tsx
import { combinedDatas } from './List';
import { format } from 'date-fns';

export default async function CustomTransactionList() {
  const transactions = await combinedDatas();
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recent Transactions</h2>
      
      {transactions.map((transaction) => (
        <div 
          key={transaction.id}
          className="bg-[#1E1E1E] p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">
              {transaction.income_source || transaction.payee}
            </h3>
            <p className="text-gray-400 text-sm">
              {format(new Date(transaction.created_at), 'MMM dd, yyyy')}
            </p>
            {transaction.category && (
              <span className="text-xs bg-gray-600 px-2 py-1 rounded">
                {transaction.category}
              </span>
            )}
          </div>
          
          <div className={`text-lg font-bold ${
            transaction.income_source ? 'text-green-500' : 'text-red-500'
          }`}>
            {transaction.income_source ? '+' : '-'}₹{transaction.amount}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Enhanced Expense Form with Custom Validation

```tsx
// components/EnhancedExpenseForm.tsx
'use client';
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { addExpense } from '../actions';
import Amount from './FormElements/amount';
import Category from './FormElements/category';
import Vendor from './FormElements/vendor';
import Date from './FormElements/date';
import Payment from './FormElements/payment';
import toast from 'react-hot-toast';

export default function EnhancedExpenseForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Custom validation
      const amount = formData.get('amount');
      if (!amount || Number(amount) <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }
      
      await addExpense(formData);
      toast.success('Expense added successfully!');
      onOpenChange();
    } catch (error) {
      toast.error('Failed to add expense. Please try again.');
      console.error('Error adding expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-[#F44336]" size="lg">
        Add Expense
      </Button>
      
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <form action={handleSubmit} className="bg-[#1E1E1E]">
              <ModalHeader>
                <h2 className="text-xl">Add New Expense</h2>
              </ModalHeader>
              
              <ModalBody className="space-y-4">
                <Vendor />
                
                <div className="grid grid-cols-2 gap-4">
                  <Amount />
                  <Date />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Category />
                  <Payment />
                </div>
              </ModalBody>
              
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#F44336]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Expense'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Custom Analytics Dashboard

```tsx
// components/AnalyticsDashboard.tsx
import { getExpenses, getIncomes } from './List';
import { calculateCategoryTotals } from './calculateCategoryTotals';
import { calculateExpenseAmount } from './sideBar';
import PieChart from './chart';
import Progress from './progress';

export default async function AnalyticsDashboard() {
  const [expenses, incomes, categoryTotals] = await Promise.all([
    getExpenses(),
    getIncomes(),
    calculateCategoryTotals()
  ]);
  
  const totalExpenses = calculateExpenseAmount(expenses || []);
  const totalIncomes = incomes?.reduce((acc, income) => acc + income.amount, 0) || 0;
  const netBalance = totalIncomes - totalExpenses;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Summary Cards */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Total Income</h3>
        <p className="text-2xl font-bold text-green-500">₹{totalIncomes}</p>
      </div>
      
      <div className="bg-[#1E1E1E] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-500">₹{totalExpenses}</p>
      </div>
      
      <div className="bg-[#1E1E1E] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Net Balance</h3>
        <p className={`text-2xl font-bold ${
          netBalance >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          ₹{netBalance}
        </p>
      </div>
      
      {/* Category Breakdown */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(categoryTotals || {}).map(([category, amount]) => (
            <Progress
              key={category}
              value={amount}
              label={category}
              maxValue={totalExpenses}
              color="primary"
            />
          ))}
        </div>
      </div>
      
      {/* Pie Chart */}
      <div className="bg-[#1E1E1E] p-6 rounded-lg flex justify-center">
        <PieChart categoryTotals={categoryTotals || {}} />
      </div>
    </div>
  );
}
```

---

## Form Handling Examples

### Custom Form Builder

```tsx
// components/CustomFormBuilder.tsx
'use client';
import { ReactNode } from 'react';
import { Button } from '@nextui-org/react';

interface FormBuilderProps {
  title: string;
  children: ReactNode;
  onSubmit: (formData: FormData) => Promise<void>;
  submitText?: string;
  submitColor?: string;
}

export default function CustomFormBuilder({
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  submitColor = 'primary'
}: FormBuilderProps) {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <form action={onSubmit} className="space-y-4">
        {children}
        
        <div className="flex justify-end pt-4">
          <Button type="submit" color={submitColor as any}>
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Usage Example
import CustomFormBuilder from './CustomFormBuilder';
import Amount from './FormElements/amount';
import Category from './FormElements/category';
import { addExpense } from '../actions';

export default function QuickExpenseForm() {
  return (
    <CustomFormBuilder
      title="Quick Expense Entry"
      onSubmit={addExpense}
      submitText="Add Expense"
      submitColor="danger"
    >
      <Amount />
      <Category />
      {/* Add more fields as needed */}
    </CustomFormBuilder>
  );
}
```

### Form with Real-time Validation

```tsx
// components/ValidatedExpenseForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { Input, Select, SelectItem, Button } from '@nextui-org/react';
import { addExpense } from '../actions';

interface FormErrors {
  amount?: string;
  category?: string;
  payee?: string;
  date?: string;
}

export default function ValidatedExpenseForm() {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    payee: '',
    date: '',
    payment: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const categories = [
    { value: 'food', label: 'Food' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'health', label: 'Health' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'others', label: 'Others' }
  ];

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.payee.trim()) {
      newErrors.payee = 'Payee is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    
    try {
      await addExpense(form);
      // Reset form
      setFormData({
        amount: '',
        category: '',
        payee: '',
        date: '',
        payment: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input
        type="number"
        label="Amount"
        placeholder="0.00"
        value={formData.amount}
        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
        isInvalid={!!errors.amount}
        errorMessage={errors.amount}
        startContent={<span className="text-default-400">₹</span>}
      />
      
      <Select
        label="Category"
        placeholder="Select category"
        selectedKeys={formData.category ? [formData.category] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string;
          setFormData(prev => ({ ...prev, category: value }));
        }}
        isInvalid={!!errors.category}
        errorMessage={errors.category}
      >
        {categories.map(cat => (
          <SelectItem key={cat.value} value={cat.value}>
            {cat.label}
          </SelectItem>
        ))}
      </Select>
      
      <Input
        label="Payee"
        placeholder="Enter payee name"
        value={formData.payee}
        onChange={(e) => setFormData(prev => ({ ...prev, payee: e.target.value }))}
        isInvalid={!!errors.payee}
        errorMessage={errors.payee}
      />
      
      <Input
        type="date"
        label="Date"
        value={formData.date}
        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
        isInvalid={!!errors.date}
        errorMessage={errors.date}
      />
      
      <Button 
        type="submit" 
        className="w-full bg-[#F44336]"
        disabled={!isValid}
      >
        Add Expense
      </Button>
    </form>
  );
}
```

---

## Data Fetching Patterns

### Custom Data Hooks

```tsx
// hooks/useTransactionData.ts
'use client';
import { useState, useEffect } from 'react';
import { getExpenses, getIncomes } from '../components/List';

export function useTransactionData() {
  const [data, setData] = useState({
    expenses: null,
    incomes: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenses, incomes] = await Promise.all([
          getExpenses(),
          getIncomes()
        ]);
        
        setData({
          expenses,
          incomes,
          loading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error as Error
        }));
      }
    };

    fetchData();
  }, []);

  return data;
}

// Usage in component
'use client';
import { useTransactionData } from '../hooks/useTransactionData';

export default function TransactionSummary() {
  const { expenses, incomes, loading, error } = useTransactionData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalExpenses = expenses?.reduce((acc, exp) => acc + exp.amount, 0) || 0;
  const totalIncomes = incomes?.reduce((acc, inc) => acc + inc.amount, 0) || 0;

  return (
    <div>
      <p>Total Expenses: ₹{totalExpenses}</p>
      <p>Total Incomes: ₹{totalIncomes}</p>
      <p>Net: ₹{totalIncomes - totalExpenses}</p>
    </div>
  );
}
```

### Server-side Data Fetching with Error Boundaries

```tsx
// components/TransactionDataProvider.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { combinedDatas } from './List';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <h2 className="font-bold">Something went wrong:</h2>
      <pre className="text-sm">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

async function TransactionContent() {
  const transactions = await combinedDatas();
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Recent Transactions ({transactions.length})
      </h2>
      {/* Render transactions */}
    </div>
  );
}

export default function TransactionDataProvider() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <TransactionContent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## Custom Implementations

### Custom Chart Component

```tsx
// components/CustomBarChart.tsx
'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryTotals } from './sideBar';

interface CustomBarChartProps {
  data: CategoryTotals;
  title?: string;
}

export default function CustomBarChart({ data, title = 'Expense Categories' }: CustomBarChartProps) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const chartConfig = {
      labels: Object.keys(data),
      datasets: [{
        label: 'Amount (₹)',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      }]
    };

    setChartData(chartConfig);
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '₹' + value;
          }
        }
      }
    }
  };

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <Bar data={chartData} options={options} />
    </div>
  );
}
```

### Advanced Search and Filter Component

```tsx
// components/TransactionSearch.tsx
'use client';
import { useState, useMemo } from 'react';
import { Input, Select, SelectItem, DatePicker } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  category?: string;
  payee?: string;
  income_source?: string;
  date: string;
  created_at: string;
}

interface TransactionSearchProps {
  transactions: Transaction[];
  onFilteredResults: (filtered: Transaction[]) => void;
}

export default function TransactionSearch({ transactions, onFilteredResults }: TransactionSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState(''); // 'income' | 'expense' | ''
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesPayee = transaction.payee?.toLowerCase().includes(searchLower);
        const matchesSource = transaction.income_source?.toLowerCase().includes(searchLower);
        const matchesCategory = transaction.category?.toLowerCase().includes(searchLower);
        
        if (!matchesPayee && !matchesSource && !matchesCategory) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter && transaction.category !== categoryFilter) {
        return false;
      }

      // Type filter
      if (typeFilter === 'income' && !transaction.income_source) return false;
      if (typeFilter === 'expense' && !transaction.payee) return false;

      // Date range filter
      if (dateRange.start && transaction.date < dateRange.start) return false;
      if (dateRange.end && transaction.date > dateRange.end) return false;

      return true;
    });
  }, [transactions, searchTerm, categoryFilter, typeFilter, dateRange]);

  // Notify parent component of filtered results
  useMemo(() => {
    onFilteredResults(filteredTransactions);
  }, [filteredTransactions, onFilteredResults]);

  const categories = [...new Set(transactions.map(t => t.category).filter(Boolean))];

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Search & Filter</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startContent={<SearchIcon size={16} />}
        />

        {/* Category Filter */}
        <Select
          placeholder="All Categories"
          selectedKeys={categoryFilter ? [categoryFilter] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            setCategoryFilter(value || '');
          }}
        >
          <SelectItem key="" value="">All Categories</SelectItem>
          {categories.map(category => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>

        {/* Type Filter */}
        <Select
          placeholder="All Types"
          selectedKeys={typeFilter ? [typeFilter] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            setTypeFilter(value || '');
          }}
        >
          <SelectItem key="" value="">All Types</SelectItem>
          <SelectItem key="income" value="income">Income</SelectItem>
          <SelectItem key="expense" value="expense">Expense</SelectItem>
        </Select>

        {/* Date Range */}
        <div className="flex gap-2">
          <Input
            type="date"
            placeholder="From"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <Input
            type="date"
            placeholder="To"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="text-sm text-gray-400">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </div>
    </div>
  );
}
```

---

## Error Handling

### Global Error Handler

```tsx
// components/GlobalErrorHandler.tsx
'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function GlobalErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      toast.error('Something went wrong. Please try again.');
    };

    // Handle JavaScript errors
    const handleError = (event: ErrorEvent) => {
      console.error('JavaScript error:', event.error);
      toast.error('An error occurred. Please refresh the page.');
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null;
}

// Add to your root layout
import GlobalErrorHandler from './components/GlobalErrorHandler';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalErrorHandler />
        {children}
      </body>
    </html>
  );
}
```

### API Error Handling Utility

```tsx
// utils/errorHandling.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function handleServerAction<T>(
  action: () => Promise<T>,
  errorMessage = 'Operation failed'
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await action();
    return { data };
  } catch (error) {
    console.error(errorMessage, error);
    
    if (error instanceof APIError) {
      return { error: error.message };
    }
    
    return { error: errorMessage };
  }
}

// Usage example
import { handleServerAction } from '../utils/errorHandling';
import { addExpense } from '../actions';

export default function SafeExpenseForm() {
  const handleSubmit = async (formData: FormData) => {
    const { data, error } = await handleServerAction(
      () => addExpense(formData),
      'Failed to add expense'
    );
    
    if (error) {
      toast.error(error);
    } else {
      toast.success('Expense added successfully!');
    }
  };

  return (
    <form action={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

---

## Testing Examples

### Component Testing with Jest

```tsx
// __tests__/components/Progress.test.tsx
import { render, screen } from '@testing-library/react';
import Progress from '../components/progress';

describe('Progress Component', () => {
  test('renders progress bar with correct label', () => {
    render(
      <Progress
        value={5000}
        label="Food"
        maxValue={10000}
        color="warning"
      />
    );
    
    expect(screen.getByText('Food')).toBeInTheDocument();
  });
  
  test('calculates percentage correctly', () => {
    render(
      <Progress
        value={2500}
        label="Transportation"
        maxValue={10000}
      />
    );
    
    // Check if progress shows 25%
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '2500');
    expect(progressBar).toHaveAttribute('aria-valuemax', '10000');
  });
});
```

### API Testing

```tsx
// __tests__/actions.test.ts
import { addExpense, addIncome } from '../app/actions';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

// Mock Supabase
jest.mock('@supabase/auth-helpers-nextjs');
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({}))
}));
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

describe('Server Actions', () => {
  const mockSupabase = {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({ error: null }))
    }))
  };

  beforeEach(() => {
    (createServerActionClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  test('addExpense inserts data correctly', async () => {
    const formData = new FormData();
    formData.append('amount', '1000');
    formData.append('category', 'food');
    formData.append('payee', 'Restaurant');

    await addExpense(formData);

    expect(mockSupabase.from).toHaveBeenCalledWith('expense');
    expect(mockSupabase.from().insert).toHaveBeenCalledWith({
      amount: '1000',
      category: 'food',
      payee: 'Restaurant'
    });
  });
});
```

---

## Performance Optimization

### Lazy Loading Components

```tsx
// components/LazyComponents.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components
const PieChart = dynamic(() => import('./chart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false
});

const ExpenseCarousel = dynamic(() => import('./emblaCarousel'), {
  loading: () => <div>Loading carousel...</div>
});

export default function OptimizedDashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PieChart categoryTotals={{}} />
      </Suspense>
      
      <Suspense fallback={<div>Loading carousel...</div>}>
        <ExpenseCarousel data={[]} categoryTotals={{}} />
      </Suspense>
    </div>
  );
}
```

### Memoization Examples

```tsx
// components/OptimizedTransactionList.tsx
'use client';
import { memo, useMemo } from 'react';

interface Transaction {
  id: string;
  amount: number;
  payee?: string;
  income_source?: string;
  created_at: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  searchTerm: string;
}

const TransactionItem = memo(({ transaction }: { transaction: Transaction }) => {
  return (
    <div className="p-4 bg-[#1E1E1E] rounded-lg">
      <h3>{transaction.payee || transaction.income_source}</h3>
      <p>₹{transaction.amount}</p>
    </div>
  );
});

const TransactionList = memo(({ transactions, searchTerm }: TransactionListProps) => {
  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactions;
    
    return transactions.filter(t => 
      t.payee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.income_source?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  return (
    <div className="space-y-4">
      {filteredTransactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
});

export default TransactionList;
```

This comprehensive guide provides practical examples for implementing and extending the Money Minder application. Each example includes proper error handling, TypeScript types, and follows React best practices.