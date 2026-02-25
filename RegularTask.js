// Import Task class from Task.js
import Task from './Task.js';

// Child class 1: RegularTask extends Task
class RegularTask extends Task {
    constructor(text, category) {
        super(text, "regular");     // Call parent constructor
        this.category = category;   // Property 4: category for regular tasks
    }

    // Method: Get category
    getCategory() {
        return this.category;
    }

    // Override: Add category to display text
    getDisplayText() {
        if (this.category) {   // Check if anything was written
            return this.text + " [" + this.category + "]";
        }
        return this.text;
    }
}

// Export RegularTask class so other files can import it
export default RegularTask;