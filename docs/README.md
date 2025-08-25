# Money Minder - Complete Documentation

## 📋 Overview

Money Minder is a comprehensive expense tracking application built with **Next.js 13**, **React**, **TypeScript**, and **Supabase**. This documentation provides complete coverage of all public APIs, components, functions, and usage patterns.

## 📚 Documentation Structure

This documentation is organized into several comprehensive guides:

### 🔧 [API Documentation](./API_DOCUMENTATION.md)
Complete reference for all server actions, data fetching functions, utility functions, and type definitions.

**Covers:**
- Server Actions (`addExpense`, `addIncome`)
- Data Fetching Functions (`getExpenses`, `getIncomes`, `combinedDatas`)
- Utility Functions (`calculateCategoryTotals`, `calculateExpenseAmount`)
- Type Definitions and Database Schema
- Error Handling and Authentication

### 🧩 [Component Documentation](./COMPONENT_DOCUMENTATION.md)
Detailed documentation for all React components with props, features, and styling guidelines.

**Covers:**
- Main Components (`List`, `PieChart`, `ExpenseForm`, `IncomeForm`, `SideBar`, etc.)
- Form Elements (`Amount`, `Category`, `Date`, `Payment`, `Vendor`, etc.)
- Layout Components (`NavBar`, `RootLayout`)
- Page Components and Responsive Design

### 💡 [Usage Examples & Integration Guide](./USAGE_EXAMPLES.md)
Practical examples and patterns for implementing and extending the application.

**Covers:**
- Quick Start Examples
- Component Integration Patterns
- Custom Form Implementations
- Advanced Data Fetching
- Error Handling Strategies
- Performance Optimization
- Testing Examples

---

## 🚀 Quick Start

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd money-minder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev
```

### Basic Usage

```tsx
// Simple dashboard implementation
import List from './components/List';
import SideBar from './components/sideBar';
import ExpenseForm from './components/expenseForm';
import IncomeForm from './components/incomeForm';

export default function Dashboard() {
  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1">
        <div className="flex gap-2 mb-4">
          <ExpenseForm />
          <IncomeForm />
        </div>
        <List />
      </div>
      <SideBar />
    </div>
  );
}
```

---

## 📖 API Reference

### Server Actions

#### `addExpense(formData: FormData)`
Adds a new expense to the database with automatic cache revalidation.

```tsx
// Form implementation
<form action={addExpense}>
  <input name="amount" type="number" required />
  <input name="category" type="text" required />
  <input name="payee" type="text" required />
  <input name="date" type="date" required />
  <input name="payment" type="text" required />
  <button type="submit">Add Expense</button>
</form>
```

#### `addIncome(formData: FormData)`
Adds a new income entry to the database.

```tsx
// Form implementation
<form action={addIncome}>
  <input name="amount" type="number" required />
  <input name="date" type="date" required />
  <input name="income_source" type="text" required />
  <button type="submit">Add Income</button>
</form>
```

### Data Fetching

#### `getExpenses()` → `Promise<Expense[] | null>`
Fetches all expense records from the database.

#### `getIncomes()` → `Promise<Income[] | null>`
Fetches all income records from the database.

#### `combinedDatas()` → `Promise<(Expense | Income)[]>`
Returns combined and sorted transaction data.

### Utility Functions

#### `calculateCategoryTotals()` → `Promise<CategoryTotals>`
Calculates total expenses grouped by category.

```tsx
const categoryTotals = await calculateCategoryTotals();
// Returns: { food: 5000, transportation: 2000, ... }
```

---

## 🧩 Component Reference

### Core Components

| Component | Type | Purpose |
|-----------|------|---------|
| `List` | Server | Displays combined transaction list |
| `PieChart` | Client | Expense distribution visualization |
| `ExpenseForm` | Client | Modal form for adding expenses |
| `IncomeForm` | Client | Modal form for adding income |
| `SideBar` | Server | Analytics dashboard with charts |
| `Progress` | Client | Category progress bars |
| `NavBar` | Client | Top navigation bar |

### Form Elements

| Component | Purpose | Form Name |
|-----------|---------|-----------|
| `Amount` | Currency input | `amount` |
| `Category` | Expense category selector | `category` |
| `Date` | Date picker | `date` |
| `Payment` | Payment method selector | `payment` |
| `Vendor` | Payee input | `payee` |
| `IncomeSource` | Income source input | `income_source` |

### Usage Examples

```tsx
// Basic form with validation
import { ExpenseForm, IncomeForm } from './components';

export default function TransactionForms() {
  return (
    <div className="flex gap-4">
      <ExpenseForm />
      <IncomeForm />
    </div>
  );
}

// Custom analytics dashboard
import { SideBar, PieChart } from './components';
import { calculateCategoryTotals } from './components/calculateCategoryTotals';

