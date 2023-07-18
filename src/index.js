import Project from "./project";
import Todo from "./todo";
import { createPriority } from "./priority";
import displayProjects, { readFromLocal, writeToLocal } from "./projects";

const content = document.querySelector('#content'); content.textContent = "Working";

// Create Workout Project
const todo1 = new Todo("Do Pushups", 'Do 3 sets of 10 pushups', new Date('2023', '07', '18'), createPriority(1));
const todo2 = new Todo("Do Pullups", 'Do 1 set of 5 pullups', new Date('2023', '07', '20'), createPriority(2));
const project_workout = new Project("Workout", [todo1, todo2]);

// Create Odin Project
const todo3 = new Todo("Learn JavaScript", 'Complete advanced JavaScript section from the Odin Project.', new Date('2023', '07', '25'), createPriority(1));
const todo4 = new Todo("Learn React", 'Complete the new React section from the Odin Project.', new Date('2023', '07', '28'), createPriority(3));
const project_odin = new Project("Odin", [todo3, todo4]);

// Create Projects array
const projects = [project_workout, project_odin];

// Store projects in local storage
writeToLocal(projects, 'projects');

// Get projects from local storage
const _projects = readFromLocal('projects');

// Display projects
displayProjects(_projects);
