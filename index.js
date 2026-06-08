 const expenseForm = document.getElementById('expenseForm');
        const amountInput = document.getElementById('amount');
        const descriptionInput = document.getElementById('description');
        const categorySelect = document.getElementById('category');
        const expenseList = document.getElementById('expenseList');
        const submitBtn = document.getElementById('submitBtn');

        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let editIndex = -1;

        function renderExpenses() {
            expenseList.innerHTML = '';
            expenses.forEach((expense, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded bg-white';
                li.innerHTML = `
                    <div>
                        <span class="fw-bold">$${expense.amount}</span> - 
                        <span>${expense.description}</span> 
                        <span class="badge bg-secondary ms-2">${expense.category}</span>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-warning me-2" onclick="editExpense(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteExpense(${index})">Delete</button>
                    </div>
                `;
                expenseList.appendChild(li);
            });
        }

        expenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = amountInput.value;
            const description = descriptionInput.value;
            const category = categorySelect.value;

            const expenseData = { amount, description, category };

            if (editIndex === -1) {
                expenses.push(expenseData);
            } else {
                expenses[editIndex] = expenseData;
                editIndex = -1;
                submitBtn.textContent = 'Add Expense';
                submitBtn.className = 'btn btn-primary w-100';
            }

            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseForm.reset();
        });

        window.deleteExpense = function(index) {
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        };

        window.editExpense = function(index) {
            const expense = expenses[index];
            amountInput.value = expense.amount;
            descriptionInput.value = expense.description;
            categorySelect.value = expense.category;
            editIndex = index;
            submitBtn.textContent = 'Update Expense';
            submitBtn.className = 'btn btn-success w-100';
        };

        renderExpenses();