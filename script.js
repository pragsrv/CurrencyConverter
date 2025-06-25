document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const reverseButton = document.getElementById('reverse');
    const resultDisplay = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');
    const loadingElement = document.getElementById('loading');

    const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
    let rates = {};

    function createStars() {
        const starsContainer = document.querySelector('.stars');
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    function createParticles() {
        const card = document.querySelector('.converter-card');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            card.appendChild(particle);
        }
    }

    const fetchRates = async () => {
        try {
            loadingElement.style.display = 'block';
            resultDisplay.style.opacity = '0.5';
            
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            rates = { USD: 1, ...data.rates };
            updateCurrencyOptions(Object.keys(rates));
            
            loadingElement.style.display = 'none';
            resultDisplay.style.opacity = '1';
            errorMessage.textContent = '';
        } catch (error) {
            console.error('Error fetching currency rates:', error);
            errorMessage.textContent = 'Failed to fetch currency rates. Please try again.';
            loadingElement.style.display = 'none';
            resultDisplay.style.opacity = '1';
        }
    };

    const updateCurrencyOptions = (currencies) => {
        const sortedCurrencies = currencies.sort();
        
        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';

        sortedCurrencies.forEach(currency => {
            const option1 = new Option(currency, currency);
            const option2 = new Option(currency, currency);
            fromCurrencySelect.add(option1);
            toCurrencySelect.add(option2);
        });

        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
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
        if (Object.keys(rates).length === 0) {
            errorMessage.textContent = 'Currency rates not loaded. Please try again.';
            return false;
        }
        
        errorMessage.textContent = '';
        return true;
    };

    const convertCurrency = () => {
        if (!validateInput()) return;

        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        const rate = rates[toCurrency] / rates[fromCurrency];
        const convertedAmount = amount * rate;
        
        resultDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            resultDisplay.style.transform = 'scale(1)';
        }, 200);
        
        resultDisplay.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    };

    const reverseCurrencies = () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        fromCurrencySelect.value = toCurrency;
        toCurrencySelect.value = fromCurrency;

        if (amountInput.value) {
            convertCurrency();
        }
    };

    convertButton.addEventListener('click', convertCurrency);
    reverseButton.addEventListener('click', reverseCurrencies);
    
    amountInput.addEventListener('input', () => {
        if (amountInput.value && validateInput()) {
            convertCurrency();
        }
    });

    fromCurrencySelect.addEventListener('change', () => {
        if (amountInput.value && validateInput()) {
            convertCurrency();
        }
    });

    toCurrencySelect.addEventListener('change', () => {
        if (amountInput.value && validateInput()) {
            convertCurrency();
        }
    });

    createStars();
    createParticles();
    fetchRates();
});