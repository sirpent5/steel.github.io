const pool = require('./db');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const { PRICES } = require('./constants');

function filterByBudget(services, budget, type)
{
  const selected = [];
  let total = 0;

  for (const serviceName of services) {
    const servicePrices = PRICES[serviceName];
    if (!servicePrices) continue; 

    const price = servicePrices[type] ?? servicePrices['default'];

    if (total + price <= budget) {
      selected.push({ name: serviceName, price });
      total += price;
    } else {
      break; // stop once budget would be exceeded
    }
  }

  return selected;
}

module.exports = {
  filterByBudget
};
