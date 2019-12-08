import { container } from 'inversify-props';
import ExpenseService from '@/services/api/expenseService';

export default function buildDependencyContainer(): void {
    container.addTransient<any>(ExpenseService);
}
