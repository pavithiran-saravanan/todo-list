
export default class Todo {
    #id;
    #project = "";
    #title;
    #desc;
    #dueDate;
    #priority;
    #isCompleted = false;
    // Consturctor
    constructor(title, desc, dueDate, priority) {
        this.#title = title;
        this.#desc = desc;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }
    // Getters
    get id(){
        return this.#id;
    }
    get title(){
        return this.#title;
    }
    get desc(){
        return this.#desc;
    }
    get dueDate(){
        return this.#dueDate;
    }
    get priority(){
        return this.#priority;
    }
    get project(){
        return this.#project;
    }
    // Setters
    set id(id){
        this.#id = id;
    }
    set title(title){
        this.#title = title;
    }
    set desc(desc){
        this.#desc = desc;
    }
    set dueDate(dueDate){
        this.#dueDate = dueDate;
    }
    set priority(priority){
        this.#priority = priority;
    }
    set project(project){
        this.#project = project;
    }

    // To JSON
    toJSON(){
        return {title:this.#title, desc:this.#desc, dueDate:this.#dueDate, priority:this.#priority, project:this.#project}
    }

    // Mark as complete
    markAsComplete(){
        this.#isCompleted = true;
    }

    // Toggle completion
    toggleCompletionStatus(){
        this.#isCompleted = !this.#isCompleted;
    }
};