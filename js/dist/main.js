(function () {
  "use strict";
  // Converts value to USD
  Handlebars.registerHelper('currency', function (value) {
    return parseFloat(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }); // Converts a value into a UTC date and slices the time value off

  Handlebars.registerHelper('dateUTC', function (value) {
    return new Date(value).toUTCString().slice(0, 16);
  }); // Register partial template for the daily trend

  Handlebars.registerPartial('dailyTrend', Handlebars.templates['dailyTrend']);

  var getStock = function getStock(data, numDays) {
    var symbol = data["Meta Data"]["2. Symbol"];
    var checkedDays = [];

    for (var i = 0; i < numDays; i++) {
      var day = Object.keys(data["Time Series (Daily)"])[i];
      var _data$TimeSeriesDa = data["Time Series (Daily)"][day],
          open = _data$TimeSeriesDa["1. open"],
          high = _data$TimeSeriesDa["2. high"],
          low = _data$TimeSeriesDa["3. low"],
          close = _data$TimeSeriesDa["4. close"];
      checkedDays.push({
        day: day,
        open: open,
        high: high,
        low: low,
        close: close
      });
    }

    var report = {
      symbol: symbol,
      checkedDays: checkedDays
    };
    document.querySelector(".stock-report").innerHTML = Handlebars.templates['dailyReport'](report);
  };
  /**
   * Displays error messages to the user
   * @param {String} message - An error message to display to the user
   */


  var displayError = function displayError(message) {
    return document.querySelector(".error").innerText = message;
  };
  /**
   * Event listener on form submit that fetches the API information and
   * hands it off to the appropriate handlebars template
   */


  document.querySelector(".stock-checker").addEventListener("submit", function (e) {
    var API_KEY = "2DE0CRFOOAHI7SNE";
    var ENDPOINT = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
    var checkDays = 1;
    var symbol = e.target.elements.symbol.value.toUpperCase().replace(" ", "").trim();

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
      var stockURL = "".concat(ENDPOINT).concat(symbol, "&apikey=").concat(API_KEY);
      fetch(stockURL).then(function (data) {
        return data.json();
      }).then(function (json) {
        return getStock(json, checkDays);
      })["catch"](function (err) {
        return displayError("Could not find symbol. Check for typos or wait a moment.");
      });
    }

    e.preventDefault();
  }); // TODO: Watch number of requests per minute for better error notifications to user
})();
