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
    public showComponent: boolean = false;

    @Inject()
    private expenseService!: any;


    private monthlyExpense: MonthExpense[];
    private monthNames: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June',
                                       'July', 'August', 'September', 'October', 'November', 'December'];

    constructor() {
        super();
        this.monthlyExpense = [];
    }

    protected created() {
        this.currentMonth = this.getExistingMonth();
        this.trackMonthChangeState();
    }

    protected async mounted(): Promise<void> {
      const expense = await this.getExpenses();
      console.log('expense', expense);
      }

    @Watch('$route', {immediate: true, deep: true})
    private onUrlChange(newVal: any) {
        if (newVal.fullPath === '/' && newVal.name === null) {
            this.showComponent = false;
        } else {
            this.showComponent = true;
        }
    }

    private async getExpenses(): Promise<void> {
        const expenses = await this.expenseService.getExpenses();
        console.log('expenses', expenses);
      }

    private trackMonthChangeState() {
        this.$store.dispatch('changeCurrentMonthState', this.currentMonth);
    }

    private getExistingMonth(monthNo?: number) {
        const d = new Date();
        const month = monthNo ?
                      this.monthNames[this.monthNames.findIndex((el) => el === this.currentMonth) + monthNo] :
                      this.monthNames[d.getMonth()];
        return month;
    }

   private AddMonthlyCategory(category: Category): void {
            const index = this.monthlyExpense.findIndex((el) => el.month === this.currentMonth);
            if (!(index >= 0)) {
                this.monthlyExpense.push({month: this.currentMonth, expense_planned: [category]});
            } else {
                this.monthlyExpense[index].expense_planned.push(category);
            }
            this.$store.dispatch('addMonthlyCategory', this.monthlyExpense);
    }

    private AddMonthlyCategItem(item: Item, categName: string) {
            const index = this.monthlyExpense.findIndex((el) => el.month === this.currentMonth);
            const categIndex = index >= 0 ?
                            this.monthlyExpense[index].expense_planned.findIndex((el)=> el.name === categName) : index;
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
