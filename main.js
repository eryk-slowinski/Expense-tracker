const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addBtn = document.querySelector('.btn');
const transactions = JSON.parse(localStorage.getItem('transactions'));

function addTransaction(e) {
    e.preventDefault();
    if (text.value !== '' && amount.value !== '') {
        // if array is empty, setting ID as 1, if array has length, id will be based on id of last item in array, so you will never get 2 same id's
        const lastItemId = (transactions.length > 0) ? transactions[transactions.length - 1].id : 1;
        const transactionText = text.value;
        const transactionAmount = amount.value;
        const transacationObj = {
            id: lastItemId + 1,
            text: transactionText,
            amount: parseFloat(transactionAmount),
        }
        transactions.push(transacationObj);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    showTransaction();
    displayMoney();
}

function displayMoney() {
    let income = 0;
    let expense = 0;
    transactions.forEach(transaction => {
        transaction.amount > 0 ? income += transaction.amount : expense += transaction.amount;
    })
    money_plus.textContent = `$${income}`;
    money_minus.textContent = `$${expense}`;
    balance.textContent = `$${income + expense}`;
}

function showTransaction() {
    list.innerHTML = '';
    transactions.forEach(transaction => {
        list.innerHTML += `<li class="${transaction.amount >0 ? 'plus' : 'minus'}" id="${transaction.id}">${transaction.text}<span>${transaction.amount}</span><button class=delete-btn>x</button>
        </li>
        `
    })
}

function deleteTransaction(e) {
    if (e.target.classList.contains('delete-btn')) {
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].id == e.target.parentNode.id) transactions.splice(i, 1);
        }
        e.target.parentNode.remove();
    }
    displayMoney();
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

showTransaction();
displayMoney();
addBtn.addEventListener('click', addTransaction);
list.addEventListener('click', deleteTransaction);