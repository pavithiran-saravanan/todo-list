
export default class project {
    #title;
    #todos;
    #count = 0;
    constructor (title, todos) {
        this.#title = title;
        this.#todos = todos;
        this.#count = todos.length;
    }

    // Getters and Setters
    get title(){
        return this.#title;
    }
    get todos(){
        return this.#todos;
    }
    set title(title){
        this.#title = title;
    }
    set todos(todos){
        this.#todos = todos;
    }

    // toJson
    toJSON(){
        return {title:this.#title, todos: this.#todos, count: this.#count}
    }

    // Private Methods
    #updateCount () {
        this.#count = this.#todos.length;
    }

    // Public Methods
    add(todo){
        this.#todos.append(todo);
        this.#updateCount();
    }
}