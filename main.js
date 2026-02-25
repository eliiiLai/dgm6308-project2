// Project idea came from Youtube video: How To Create To-Do List App Using HTML CSS And JavaScript | Task App In JavaScript
// https://www.youtube.com/watch?v=G0jO8kUrg-I

// Import all classes from their respective files
import Task from './Task.js';
import RegularTask from './RegularTask.js';
import UrgentTask from './UrgentTask.js';
import TodoList from './TodoList.js';

// Create new TodoList instance
const myTodoList = new TodoList();

// Method 1: use getElementById to select input fields and containers
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const categoryInput = document.getElementById('category-input');
const deadlineInput = document.getElementById('deadline-input');
const categoryContainer = document.getElementById('category-input-container');
const deadlineContainer = document.getElementById('deadline-input-container');
const errorMessage = document.getElementById('error-message');

// Method 2: use querySelectorAll to select all priority radio buttons
const priorityRadios = document.querySelectorAll('input[name="priority"]');
const regularRadio = priorityRadios[0];  // First radio button (Regular)
const urgentRadio = priorityRadios[1];   // Second radio button (Urgent)

// Method 3: use querySelector to select the task list container
// As alternative way to select an element by ID
const taskListContainer = document.querySelector('#task-list');

// EVENT LISTENERS
// Event 1: Toggle between showing category or deadline input based on priority selection
regularRadio.addEventListener('change', function () {
    categoryContainer.classList.remove('hidden');
    deadlineContainer.classList.add('hidden');
});

urgentRadio.addEventListener('change', function () {
    categoryContainer.classList.add('hidden');
    deadlineContainer.classList.remove('hidden');
});

// Event 2: Add task when button is clicked (DOM update + event object usage)
addButton.addEventListener('click', function () {
    // Removes all whitespace (spaces, tabs, newlines) from the beginning and end of a string
    // Learn from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const taskText = taskInput.value.trim();

    // Use try...catch to handle invalid input (empty task)
    try {
        // Validate input - throw an error if task text is empty
        if (taskText === '') {
            throw new Error('Please enter a task before adding!');
        }

        // If no error, hide any existing error message
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        // Create task based on selected priority
        let newTask;
        if (regularRadio.checked) {
            const category = categoryInput.value.trim();
            newTask = new RegularTask(taskText, category);
        } else {
            const deadline = deadlineInput.value.trim();
            newTask = new UrgentTask(taskText, deadline);
        }

        // Add task to list
        myTodoList.addTask(newTask);

        // Clear inputs
        taskInput.value = '';
        categoryInput.value = '';
        deadlineInput.value = '';

        // Focus back on task input
        // Learn this cute move from Youtube video: How To Set Focus With JavaScript
        // https://www.youtube.com/watch?v=TP-v0pW1c0E
        taskInput.focus();

    } catch (e) {
        // Display error message in the page (not just in the console)
        errorMessage.textContent = e.message;
        errorMessage.classList.remove('hidden');
    }
});

// Allow adding task by pressing Enter key
taskInput.addEventListener('keypress', function (evt) {
    if (evt.key === 'Enter') {
        addButton.click();
    }
});

// Render empty state on page load
myTodoList.render();