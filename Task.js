// Parent class: Task
class Task {
    constructor(text, priority) {
        this.text = text;           // Property 1: task text
        this.priority = priority;   // Property 2: priority level
        this.completed = false;     // Property 3: completion status
    }

    // Method 1: Toggle completion status
    toggleComplete() {
        this.completed = !this.completed;
    }

    // Method 2: Get display text (can be overridden by child classes)
    getDisplayText() {
        return this.text;
    }
}

// Export Task class so other files can import it
export default Task;