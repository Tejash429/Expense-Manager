# Money Minder - Component Documentation

## Overview

This documentation covers all React components in the Money Minder application, including their props, usage examples, and implementation details.

## Table of Contents

- [Main Components](#main-components)
- [Form Components](#form-components)
- [Form Elements](#form-elements)
- [Layout Components](#layout-components)
- [Utility Components](#utility-components)

---

## Main Components

### `List`

**Description**: Displays a combined list of income and expense transactions, sorted by date.

**Location**: `app/components/List.tsx`

**Type**: Server Component (async)

**Props**: None

**Features**:
- Automatically fetches and combines expense and income data
- Sorts transactions by creation date (newest first)
- Renders different UI for income vs expense items
- Responsive design with hover effects

**Usage**:
```tsx
import List from './components/List';

export default function Page() {
  return (
    <div>
      <List />
    </div>
  );
}
```

**Sub-components**:
- `ExpenseLists`: Renders expense items with red text
- `IncomeLists`: Renders income items with green text

**Styling**: Dark theme with gray dividers and hover effects

---

### `PieChart`

**Description**: Renders a pie chart visualization of expense distribution by category.

**Location**: `app/components/chart.tsx`

**Type**: Client Component

**Props**:
```typescript
interface Props {
  categoryTotals: CategoryTotals;
}
```

**Dependencies**:
- `chart.js` - Chart rendering library
- `react-chartjs-2` - React wrapper for Chart.js

**Features**:
- Dynamic chart generation based on category data
- Custom color palette for different categories
- Loading state while chart renders
- Fixed dimensions (400x400px)

**Usage**:
```tsx
import PieChart from './components/chart';

const categoryTotals = {
  food: 5000,
  transportation: 3000,
  health: 2000
};

export default function Dashboard() {
  return (
    <div>
      <PieChart categoryTotals={categoryTotals} />
    </div>
  );
}
```

**Chart Configuration**:
- Type: Pie chart
- Colors: Predefined palette with 9 colors
- Hover offset: 4px
- Label: "Expense Distribution"

---

### `ExpenseForm`

**Description**: Modal form component for adding new expenses.

**Location**: `app/components/expenseForm.tsx`

**Type**: Client Component

**Props**: None

**Features**:
- Modal-based form using NextUI components
- Server action integration for form submission
- Toast notifications for success feedback
- Form validation with required fields

**Form Fields**:
- Vendor/Payee (text input)
- Amount (number input with currency symbol)
- Date (date picker)
- Category (dropdown selection)
- Payment method (dropdown selection)

**Usage**:
```tsx
import ExpenseForm from './components/expenseForm';

export default function Dashboard() {
  return (
    <div>
      <ExpenseForm />
    </div>
  );
}
```

**Form Submission**: Uses `addExpense` server action

**Styling**: Red button with blur backdrop modal

---

### `IncomeForm`

**Description**: Modal form component for adding new income entries.

**Location**: `app/components/incomeForm.tsx`

**Type**: Client Component

**Props**: None

**Features**:
- Simplified form with fewer fields than expense form
- Modal interface with NextUI components
- Server action integration
- Toast notifications

**Form Fields**:
- Amount (number input with currency symbol)
- Date (date picker)
- Income source (text input)

**Usage**:
```tsx
import IncomeForm from './components/incomeForm';

export default function Dashboard() {
  return (
    <div>
      <IncomeForm />
    </div>
  );
}
```

**Form Submission**: Uses `addIncome` server action

**Styling**: Green button with blur backdrop modal

---

### `SideBar`

**Description**: Displays expense analytics including category breakdown and pie chart.

**Location**: `app/components/sideBar.tsx`

**Type**: Server Component (async)

**Props**: None

**Features**:
- Fetches expense data automatically
- Calculates category totals
- Shows progress bars for each category
- Includes pie chart visualization
- Scrollable container for long lists

**Usage**:
```tsx
import SideBar from './components/sideBar';

export default function Dashboard() {
  return (
    <div className="flex">
      <main>Main content</main>
      <SideBar />
    </div>
  );
}
```

**Category Colors**:
```typescript
const categoryColors = {
  health: 'primary',
  entertainment: 'secondary',
  transportation: 'success',
  food: 'warning',
  others: 'danger',
  personalCare: 'default',
};
```

**Empty State**: Shows "No expense data available" when no expenses exist

---

### `NavBar`

**Description**: Top navigation bar with branding and login button.

**Location**: `app/components/navBar.tsx`

**Type**: Client Component

**Props**: None

**Features**:
- Responsive branding text
- Login button (currently non-functional)
- Dark theme styling
- Full width layout

**Usage**:
```tsx
import NavBar from './components/navBar';

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
```

**Responsive Breakpoints**:
- Mobile: text-xl
- Tablet: text-2xl

---

### `Progress`

**Description**: Custom progress bar component for displaying category spending.

**Location**: `app/components/progress.tsx`

**Type**: Client Component

**Props**:
```typescript
interface Props {
  value: number;        // Current value
  label: string;        // Category label
  maxValue: number;     // Maximum value for percentage calculation
  color?: string;       // Progress bar color theme
}
```

**Features**:
- Currency formatting (Indian Rupees)
- Customizable colors
- Value label display
- Responsive design

**Usage**:
```tsx
import Progress from './components/progress';

export default function CategoryList() {
  return (
    <div>
      <Progress 
        value={5000}
        label="Food"
        maxValue={20000}
        color="warning"
      />
    </div>
  );
}
```

**Available Colors**: `primary`, `secondary`, `success`, `warning`, `danger`, `default`

---

### `ExpenseCarousel`

**Description**: Carousel component displaying expense analytics in swipeable slides.

**Location**: `app/components/emblaCarousel.tsx`

**Type**: Client Component

**Props**:
```typescript
interface Props {
  data: Expense[];
  categoryTotals: CategoryTotals;
}
```

**Features**:
- Embla carousel integration
- Two slides: progress bars and pie chart
- Touch/swipe navigation
- Responsive design

**Usage**:
```tsx
import ExpenseCarousel from './components/emblaCarousel';

const expenses = await getExpenses();
const categoryTotals = await calculateCategoryTotals();

export default function MobileView() {
  return (
    <div>
      <ExpenseCarousel 
        data={expenses}
        categoryTotals={categoryTotals}
      />
    </div>
  );
}
```

**Slides**:
1. **Progress Slide**: Category breakdown with progress bars
2. **Chart Slide**: Pie chart visualization

---

## Form Elements

### `Amount`

**Description**: Currency input field for amount values.

**Location**: `app/components/FormElements/amount.tsx`

**Type**: Client Component

**Props**: None (uses HTML form name attribute)

**Features**:
- Number input type with validation
- Indian Rupee (₹) symbol prefix
- Required field validation
- Placeholder: "0.00"

**Usage**:
```tsx
import Amount from './FormElements/amount';

export default function Form() {
  return (
    <form>
      <Amount />
    </form>
  );
}
```

**Form Integration**: Uses `name="amount"` for form data

---

### `Category`

**Description**: Dropdown selector for expense categories.

**Location**: `app/components/FormElements/category.tsx`

**Type**: Client Component

**Props**: None

**Available Categories**:
- Food
- Transportation
- Housing
- Entertainment
- Utilities
- Health
- Personal Care
- Education
- Others

**Usage**:
```tsx
import Category from './FormElements/category';

export default function ExpenseForm() {
  return (
    <form>
      <Category />
    </form>
  );
}
```

**Form Integration**: Uses `name="category"` for form data

---

### `Date`

**Description**: Date picker input for transaction dates.

**Location**: `app/components/FormElements/date.tsx`

**Type**: Client Component

**Props**: None

**Features**:
- HTML5 date input
- Required field validation
- Outside label placement

**Usage**:
```tsx
import Date from './FormElements/date';

export default function TransactionForm() {
  return (
    <form>
      <Date />
    </form>
  );
}
```

**Form Integration**: Uses `name="date"` for form data

---

### `Payment`

**Description**: Dropdown selector for payment methods.

**Location**: `app/components/FormElements/payment.tsx`

**Type**: Client Component

**Props**: None

**Available Options**:
- Credit Card
- Debit Card (note: currently shows "Dedit Card" - typo in source)
- Cash
- Online Payment
- Other

**Usage**:
```tsx
import Payment from './FormElements/payment';

export default function ExpenseForm() {
  return (
    <form>
      <Payment />
    </form>
  );
}
```

**Form Integration**: Uses `name="payment"` for form data

---

### `Vendor`

**Description**: Text input for vendor/payee information.

**Location**: `app/components/FormElements/vendor.tsx`

**Type**: Client Component

**Props**: None

**Features**:
- Text input with validation
- Required field
- Outside label placement

**Usage**:
```tsx
import Vendor from './FormElements/vendor';

export default function ExpenseForm() {
  return (
    <form>
      <Vendor />
    </form>
  );
}
```

**Form Integration**: Uses `name="payee"` for form data

---

### `IncomeSource`

**Description**: Text input for income source information.

**Location**: `app/components/FormElements/incomeSource.tsx`

**Type**: Client Component

**Props**: None

**Features**:
- Text input for income source
- Required field validation
- Outside label placement

**Usage**:
```tsx
import IncomeSource from './FormElements/incomeSource';

export default function IncomeForm() {
  return (
    <form>
      <IncomeSource />
    </form>
  );
}
```

**Form Integration**: Uses `name="income_source"` for form data

---

### `Description`

**Description**: Text input for transaction descriptions.

**Location**: `app/components/FormElements/description.tsx`

**Type**: Client Component

**Props**: None

**Features**:
- Simple text input
- Optional field
- Outside label placement

**Usage**:
```tsx
import Description from './FormElements/description';

export default function TransactionForm() {
  return (
    <form>
      <Description />
    </form>
  );
}
```

**Form Integration**: Uses `name="description"` for form data

---

## Layout Components

### `RootLayout`

**Description**: Root layout component that wraps the entire application.

**Location**: `app/layout.tsx`

**Type**: Server Component

**Props**:
```typescript
interface Props {
  children: React.ReactNode;
}
```

**Features**:
- Sets up global styles and fonts
- Configures dark theme
- Includes toast notifications
- Wraps children with providers

**Usage**: Automatically used by Next.js App Router

**Global Setup**:
- Font: Inter from Google Fonts
- Theme: Dark theme by default
- Toast: React Hot Toast integration

---

### `Providers`

**Description**: Client-side providers wrapper for the application.

**Location**: `app/providers.tsx`

**Type**: Client Component

**Props**:
```typescript
interface Props {
  children: React.ReactNode;
}
```

**Usage**: Used internally by RootLayout

---

## Page Components

### `Home`

**Description**: Main dashboard page displaying transactions and analytics.

**Location**: `app/page.tsx`

**Type**: Server Component (async)

**Props**: None

**Features**:
- Fetches combined transaction data
- Calculates net balance (income - expenses)
- Responsive layout with mobile/tablet breakpoints
- Integrates all major components

**Layout Structure**:
1. **Header**: NavBar component
2. **Controls**: Transaction total, add expense/income buttons
3. **Content**: Transaction list and sidebar analytics

**Balance Calculation**:
```typescript
const amount = combinedData.reduce((acc, curr) => {
  return curr.income_source ? acc + curr.amount : acc - curr.amount;
}, 0);
```

**Responsive Design**:
- Mobile: Stacked layout
- Tablet/Desktop: Side-by-side layout

---

## Styling Guidelines

### Theme Colors
- Primary: `#6200EE` (Purple)
- Success: `#4CAF50` (Green) 
- Danger: `#F44336` (Red)
- Warning: `#FF9800` (Orange)
- Background: `#121212` (Dark)
- Surface: `#1E1E1E` (Dark Gray)

### Typography
- Font Family: Inter
- Headings: Bold, various sizes (text-xl, text-2xl)
- Body: Regular weight, text-base

### Layout
- Container: Full width with padding
- Gaps: Consistent 4-unit spacing (gap-4)
- Borders: Rounded corners (rounded-md, rounded-2xl)
- Shadows: Subtle shadow-xl for elevated elements

### Responsive Breakpoints
- Mobile: Default styles
- Tablet: `tablet:` prefix
- Desktop: Inherits tablet styles

## Best Practices

1. **Server Components**: Use for data fetching and static content
2. **Client Components**: Use for interactivity and browser APIs
3. **Form Handling**: Leverage server actions for mutations
4. **Error Handling**: Always handle null/undefined states
5. **Loading States**: Provide feedback during async operations
6. **Accessibility**: Use semantic HTML and proper labels
7. **Performance**: Optimize images and minimize client-side JavaScript

## Dependencies

### Core Dependencies
- `next`: ^13.5.4
- `react`: ^18
- `@nextui-org/react`: ^2.2.9
- `@supabase/supabase-js`: ^2.39.1

### UI Libraries
- `lucide-react`: ^0.284.0 (Icons)
- `react-icons`: ^4.12.0 (Additional icons)
- `framer-motion`: ^10.16.16 (Animations)

### Chart Libraries
- `chart.js`: ^4.4.3
- `react-chartjs-2`: ^5.2.0

### Form Libraries
- `react-hot-toast`: ^2.4.1 (Notifications)

### Carousel
- `embla-carousel-react`: ^8.1.8