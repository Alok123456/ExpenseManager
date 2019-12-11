import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './Dashboard.html';
import Planned from './../../views/Planned.vue';
import { Category, MonthExpense, Item } from '@/expense-types/category';
import ExpenseService from '@/services/api/expenseService';
import { Inject } from 'inversify-props';

@WithRender
@Component({})
export default class Dashboard extends Vue {

    public currentMonth: string = '';
    public currentYear: string = '';
    public showComponent: boolean = false;
    public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    @Inject()
    private expenseService!: ExpenseService;

    private monthlyExpense: MonthExpense[];

    constructor() {
        super();
        this.monthlyExpense = [];
    }

    protected created() {
        this.getExpenses();
    }

    @Watch('$route', { immediate: true, deep: true })
    protected onUrlChange(newVal: any) {
        if (newVal.fullPath === '/' && newVal.name === null) {
            this.showComponent = false;
        } else {
            this.showComponent = true;
        }
    }

    private getExpenses() {
        this.expenseService.getExpenses().then((expenses) => {
            this.monthlyExpense = expenses;
            if (this.monthlyExpense.length) {
                this.getExistingMonth();
            }
        }).catch((error) => {
        });
    }

    private trackMonthYearChangeState() {
        this.$store.dispatch('changeCurrentMonthState', this.currentMonth);
        this.$store.dispatch('changeCurrentYearState', this.currentYear);
    }

    private getExistingMonth() {
        this.currentMonth = this.monthlyExpense[0].month;
        this.currentYear = this.monthlyExpense[0].year;
        this.trackMonthYearChangeState();
        this.$store.dispatch('addMonthlyCategory', this.monthlyExpense);
    }

    public AddMonthlyCategory(category: Category): void {
        const index = this.monthlyExpense.findIndex((el) => (el.month === this.currentMonth && el.year === this.currentYear));
        if (index >= 0) {
            this.monthlyExpense[index].expense_planned.push(category);
            this.trackMonthYearChangeState();
            this.$store.dispatch('addMonthlyCategory', this.monthlyExpense);
        }
    }

    public AddMonthlyCategItem(item: Item, categName: string) {
        const index = this.monthlyExpense.findIndex((el) => el.month === this.currentMonth);
        const categIndex = index >= 0 ?
            this.monthlyExpense[index].expense_planned.findIndex((el) => el.name === categName) : index;
        if (categIndex >= 0) {
            this.monthlyExpense[index].expense_planned[categIndex].items.push(item);
        }
        this.trackMonthYearChangeState();
        this.$store.dispatch('addMonthlyCategory', this.monthlyExpense);
    }

    private checkForNextMonthYear() {
        if (this.currentMonth === 'December') {
            this.currentYear = (+this.currentYear + 1).toString();
            this.currentMonth = this.months[0];
        } else {
            const monthIndex = this.months.findIndex((el) => el === this.currentMonth);
            this.currentMonth = this.months[monthIndex + 1];
        }
        this.trackMonthYearChangeState();
        const index = this.monthlyExpense.findIndex((el) => (el.month === this.currentMonth && el.year === this.currentYear));
        if (index >= 0) {
            return this.monthlyExpense.length > index;
        }
        return false;
    }

    private checkForPrevMonthYear() {
        let currentYear = '', currentMonth = '';
        if (this.currentMonth === 'January') {
            currentYear = (+this.currentYear - 1).toString();
            currentMonth = this.months[11];
        } else {
            const monthIndex = this.months.findIndex((el) => el === this.currentMonth);
            currentMonth = this.months[monthIndex - 1];
            currentYear = this.currentYear;
        }
        const index = this.monthlyExpense.findIndex((el) => (el.month === currentMonth && el.year === currentYear));
        if (index >= 0) {
            this.currentMonth = currentMonth;
            this.currentYear = currentYear;
            return true;
        }
        return false;
    }

    public addOrVisitNextMonthYear() {
        if (!this.checkForNextMonthYear()) {
            this.monthlyExpense.push({ month: this.currentMonth, year: this.currentYear, expense_planned: [] });
        }
    }

    public visitPrevMonthYear() {
        if(this.checkForPrevMonthYear()) {
            this.trackMonthYearChangeState();
        } 
        return;
    }

}
