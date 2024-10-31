document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let balance = 0;
    const interestRate = 0.025; // 2.5% anual
    let transactions = [];

    const currentBalanceElement = document.getElementById('current-balance');
    const annualInterestElement = document.getElementById('annual-interest');
    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const transactionForm = document.getElementById('transaction-form');
    const transactionAmount = document.getElementById('transaction-amount');
    const confirmTransactionBtn = document.getElementById('confirm-transaction');
    const cancelTransactionBtn = document.getElementById('cancel-transaction');
    const calculateInterestBtn = document.getElementById('calculate-interest');
    const interestRateInput = document.getElementById('interest-rate');
    const transactionList = document.getElementById('transaction-list');

    function updateBalance() {
        currentBalanceElement.textContent = `$${balance.toFixed(2)}`;
        const annualInterest = balance * interestRate;
        annualInterestElement.textContent = `$${annualInterest.toFixed(2)}`;
    }

    function addTransaction(type, amount) {
        const transaction = {
            type: type,
            amount: amount,
            date: new Date()
        };
        transactions.unshift(transaction);
        updateTransactionHistory();
    }

    function updateTransactionHistory() {
        transactionList.innerHTML = '';
        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = `${transaction.type}: $${transaction.amount.toFixed(2)} - ${transaction.date.toLocaleString()}`;
            transactionList.appendChild(li);
        });
    }

    function showTransactionForm(transactionType) {
        transactionForm.classList.remove('hidden');
        confirmTransactionBtn.dataset.type = transactionType;
    }

    depositBtn.addEventListener('click', () => showTransactionForm('Depósito'));
    withdrawBtn.addEventListener('click', () => showTransactionForm('Retiro'));

    confirmTransactionBtn.addEventListener('click', function() {
        const amount = parseFloat(transactionAmount.value);
        if (isNaN(amount) || amount <= 0) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        const transactionType = this.dataset.type;
        if (transactionType === 'Depósito') {
            balance += amount;
            addTransaction('Depósito', amount);
        } else if (transactionType === 'Retiro') {
            if (amount > balance) {
                alert('Saldo insuficiente.');
                return;
            }
            balance -= amount;
            addTransaction('Retiro', amount);
        }

        updateBalance();
        transactionForm.classList.add('hidden');
        transactionAmount.value = '';
    });

    cancelTransactionBtn.addEventListener('click', function() {
        transactionForm.classList.add('hidden');
        transactionAmount.value = '';
    });

    calculateInterestBtn.addEventListener('click', function() {
        const customRate = parseFloat(interestRateInput.value) / 100;
        if (isNaN(customRate) || customRate < 0 || customRate > 1) {
            alert('Por favor, ingrese una tasa de interés válida entre 0 y 100.');
            return;
        }
        const annualInterest = balance * customRate;
        annualInterestElement.textContent = `$${annualInterest.toFixed(2)}`;
    });

    updateBalance();
});