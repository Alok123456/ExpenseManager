import Vue from 'vue';
import Vuex from 'vuex';
import { Category, MonthExpense } from '@/expense-types/category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monthlyExpese: Array<MonthExpense>(),
    currentMonth: String,
    categoryList: Array<Category>()
  },
  mutations: {
    addMonthlyCategory(state, monthlyexpense: Array<MonthExpense>) {
      state.monthlyExpese = monthlyexpense;
  },
  changeCurrentMonthState(state, month) {
    state.currentMonth = month;
  }
  },
  actions: {
    addMonthlyCategory(context, monthlyCateg: MonthExpense) {
      return new Promise((resolve, reject) => {
        context.commit('addMonthlyCategory', monthlyCateg);
        resolve();
      });
  },
  changeCurrentMonthState(context, month: String) {
    return new Promise((resolve, reject) => {
      context.commit('changeCurrentMonthState', month);
      resolve();
    });
}
  },
  getters: {
    categoryList: (state) => {
      let expenseForMonth = state.monthlyExpese.find((el) => <string>el.month == state.currentMonth.toString());
      console.log('expenseForMonth', expenseForMonth);
            return expenseForMonth ? expenseForMonth.expense_planned : [];
          },
    currentMonth: (state) => {
      return state.currentMonth;
    },
  },
  modules: {
  },
});
