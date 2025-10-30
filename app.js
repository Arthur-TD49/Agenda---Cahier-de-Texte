const addBtn = document.getElementById('addTaskBtn');
const modal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const saveTask = document.getElementById('saveTask');
const container = document.getElementById('taskContainer');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  container.innerHTML = '';
  tasks.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'task glass';
    div.innerHTML = `
      <h3>${t.title}</h3>
      <small>${t.date}</small>
      <p>${t.desc}</p>
      <button onclick="deleteTask(${i})">🗑️ Supprimer</button>
    `;
    container.appendChild(div);
  });
}

function deleteTask(i) {
  tasks.splice(i, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

addBtn.onclick = () => modal.classList.remove('hidden');
closeModal.onclick = () => modal.classList.add('hidden');

saveTask.onclick = () => {
  const title = document.getElementById('taskTitle').value;
  const date = document.getElementById('taskDate').value;
  const desc = document.getElementById('taskDesc').value;

  if (!title) return alert("Titre obligatoire");

  tasks.push({ title, date, desc });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  modal.classList.add('hidden');
  renderTasks();
};

window.onload = () => renderTasks();

// ---- PWA registration ----
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
