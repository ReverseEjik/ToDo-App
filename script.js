const form = document.querySelector('.todo__title-form');
const input = document.querySelector('.todo__title-input');
const todosUL = document.querySelector('.todo-tasks__list');

const todos = JSON.parse(localStorage.getItem('todos'));
console.log(todos)


if (todos) {
  todos.forEach(todo => {
    addTodo(todo)
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
})

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text
  }

  if (todoText) {
    const todoEl = document.createElement('div');
    const todoInput = document.createElement('input');
    const todoBtns = document.createElement('div');
    const todoEdit = document.createElement('button');
    const todoDel = document.createElement('button');

    todoEl.classList.add('todo-tasks__list-item');
    todoInput.classList.add('todo-tasks__list-input');
    todoInput.setAttribute('readonly', 'readonly');
    todoInput.setAttribute('type', 'text');
    todoBtns.classList.add('todo-tasks__list-item-actions')
    todoDel.classList.add('delete', 'actions')
    todoEdit.classList.add('edit', 'actions')
    // todoText input value
    // console.log(todoText)

    if (todo && todo.completed) {
      todoEl.classList.add('completed')
    }
    todoInput.value = todoText;
    todoDel.innerText = `Delete`;
    todoEdit.innerText = `Edit`;
    todosUL.appendChild(todoEl);
    todoEl.appendChild(todoInput);
    todoEl.appendChild(todoBtns);
    todoBtns.appendChild(todoEdit);
    todoBtns.appendChild(todoDel);

    input.value = ""

    // Line through task
    todoInput.addEventListener('click', () => {
      if (todoEdit.innerText.toLowerCase() == 'edit') {
        todoEl.classList.toggle('completed')
        // todoInput.style.cursor = 'pointer';
      } else {
        todoEl.classList.remove('completed')
      }
      updateLS();
    })

    // Change task
    todoEdit.addEventListener('click', (e) => {
      if (todoEdit.innerText.toLowerCase() == "edit") {

        todoEdit.innerText = "Save";
        todoInput.removeAttribute("readonly");
        todoInput.focus();
      } else {
        todoEdit.innerText = "Edit";
        todoInput.setAttribute("readonly", "readonly");
      }
      updateLS();
    })

    // Delete task
    todoDel.addEventListener('click', (e) => {
      e.preventDefault;
      todoEl.remove();
      updateLS();
    })
    updateLS();
  }

}


function updateLS() {
  const todosEl = document.querySelectorAll('.todo-tasks__list-input');

  const todos = [];

  todosEl.forEach(todosEl => {
    todos.push({
      text: todosEl.value,
      completed: todosEl.classList.contains('completed')
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}