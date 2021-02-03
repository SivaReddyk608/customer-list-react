import _ from "lodash";
import moment from "moment";

import customers from "../data/customers.json";
import transactions from "../data/transactions.json";

export const getCustomerDataFormatted = () => {
  let formattedCustomers = [];
  customers.forEach(customer => {
    const customerTransactions = transactions.filter(
      transaction => transaction.customerId === customer.id
    );
    var groupedTransactions = _.groupBy(customerTransactions, function(
      transaction
    ) {
      const date = moment(parseInt(transaction.createdAt));
      return date.format("MM/YYYY");
    });
    let newCustomer = { ...customer };
    Object.entries(groupedTransactions).forEach(
      ([month, monthlyTransactions]) => {
        let bonus = 0;
        monthlyTransactions.forEach(transaction => {
          const { amount } = transaction;
          bonus = 2 * (amount - 100) + ((amount % 50) - 1) * 50;
        });

        newCustomer.monthStats = { ...newCustomer.monthStats, [month]: bonus };
      }
    );
    newCustomer.totalBonus = Object.values(newCustomer.monthStats).reduce(
      (prev, next) => prev + next,
      0
    );
    formattedCustomers.push(newCustomer);
  });
  return formattedCustomers;
};
