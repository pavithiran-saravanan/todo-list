import project from "./project";
import Todo from "./todo";
import { createPriority } from "./priority";

const content = document.querySelector('#content');
content.textContent = "Working";

// Create Workout Project
const todo1 = new Todo("Do Pushups", 'Do 3 sets of 10 pushups', new Date('2023-07-18'), createPriority('low'));
const todo2 = new Todo("Do Pullups", 'Do 1 set of 5 pullups', new Date('2023-07-20'), createPriority('medium'));
const project_workout = new project("Workout", [todo1, todo2]);

// Create Odin Project
const todo3 = new Todo("Learn JavaScript", 'Complete advanced JavaScript section from the Odin Project.', new Date('2023-07-25'), createPriority('low'));
const todo4 = new Todo("Learn React", 'Complete the new React section from the Odin Project.', new Date('2023-07-28'), createPriority('high'));
const project_odin = new project("Odin", [todo3, todo4]);

// Create Projects array
const projects = [project_workout, project_odin];

// Store projects to local storage
if(!localStorage.getItem('projects')){
    localStorage.setItem('projects', JSON.stringify({data: projects}));
    console.log("Projects written to local storage");
}

// Read projects from local storage and display them
if(localStorage.getItem('projects')){
   displayProjects(JSON.parse(localStorage.getItem('projects')).data); 
}
else{
    console.log('Projects not found in local storage');
}

// Display Projects
function displayProjects (projects){
    console.log(projects);
    console.log('PROJECTS');
    projects.forEach((project, projectId) => {
        console.log(`   ${projectId + 1}. ${project.title}`);
        project.todos.forEach((todo, todoId) => {
            console.log(`       ${todoId + 1}. ${todo.title} - ${todo.priority.text}`);
        });
    });
};

localStorage.clear();