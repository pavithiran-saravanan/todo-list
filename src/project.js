import { myApp } from ".";

export default class Project {
    #id;
    #title;
    #todos;
    #count = 0;
    constructor (title, todos) {
        this.#title = title;
        this.#todos = todos;
        this.#count = todos.length;
    }

    // Getters and Setters
    get id(){
        return this.#id;
    }
    get title(){
        return this.#title;
    }
    get todos(){
        return this.#todos;
    }
    get count(){
        return this.#count;
    }
    set id(id){
        this.#id = id;
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
    addTodo(todo){
        // Set id value for the todo
        todo.id = this.#todos.length;
        
        // Set project id for the todo
        todo.project = this.#id;
        this.#todos.push(todo);
        this.#updateCount();
        myApp.writeToLocal();
    }

    deleteTodo(index){
        this.#todos.splice(index, 1);
        this.#updateCount();
        // Should update local storage
        myApp.writeToLocal();
    }
}