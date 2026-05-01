const state = {
  tasks: [],
};

const taskInput = document.querySelector('#task-input');
const addTaskForm = document.querySelector('#add-task-form');
const taskList = document.querySelector('#task-list');
const clearCompletedButton = document.querySelector('#clear-completed');
const stats = document.querySelector('#task-stats');

const saveTasks = () => {
  localStorage.setItem('vexo.tasks', JSON.stringify(state.tasks));
};

const loadTasks = () => {
  const raw = localStorage.getItem('vexo.tasks');
  if (!raw) {
    state.tasks = [];
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state.tasks = Array.isArray(parsed)
      ? parsed.filter((task) => task && typeof task.title === 'string')
      : [];
  } catch {
    state.tasks = [];
  }
};

const createTask = (title) => ({
  id: crypto.randomUUID(),
  title,
  done: false,
  createdAt: new Date().toISOString(),
});

const updateStats = () => {
  const done = state.tasks.filter((task) => task.done).length;
  const total = state.tasks.length;
  stats.textContent = `${done} / ${total} tâche${total > 1 ? 's' : ''} terminée${done > 1 ? 's' : ''}`;
};

const renderTask = (task) => {
  const item = document.createElement('li');
  item.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.addEventListener('change', () => {
    task.done = checkbox.checked;
    item.classList.toggle('done', task.done);
    saveTasks();
    updateStats();
  });

  const label = document.createElement('span');
  label.textContent = task.title;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Supprimer';
  removeButton.type = 'button';
  removeButton.className = 'danger';
  removeButton.addEventListener('click', () => {
    state.tasks = state.tasks.filter((candidate) => candidate.id !== task.id);
    saveTasks();
    render();
  });

  item.append(checkbox, label, removeButton);
  item.classList.toggle('done', task.done);
  return item;
};

const render = () => {
  taskList.innerHTML = '';
  state.tasks.forEach((task) => {
    taskList.appendChild(renderTask(task));
  });
  updateStats();
};

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) {
    return;
  }

  state.tasks.unshift(createTask(title));
  taskInput.value = '';
  saveTasks();
  render();
});

clearCompletedButton.addEventListener('click', () => {
  state.tasks = state.tasks.filter((task) => !task.done);
  saveTasks();
  render();
});

loadTasks();
render();
