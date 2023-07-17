import project from "./project";
import Todo from "./todo";

const content = document.querySelector('#content');
content.textContent = "Working";

const todo1 = new Todo("Do Pushups", 'Do 3 sets of 10 pushups', '18/07/2023', 'high');
const todo2 = new Todo("Do Pullups", 'Do 1 set of 5 pullups', '18/07/2023', 'medium');
const project1 = new project("Workout", [todo1, todo2]);

if(!localStorage.getItem('project_workout')){
    localStorage.setItem('project_workout', JSON.stringify(project1));
    console.log("Written to local storage");
}
else{
    console.log("Retreived from local storage");
}
const project2 = JSON.parse(localStorage.getItem('project_workout'));

console.log("Project : " + project2.title);
project2.todos.forEach((todo, index) => {
    console.log("   " + (index+1) + ". " + todo.title)
});