import Vue from 'vue';
import Vuex from 'vuex';
import { Category, MonthExpense } from '@/expense-types/category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monthlyExpense: Array<MonthExpense>(),
    currentMonth: String,
    currentYear: String,
    categoryList: Array<Category>()
  },
  mutations: {
    addMonthlyCategory(state, monthlyexpense: Array<MonthExpense>) {
      state.monthlyExpense = monthlyexpense;
  },
  changeCurrentMonthState(state, month) {
    state.currentMonth = month;
  },
  changeCurrentYearState(state, month) {
    state.currentYear = month;
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
},
changeCurrentYearState(context, year: String) {
  return new Promise((resolve, reject) => {
    context.commit('changeCurrentYearState', year);
    resolve();
  });
}
  },
  getters: {
    categoryList: (state) => {
      let expenseForMonth = state.monthlyExpense.find((el) => (<string>el.month === state.currentMonth.toString() && <string>el.year === state.currentYear.toString()));
            return expenseForMonth ? expenseForMonth.expense_planned : [];
          },
    currentMonth: (state) => {
      return state.currentMonth;
    },
    currentYear: (state) => {
      return state.currentYear;
    }
  },
  modules: {
  },
});
