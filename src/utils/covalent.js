// Define the variables and constants needed for the calculation
const API_KEY = process.env.COVALENT_API_KEY; // Replace with your own API key
const CHAIN_ID = 1; // Ethereum mainnet
const PROJECT_ADDRESS = "0xbD2245353f27CA2F1915443d922eD4a8d25c45a6"; // Replace with your own project address
const NETWORK_TOTALS = {
  tokenValue: 1000000000, // Total value of all tokens on the network in USD
  portfolioValueChange: 0.1, // Percentage change in portfolio value over time for the whole network
  transactionCount: 1000000, // Total number of transactions on the network
  logEventCount: 1000000, // Total number of log events on the network
  gasSpent: 1000000000 // Total amount of gas spent on the network
};
const MIN_MAX_VALUES = {
  tokenValue: { min: 0, max: 1000000 }, // Min and max values of token value in USD for normalization
  portfolioValueChange: { min: -1, max: 1 }, // Min and max values of portfolio value change for normalization
  transactionCount: { min: 0, max: 10000 }, // Min and max values of transaction count for normalization
  logEventCount: { min: 0, max: 10000 }, // Min and max values of log event count for normalization
  gasSpent: { min: 0, max: 10000000 } // Min and max values of gas spent for normalization
};

// Define a helper function to fetch data from Covalent API using fetch and async/await
async function fetchData(endpoint) {
  const url = `https://api.covalenthq.com/v1/${CHAIN_ID}/${endpoint}/?key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

// Define a helper function to normalize a value using min-max normalization
function normalize(value, min, max) {
  return (value - min) / (max - min);
}

// Define a main function to calculate the impact rank of a project using the formula and the data from Covalent API
export async function calculateImpactRank() { // The metrics that go inside the calculation must be rethinked before releasing this project to production
    // Get token balances for address
    const tokenBalances = await fetchData(`address/${PROJECT_ADDRESS}/balances_v2`);
    //console.log("tokenBalanaces: ",tokenBalances);

    // Calculate token score by summing up token values and dividing by network total
    let tokenValue = 0;
    for (let item of tokenBalances.items) {
    tokenValue += item.quote;
    }
    let tokenScore = normalize(tokenValue, MIN_MAX_VALUES.tokenValue.min, MIN_MAX_VALUES.tokenValue.max) * 100;
    //console.log("tokenScore: ",tokenScore);

    // Get historical portfolio value over time
    // const portfolioValues = await fetchData(`address/${PROJECT_ADDRESS}/portfolio_v2`);
    //console.log("portfolioValues: ",portfolioValues);

    // // Calculate portfolio score by getting percentage change in portfolio value over time and dividing by network total
    // let portfolioValueArray = portfolioValues.items[0].holdings.map(item => item.portfolio_value); // This will create an array of portfolio values for each date using the first token balance item
    // console.log("portfolioValueArray: ",portfolioValueArray);
    // let portfolioValueChange = (portfolioValueArray[portfolioValueArray.length - 1] - portfolioValueArray[0]) / portfolioValueArray[0]; // This will calculate the percentage change in portfolio value from the first date to the last date
    // console.log("portfolioValueChange: ",portfolioValueChange);
    // let portfolioScore = normalize(portfolioValueChange, MIN_MAX_VALUES.portfolioValueChange.min, MIN_MAX_VALUES.portfolioValueChange.max) * 100; // This will normalize and scale the portfolio score
    // console.log("portfolioScore: ",portfolioScore);

    // Get transactions
    const transactions = await fetchData(`address/${PROJECT_ADDRESS}/transactions_v2`);
    // console.log("transactions: ",transactions);
    // Calculate transaction score by getting transaction count and dividing by network total

    let transactionCount = transactions.items.length; // total_count is a null that's where the problem lays so I feel like we could just do it manually from code without using existing fucntions
    // console.log("transactionCount: ",transactionCount);
    let transactionScore = normalize(transactionCount, MIN_MAX_VALUES.transactionCount.min, MIN_MAX_VALUES.transactionCount.max) * 100;
    // console.log("transactionScore: ",transactionScore);

    // // Get log events by topic hash
    // const logEvents = await fetchData(`events/address/${PROJECT_ADDRESS}/`);
    // console.log("logEvents: ",logEvents);
    // let logEventCount = logEvents.length; // total_count is a null

    // // Calculate log event score by getting log event count and dividing by network total
    // let logEventScore = normalize(logEventCount, MIN_MAX_VALUES.logEventCount.min, MIN_MAX_VALUES.logEventCount.max) * 100;

    // Calculate gas score by summing up gas spent and dividing by network total
    let gasSpent = 0;
    for (let item of transactions.items) {
        gasSpent += item.gas_spent;
    }
    // console.log("gasSpent: ",gasSpent);
    let gasScore = normalize(gasSpent, MIN_MAX_VALUES.gasSpent.min, MIN_MAX_VALUES.gasSpent.max) * 100;
    // console.log("gasScore: ",gasScore);

    // Calculate impact rank by applying the formula
    let impactRank = (0.2 * tokenScore) + (0.2 * transactionScore) + (0.2 * gasScore);
    console.log("tokenScore: ",tokenScore," transactionScore: ",transactionScore," gasScore: ",gasScore);
    // Return the impact rank
    return impactRank;
}

// Call the main function and console.log the result
calculateImpactRank().then(result => console.log("Impact rank for this project is: ",result));
