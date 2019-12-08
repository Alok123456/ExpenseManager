export class Item {
    name: String = '';
    expense: number = 0;
}

export class Category {
    name: String = '';
    amount: number = 0;
    items: Array<Item> = new Array<Item>();
}

export class MonthExpense {
    month: String = '';
    expense_planned: Array<Category> =  new Array<Category>();
}
