// TodoList class to manage all tasks
class TodoList {
    constructor() {
        this.tasks = [];  // Property: array to store all tasks
    }

    // Method 1: Add new task to the list
    addTask(task) {
        this.tasks.push(task);
        this.render();
    }

    // Method 2: Delete a task by index
    deleteTask(index) {
        // Create new array to hold the tasks left
        let newTasks = [];
        // Loop through all existing tasks, if this is NOT the task to delete, add it to newTasks
        for (let i = 0; i < this.tasks.length; i++) {
            if (i !== index) {
                newTasks.push(this.tasks[i]);
            }
        }
        // Replace the old array with the new array
        this.tasks = newTasks;
        this.render();
    }

    // Method 3: Toggle task completion
    toggleTask(index) {
        this.tasks[index].toggleComplete();
        this.render();
    }

    // Method 4: Render all tasks to the page
    render() {
        // Use querySelector directly to select the task list container
        const container = document.querySelector('#task-list');
        container.innerHTML = '';  // Clear existing tasks

        // If no tasks, show empty message
        if (this.tasks.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-message';
            emptyDiv.textContent = 'No tasks yet. Add one above!';
            container.appendChild(emptyDiv);
            return;
        }

        // Store reference to 'this' (the TodoList instance)
        // Needed because 'this' changes inside event listener functions
        const self = this;

        // Loop through all tasks
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const currentIndex = i;

            // Create list item
            const li = document.createElement('li');
            li.className = 'task-item ' + task.priority;
            if (task.completed) {
                li.className = li.className + ' completed';
            }

            // Create task content container
            const contentDiv = document.createElement('div');
            contentDiv.className = 'task-content';

            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;

            // Add event listener directly to checkbox
            checkbox.addEventListener('click', function () {
                self.toggleTask(currentIndex);
            });

            // Create task text span
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.textContent = task.getDisplayText();

            // Append checkbox and text to content div
            contentDiv.appendChild(checkbox);
            contentDiv.appendChild(textSpan);

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-button';
            deleteBtn.textContent = 'Delete';

            // Add event listener directly to delete button
            deleteBtn.addEventListener('click', function () {
                self.deleteTask(currentIndex);
            });

            // Append content and delete button to list item
            li.appendChild(contentDiv);
            li.appendChild(deleteBtn);

            // Append list item to container
            container.appendChild(li);
        }
    }
}

// Export TodoList class so other files can import it
export default TodoList;