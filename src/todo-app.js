import { getFormattedDate, createDateFromString} from "./date-handler";
import Project from "./project";
import Todo from "./todo";

export class TodoApp{
    constructor (projects) {
        this.projects = projects;
    };

    // Function to display projects
    displayProjects(){
        console.log('PROJECTS');
        this.projects.forEach((project, projectId) => {
            console.log(`   ${projectId + 1}. ${project.title}`);
            project.todos.forEach((todo, todoId) => {
                console.log(`       ${todoId + 1}. ${todo.title} - ${todo.priority.text} - ${getFormattedDate(createDateFromString(todo.dueDate))}`);
            });
        });
    };

    // Write to local storage
    writeToLocal(){
        localStorage.setItem('projects', JSON.stringify({data: this.projects}));
    }

    // Read from local
    readFromLocal(){
        if(localStorage.getItem('projects'))
            this.projects = this.reconstruct(localStorage.getItem('projects'));
        else return {};
    }

    // Reconstruct projects array from local storage
    reconstruct(proj){
        const projects_re = [];
        const p = JSON.parse(proj).data;
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
}