export default async function Analytics() {
  const categoryTotals = await calculateCategoryTotals();
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <SideBar />
      <PieChart categoryTotals={categoryTotals} />
    </div>
  );
}
```

---

## 🎨 Styling & Theming

### Design System

**Colors:**
- Primary: `#6200EE` (Purple)
- Success: `#4CAF50` (Green)
- Danger: `#F44336` (Red)
- Warning: `#FF9800` (Orange)
- Background: `#121212` (Dark)
- Surface: `#1E1E1E` (Dark Gray)

**Typography:**
- Font: Inter (Google Fonts)
- Headings: Bold, responsive sizes
- Body: Regular weight, consistent spacing

**Layout:**
- Mobile-first responsive design
- Consistent 4-unit spacing system
- Rounded corners and subtle shadows
- Dark theme throughout

### CSS Classes

```css
/* Common utility classes */
.bg-primary { background-color: #6200EE; }
.bg-surface { background-color: #1E1E1E; }
.text-primary { color: #6200EE; }
.text-success { color: #4CAF50; }
.text-danger { color: #F44336; }

/* Layout utilities */
.container-main { 
  background-color: #121212;
  min-height: 100vh;
  padding: 1rem;
}

.card {
  background-color: #1E1E1E;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

---

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema

#### Expense Table
```sql
CREATE TABLE expense (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  payee TEXT NOT NULL,
  payment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Income Table
```sql
CREATE TABLE income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL NOT NULL,
  date TEXT NOT NULL,
  income_source TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: Default styles (< 768px)
- **Tablet**: `tablet:` prefix (768px - 1024px)
- **Desktop**: Inherits tablet styles (> 1024px)

### Layout Patterns

```tsx
// Responsive layout example
<div className="flex mobile:flex-col tablet:flex-row gap-4">
  <div className="mobile:w-full tablet:w-2/3">
    <List />
  </div>
  <div className="mobile:w-full tablet:w-1/3">
    <SideBar />
  </div>
</div>
```

---

## 🧪 Testing

### Unit Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

### Example Test

```tsx
// __tests__/components/Progress.test.tsx
import { render, screen } from '@testing-library/react';
import Progress from '../components/progress';

test('renders progress bar correctly', () => {
  render(
    <Progress value={5000} label="Food" maxValue={10000} />
  );
  
  expect(screen.getByText('Food')).toBeInTheDocument();
});
```

---

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup

1. Add environment variables in Vercel dashboard
2. Configure Supabase authentication
3. Set up database tables and RLS policies

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes and test thoroughly**
4. **Update documentation** if needed
5. **Submit a pull request**

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow Next.js recommended rules
- **Prettier**: Consistent code formatting
- **Components**: Use functional components with hooks
- **Server Actions**: For data mutations
- **Error Handling**: Always handle edge cases

### Documentation Standards

- **JSDoc comments** for all public functions
- **README updates** for new features
- **Example usage** for all components
- **Type definitions** for all interfaces

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

---

## 🆘 Support

### Common Issues

1. **Database Connection**: Check Supabase credentials
2. **Build Errors**: Ensure all dependencies are installed
3. **Type Errors**: Run `npm run type-check`
4. **Styling Issues**: Check Tailwind CSS configuration

### Getting Help

- **Documentation**: Start with this comprehensive guide
- **Examples**: Check the [Usage Examples](./USAGE_EXAMPLES.md)
- **Issues**: Open a GitHub issue with detailed description
- **Discussions**: Use GitHub Discussions for questions

---

## 📚 Additional Resources

### External Documentation
- [Next.js 13 Documentation](https://nextjs.org/docs)
- [NextUI Components](https://nextui.org/docs/guide/introduction)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Related Projects
- [React Hook Form](https://react-hook-form.com/) - For advanced form handling
- [React Query](https://tanstack.com/query) - For client-side data fetching
- [Framer Motion](https://www.framer.com/motion/) - For animations

---

## 🏗️ Architecture Overview

```
money-minder/
├── app/                          # Next.js 13 App Router
│   ├── components/              # React Components
│   │   ├── FormElements/       # Form Input Components
│   │   ├── List.tsx           # Transaction List
│   │   ├── chart.tsx          # Pie Chart Component
│   │   ├── expenseForm.tsx    # Expense Form Modal
│   │   ├── incomeForm.tsx     # Income Form Modal
│   │   ├── sideBar.tsx        # Analytics Sidebar
│   │   └── ...
│   ├── actions.ts             # Server Actions
│   ├── layout.tsx            # Root Layout
│   ├── page.tsx              # Home Page
│   └── globals.css           # Global Styles
├── docs/                      # Documentation
│   ├── API_DOCUMENTATION.md   # API Reference
│   ├── COMPONENT_DOCUMENTATION.md # Component Guide
│   ├── USAGE_EXAMPLES.md      # Usage Examples
│   └── README.md             # This file
├── public/                    # Static Assets
├── package.json              # Dependencies
└── next.config.js           # Next.js Configuration
```

This comprehensive documentation provides everything needed to understand, use, and extend the Money Minder application. Each section includes practical examples, best practices, and detailed explanations to help developers at all levels.