const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = [];

function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = todo;

    const btnGroup = document.createElement('div');

    // Update Button
    const updateBtn = document.createElement('button');
    updateBtn.className = 'btn btn-warning btn-sm me-2';
    updateBtn.textContent = 'Update';
    updateBtn.onclick = () => makeEditable(index, span, updateBtn);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(index);

    btnGroup.appendChild(updateBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    list.appendChild(li);
  });
}

// Add Todo
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newTodo = input.value.trim();

  if (newTodo !== '') {
    todos.push(newTodo);
    input.value = '';
    renderTodos();
  }
});

// Delete Todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Inline editable todo
function makeEditable(index, spanElement, updateBtn) {
  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.className = 'form-control';
  inputEdit.value = todos[index];
  inputEdit.style.maxWidth = '300px';

  // Replace the span with input
  spanElement.replaceWith(inputEdit);
  inputEdit.focus();

  // Save on blur or Enter
  inputEdit.addEventListener('blur', () => saveEdit(index, inputEdit));
  inputEdit.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      inputEdit.blur();
    }
  });
}

// Save updated todo
function saveEdit(index, inputElement) {
  const updated = inputElement.value.trim();
  if (updated !== '') {
    todos[index] = updated;
  }
  renderTodos();
}
