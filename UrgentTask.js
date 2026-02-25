// Import Task class from Task.js
import Task from './Task.js';

// Child class 2: UrgentTask extends Task
class UrgentTask extends Task {
    constructor(text, deadline) {
        super(text, "urgent");
        this.deadline = deadline;   // Property 4: deadline for urgent tasks
    }

    // Override: Add deadline and warning emoji to display text
    getDisplayText() {
        if (this.deadline) {
            return this.text + " ⚠️ Due: " + this.deadline;
        }
        return this.text + " ⚠️";
    }
}

// Export UrgentTask class so other files can import it
export default UrgentTask;