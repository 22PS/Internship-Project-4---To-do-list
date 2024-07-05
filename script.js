document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => addTaskToList(task));
  };

  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach((taskItem) => {
      tasks.push({
        text: taskItem.querySelector('.task-text').textContent,
        completed: taskItem.classList.contains('completed'),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTaskToList = (task) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    if (task.completed) taskItem.classList.add('completed');

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    taskItem.appendChild(taskText);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newText = prompt('Edit task', taskText.textContent);
      if (newText !== null) {
        taskText.textContent = newText;
        saveTasks();
      }
    });
    taskItem.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      taskItem.remove();
      saveTasks();
    });
    taskItem.appendChild(deleteBtn);

    taskItem.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
      saveTasks();
    });

    taskList.appendChild(taskItem);
  };

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTaskToList({ text: taskText, completed: false });
      saveTasks();
      taskInput.value = '';
    }
  });

  loadTasks();
});
