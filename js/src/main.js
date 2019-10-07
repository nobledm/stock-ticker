// Converts value to USD
Handlebars.registerHelper('currency', (value) => {
  return parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
});

// Converts a value into a UTC date and slices the time value off
Handlebars.registerHelper('dateUTC', (value) => new Date(value).toUTCString().slice(0, 16));

// Register partial template for the daily trend
Handlebars.registerPartial('dailyTrend', Handlebars.templates['dailyTrend']);

const getStock = (data, numDays) => {
  let { ["2. Symbol"]: symbol } = data["Meta Data"];
  let checkedDays = [];

  for (let i = 0; i < numDays; i++) {
    let day = Object.keys(data["Time Series (Daily)"])[i];
    let {
      ["1. open"]: open,
      ["2. high"]: high,
      ["3. low"]: low,
      ["4. close"]: close
    } = data["Time Series (Daily)"][day];

    checkedDays.push({day, open, high, low, close});
  }

  let report = { symbol, checkedDays };
  document.querySelector(".stock-report").innerHTML = Handlebars.templates['dailyReport'](report);
}

/**
 * Displays error messages to the user
 * @param {String} message - An error message to display to the user
 */
const displayError = message => document.querySelector(".error").innerText = message;

/**
 * Event listener on form submit that fetches the API information and
 * hands it off to the appropriate handlebars template
 */
document.querySelector(".stock-checker").addEventListener("submit", e => {
  const API_KEY = "2DE0CRFOOAHI7SNE";
  const ENDPOINT = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  let checkDays = 1;
  let symbol = e.target.elements.symbol.value
    .toUpperCase()
    .replace(" ", "")
    .trim();
  
  if (e.target.elements.history.checked) {
    // Current day + previous five trade days
    checkDays = 6;
  }

  displayError("");

  if (symbol == "") {
    displayError("Please enter a symbol");
  } else if (symbol.match(/[`~!@#$%^&*()_+\-/=<>,;:'"]/g)) {
    // Allow periods for stocks like 300135.SZ
    displayError("Cannot use special characters");
  } else {
    let stockURL = `${ENDPOINT}${symbol}&apikey=${API_KEY}`;

    fetch(stockURL)
      .then(data => data.json())
      .then(json => getStock(json, checkDays))
      .catch(err => displayError("Could not find symbol. Check for typos or wait a moment."));
  }

  e.preventDefault();
});
// TODO: Watch number of requests per minute for better error notifications to user
