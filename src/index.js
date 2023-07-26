import { createPriority } from "./priority";
import Project from "./project";
import { TodoApp } from "./todo-app";
import './style.css';
import './theme.css';
import './accent-blue.css';
import './accent-green.css';
import './accent-cyan.css';
import './accent-pink.css';
import './accent-red.css';
import './accent-purple.css';
import renderStaticContent, { addEventListernersToMenuItems, addEventListernersToProjectItems, populateProjects, selectAllTasks, testSVG } from "./dom-handler";
import Todo from "./todo";

// localStorage.clear();
renderStaticContent();

// Create myTodoApp
export const myApp = new TodoApp([]);

// If projects data is found in local storage, read from it. If not found, initialize app with default projects and write to local storage.
if(localStorage.getItem('projects')){
    if(JSON.parse(localStorage.getItem('projects')).data.length !== 0){
        // console.log('key found in local storage');
        myApp.readFromLocal();
    }
    else{
        console.log('key not found in local storage. initializing default projects. writing to local storage.');
        myApp.initialize();
    }
}
else{
    console.log('key not found in local storage. initializing default projects. writing to local storage.');
    myApp.initialize();
}

addEventListernersToMenuItems(myApp);
populateProjects(myApp.projects.map((proj)=>{return proj.title}));
addEventListernersToProjectItems(myApp);
selectAllTasks(myApp);    
// myApp.displayProjects();

