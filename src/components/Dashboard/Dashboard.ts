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

    @Inject()
    private expenseService!: ExpenseService;


    private monthlyExpense: MonthExpense[];
    private yearsMonths: string[] = [];

    constructor() {
        super();
        this.monthlyExpense = [];
    }

    protected created() {
        this.getExpenses();
    }

    @Watch('$route', { immediate: true, deep: true })
    private onUrlChange(newVal: any) {
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
                this.trackMonthChangeState();
                this.$store.dispatch('addMonthlyCategory', this.monthlyExpense);
            }
        }).catch((error) => {
            console.log('error', error);
        });
    }

    private trackMonthChangeState() {
        this.$store.dispatch('changeCurrentMonthState', this.currentMonth);
    }

    private getExistingMonth() {
        this.monthlyExpense.forEach((el) => {
            this.yearsMonths.push(el.year + '-' + el.month);
        })
        this.currentMonth = this.monthlyExpense[0].month;
        this.currentYear = this.monthlyExpense[0].year;
    }

    private AddMonthlyCategory(category: Category): void {
        const index = this.monthlyExpense.findIndex((el) => el.month === this.currentMonth);
        if (!(index >= 0)) {
            this.monthlyExpense.push({ month: this.currentMonth, year: '2019', expense_planned: [category] });
        } else {
            this.monthlyExpense[index].expense_planned.push(category);
        }
        this.$store.dispatch('addMonthlyCategory', this.monthlyExpense);
    }

    private AddMonthlyCategItem(item: Item, categName: string) {
        const index = this.monthlyExpense.findIndex((el) => el.month === this.currentMonth);
        const categIndex = index >= 0 ?
            this.monthlyExpense[index].expense_planned.findIndex((el) => el.name === categName) : index;
        if (categIndex >= 0) {
            this.monthlyExpense[index].expense_planned[categIndex].items.push(item);
        }
        this.$store.dispatch('addMonthlyCategory', this.monthlyExpense);
    }

    private nextMonth() {
        if (!(this.currentMonth === 'December')) {
            this.currentMonth = this.getExistingMonth(1);
            this.trackMonthChangeState();
        }
    }

    private prevMonth() {
        if (!(this.currentMonth === 'January')) {
            this.currentMonth = this.getExistingMonth(-1);
            this.trackMonthChangeState();
        }
    }

}
