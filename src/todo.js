
export default class Todo {
    #project = "";
    // Consturctor
    constructor(title, desc, dueDate, priority) {
        this.#title = title;
        this.#desc = desc;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }
    // Getters
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
};