import { getFormattedDate, createDateFromString} from "./date-handler";
import Project from "./project";
import Todo from "./todo";
import { createPriority } from "./priority";
import { differenceInDays, isSameWeek, isToday } from "date-fns";

export class TodoApp{
    #projects = [];
    #key = 'projects';
    constructor (projects) {
        this.#projects = projects;
    };

    // Getters and Setters
    get projects(){
        return this.#projects;
    }
    set projects(projects){
        this.#projects = projects;
    }

    // Function to display projects
    displayProjects(){
        console.log('PROJECTS');
        if(this.projects.length === 0){
            console.log('No projects to display');
            return;
        }
        this.projects.forEach((project, projectId) => {
            console.log(`   ${projectId + 1}. ${project.title}`);
            project.todos.forEach((todo, todoId) => {
                console.log(`       ${todoId + 1}. ${todo.title} - ${todo.priority.text} - ${getFormattedDate(todo.dueDate)}`);
            });
        });
    };

    // Write to local storage
    writeToLocal(){
        localStorage.setItem(this.#key, JSON.stringify({data: this.projects}));
    }

    // Read from local
    readFromLocal(){
        if(localStorage.getItem(this.#key))
            this.projects = this.reconstruct(localStorage.getItem(this.#key));
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

    // Initialize with default projects
    initialize(){
        const todo1 = new Todo("Do Pushups", 'Do 3 sets of 10 pushups', new Date('2023', '06', '18'), createPriority(1));
        const todo2 = new Todo("Do Pullups", 'Do 1 set of 5 pullups', new Date('2023', '06', '20'), createPriority(2));
        const project_workout = new Project("Workout", [todo1, todo2]);

        const todo3 = new Todo("Learn JavaScript", 'Complete advanced JavaScript section from the Odin Project.', new Date('2023', '06', '18'), createPriority(1));
        const todo4 = new Todo("Learn React", 'Complete the new React section from the Odin Project.', new Date('2023', '06', '28'), createPriority(3));
        const project_odin = new Project("Odin", [todo3, todo4]);

        this.projects = [project_workout, project_odin];
        this.writeToLocal();
    }

    // Get all tasks
    getAllTodos(){
        let allTodos = [];
        this.#projects.forEach((project)=>{
            allTodos = [...allTodos, ...project.todos];
        })
        return allTodos;
    }

    // Get tasks filtered by priority
    getPriorityTodos(priority){
        const priorityTodos = [];
        this.#projects.forEach((project)=>{
            project.todos.forEach(todo => {
                if(todo.priority.number == priority){
                    priorityTodos.push(todo);
                }
            })
        })
        return priorityTodos;
    }

    // Get today's tasks
    getDailyTodos(){
        const dailyTodos = [];
        this.#projects.forEach((project)=>{
            project.todos.forEach(todo => {
                if(isToday(todo.dueDate)){
                    dailyTodos.push(todo);
                };
            })
        })
        return dailyTodos;
    }

    // Get week's tasks
    getWeeklyTodos(){
        const weeklyTodos = [];
        this.#projects.forEach((project)=>{
            project.todos.forEach(todo => {
                if(differenceInDays(todo.dueDate, new Date()) < 7){
                    weeklyTodos.push(todo);
                };
            })
        })
        return weeklyTodos;
    }
}

