// Complete JavaScript code for Budget Tracker


const incomeForm = document.getElementById("incomeForm");
incomeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("incomeTitle").value;
  const amount = parseFloat(document.getElementById("incomeAmount").value);

  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  const newIncome = {
    id: Date.now(),
    title,
    amount
  };
  incomes.push(newIncome);
  localStorage.setItem("incomes", JSON.stringify(incomes));

  incomeForm.reset();
  renderData();
});


const expenseForm = document.getElementById("expenseForm");
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("expenseTitle").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const newExpense = {
    id: Date.now(),
    title,
    amount
  };
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  expenseForm.reset();
  renderData();
});

function renderData() {
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const incomeList = document.getElementById("incomelist");
  incomeList.innerHTML = "";
  let totalIncome = 0;

  incomes.forEach(item => {
    totalIncome += item.amount;
    const li = document.createElement("li");
    li.innerHTML = `${item.title}: ₹${item.amount} 
      <button onclick="deleteItem(${item.id}, 'incomes')">❌</button>`;
    incomeList.appendChild(li);
  });


  const expenseList = document.getElementById("expenselist");
  expenseList.innerHTML = "";
  let totalExpense = 0;

  expenses.forEach(item => {
    totalExpense += item.amount;
    const li = document.createElement("li");
    li.innerHTML = `${item.title}: ₹${item.amount} 
      <button onclick="deleteItem(${item.id}, 'expenses')">❌</button>`;
    expenseList.appendChild(li);
  });


  document.getElementById("totalIncome").innerText = totalIncome;
  document.getElementById("totalExpense").innerText = totalExpense;
  document.getElementById("balance").innerText = totalIncome - totalExpense;
}


function deleteItem(id, type) {
  const items = JSON.parse(localStorage.getItem(type)) || [];
  const filtered = items.filter(item => item.id !== id);
  localStorage.setItem(type, JSON.stringify(filtered));
  renderData();
}
window.onload = renderData;
