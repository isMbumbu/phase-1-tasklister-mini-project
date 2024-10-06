document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');

  // Event listener for form submission
  formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get task details from the form inputs
    const descriptionInput = document.getElementById('new-task-description');
    const userInput = document.getElementById('user');
    const durationInput = document.getElementById('duration');
    const dueDateInput = document.getElementById('due-date');
    const prioritySelect = document.getElementById('priority-select');

    const description = descriptionInput.value;
    const user = userInput.value;
    const duration = durationInput.value;
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    // Create a new task item (li)
    const taskItem = document.createElement('li');
    taskItem.classList.add(`priority-${priority}`);
    taskItem.innerHTML = `
      <strong>Description:</strong> ${description} <br>
      <strong>User:</strong> ${user} <br>
      <strong>Duration:</strong> ${duration} hours <br>
      <strong>Due Date:</strong> ${dueDate} <br>
    `;

    // Color the task based on priority
    switch (priority) {
      case 'high':
        taskItem.style.color = 'red';
        break;
      case 'medium':
        taskItem.style.color = 'yellow';
        break;
      case 'low':
        taskItem.style.color = 'green';
        break;
    }

    // Add delete and edit buttons to the task item
    addButtons(taskItem, description, user, duration, dueDate, priority);

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Reset the form inputs
    formElement.reset();
    prioritySelect.value = 'low'; // Reset priority to low
  });

  // Function to add delete and edit buttons
  function addButtons(taskItem, description, user, duration, dueDate, priority) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      taskItem.remove();
    });
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      editTask(taskItem, description, user, duration, dueDate, priority);
    });

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);
  }

  // Function to edit task
  function editTask(taskItem, description, user, duration, dueDate, priority) {
    taskItem.innerHTML = `
      <strong>Description:</strong> <input type="text" value="${description}" id="edit-description"> <br>
      <strong>User:</strong> <input type="text" value="${user}" id="edit-user"> <br>
      <strong>Duration:</strong> <input type="number" value="${duration}" id="edit-duration"> hours <br>
      <strong>Due Date:</strong> <input type="date" value="${dueDate}" id="edit-due-date"> <br>
    `;

    // Create a save button to save the edits
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', function() {
      const newDescription = document.getElementById('edit-description').value;
      const newUser = document.getElementById('edit-user').value;
      const newDuration = document.getElementById('edit-duration').value;
      const newDueDate = document.getElementById('edit-due-date').value;

      // Update task item with new values
      taskItem.innerHTML = `
        <strong>Description:</strong> ${newDescription} <br>
        <strong>User:</strong> ${newUser} <br>
        <strong>Duration:</strong> ${newDuration} hours <br>
        <strong>Due Date:</strong> ${newDueDate} <br>
      `;

      // Re-add buttons after editing
      addButtons(taskItem, newDescription, newUser, newDuration, newDueDate, priority);
    });

    taskItem.appendChild(saveButton);
  }

  // Event listener for sorting tasks by priority
  const sortButton = document.getElementById('sort-button');
  sortButton.addEventListener('click', function() {
    const tasks = Array.from(taskList.children);

    // Create a priority map to order priorities correctly (high < medium < low)
    const priorityMap = { high: 1, medium: 2, low: 3 };

    // Sort tasks by priority
    tasks.sort((a, b) => {
      const priorityA = a.classList[0].split('-')[1]; 
      const priorityB = b.classList[0].split('-')[1];
      return priorityMap[priorityA] - priorityMap[priorityB];
    });

    // Re-append the sorted tasks
    tasks.forEach(task => {
      taskList.appendChild(task);
    });
  });
});
