document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const reverseButton = document.getElementById('reverse');
    const resultParagraph = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');

    const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Base currency USD

    let rates = {};

    const fetchRates = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            rates = data.rates;
            // Update dropdown options dynamically based on available currencies
            updateCurrencyOptions(Object.keys(rates));
        } catch (error) {
            console.error('Error fetching currency rates:', error);
            resultParagraph.textContent = 'Failed to fetch currency rates.';
        }
    };

    const updateCurrencyOptions = (currencies) => {
        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';

        currencies.forEach(currency => {
            fromCurrencySelect.add(new Option(currency, currency));
            toCurrencySelect.add(new Option(currency, currency));
        });
    };

    const validateInput = () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            errorMessage.textContent = 'Please enter a valid amount greater than zero.';
            return false;
        }
        if (fromCurrency === toCurrency) {
            errorMessage.textContent = 'Please select different currencies for conversion.';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    };

    const convertCurrency = () => {
        if (!validateInput()) {
            return;
        }

        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        const rate = rates[toCurrency] / rates[fromCurrency];
        const convertedAmount = amount * rate;
        resultParagraph.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    };

    const reverseCurrencies = () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        fromCurrencySelect.value = toCurrency;
        toCurrencySelect.value = fromCurrency;

        convertCurrency();
    };

    convertButton.addEventListener('click', convertCurrency);
    reverseButton.addEventListener('click', reverseCurrencies);

    // Fetch rates and initialize currency options on load
    fetchRates();
    const convertcurrency = () => {
        if (!validateInput()) {
            return;
        }

        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        const rate = rates[toCurrency] / rates[fromCurrency];
        const convertedAmount = amount * rate;
        resultParagraph.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    };

    const reversecurrencies = () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        fromCurrencySelect.value = toCurrency;
        toCurrencySelect.value = fromCurrency;

        convertCurrency();
    };
});