import { getFormattedDate, createDateFromString} from "./date-handler";
import Project from "./project";
import Todo from "./todo";

// Function to display projects
export default function displayProjects (projects){
    console.log(projects);
    console.log('PROJECTS');
    projects.forEach((project, projectId) => {
        console.log(`   ${projectId + 1}. ${project.title}`);
        project.todos.forEach((todo, todoId) => {
            console.log(`       ${todoId + 1}. ${todo.title} - ${todo.priority.text} - ${getFormattedDate(createDateFromString(todo.dueDate))}`);
        });
    });
};

// Write to local storage
export function writeToLocal(projects, name){
    localStorage.setItem(name, JSON.stringify({data: projects}));
}

// Read from local storage
export function readFromLocal(name){
    if(localStorage.getItem(name))
        return reconstruct(localStorage.getItem(name));
    else return {};
}

// Reconstruct projects array from the data retreived from local storage
export function reconstruct(projects){
    const projects_re = [];
    const p = JSON.parse(projects).data;
    p.forEach((project) => {
        const project_re = new Project(project.title, []);
        const todos_re = [];
        project.todos.forEach((todo)=>{
            todos_re.push(new Todo(todo.title, todo.desc, todo.dueDate, todo.priority));
        })
        project_re.todos = todos_re;
        projects_re.push(project_re);
    });
    return projects_re;
}