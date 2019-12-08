import { HTTP } from '../common/Api';
import axios from 'axios';

import { injectable } from 'inversify-props';

@injectable()
export default class ExpenseService {

    public async getExpenses(): Promise<any> {
            const httpResponse = await axios.get('./JSON/expense.json');
            return httpResponse.data;
    }
}
