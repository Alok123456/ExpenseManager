import { HTTP } from '../common/Api';
import axios from 'axios';

import { injectable } from 'inversify-props';

@injectable()
export default class ExpenseService {

    public getExpenses() {
            return HTTP.get('./JSON/expense.json').then((response) => {
                    return response.data;
            });
    }
}
