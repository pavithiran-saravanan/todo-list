import { createPriority } from "./priority";
import Project from "./project";
import { TodoApp } from "./todo-app";
import './style.css';
import renderStaticContent, { populateProjects, testSVG } from "./dom-handler";

localStorage.clear();
renderStaticContent();

// Create myTodoApp
const myApp = new TodoApp([]);

// If projects data is found in local storage, read from it. If not found, initialize app with default projects and write to local storage.
if(localStorage.getItem('projects')){
    myApp.readFromLocal();
    console.log('key found in local storage. reading data.');
}
else{
    console.log('key not found in local storage. initializing default projects. writing to local storage.');
    myApp.initialize();
}

populateProjects(myApp.projects.map((proj)=>{return proj.title}));


// myApp.deleteProject(0);
// myApp.projects[0].deleteTodo(1);
// myApp.addProject(new Project('Full Stack Open', []));
// myApp.displayProjects();

// console.log("All tasks: "); console.log(myApp.getAllTodos().map(todo=>todo.title));
// console.log("High Priority tasks: "); console.log(myApp.getPriorityTodos(3).map(todo=>todo.title));
// console.log("Today's tasks: "); console.log(myApp.getDailyTodos().map(todo=>todo.title));
// console.log("Week's tasks: "); console.log(myApp.getWeeklyTodos().map(todo=>todo.title));

