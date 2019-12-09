export class Item {
    name: string = '';
    expense: number = 0;
}

export class Category {
    name: string = '';
    amount: number = 0;
    items: Array<Item> = new Array<Item>();
}

export class MonthExpense {
    month: string = '';
    year: string = '';
    expense_planned: Array<Category> =  new Array<Category>();
}
