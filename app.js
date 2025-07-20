document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (storedTasks) {
        storedTasks.forEach(t => task.push(t));
        updateTaskList();
        updateStats();
    }
});
let task = [];
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(task));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {  // 🔧 fix: was `if(text)` → `if(taskText)`
        task.push({ text: taskText, completed: false });

       updateTaskList();
       updateStats();
       taskInput.value = '';

        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    console.log({task})
    updateTaskList();
    updateStats();
    saveTasks();
     
}
const deleteTask = (index) => {
    task.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};
const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = task[index].text;
    task.splice(index, 1);
    updateTaskList();
    updateStats();  
    saveTasks();
};

const updateStats = () => {
    const completeTasks = task.filter(task => task.completed).length;
    const totalTasks = task.length;
    const progress = (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
    if(task.length && completeTasks === totalTasks) {
        blaskConfetti();
    }

}

const updateTaskList = () => {
    const TaskList = document.getElementById('task-list');
    TaskList.innerHTML = '';

    task.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="task-item">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit.jpg" onclick="editTask(${index})"/>
                <img src="delete.jpg" onclick="deleteTask(${index})"/>
            </div>
        </div>
        `;
        TaskList.appendChild(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', function(e) {  // 🔧 fix: added `e` parameter
    e.preventDefault();

    addTask();
});
const blaskConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
