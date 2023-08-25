import { getFormattedDate, createDateFromString} from "./date-handler";
import Project from "./project";
import Todo from "./todo";
import { createPriority } from "./priority";
import { differenceInDays, isSameWeek, isToday } from "date-fns";
import { th } from "date-fns/locale";

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
    set projects(arr){
        this.#projects = arr;
    }
    set projects(projects){
        this.#projects = projects;
    }

    // Function to log projects to console
    displayProjects(){
        console.log('PROJECTS');
        if(this.projects.length === 0){
            console.log('No projects to display');
            return;
        }
        this.projects.forEach((project, projectId) => {
            console.log(`   ${projectId + 1}. ${project.title} ${project.count}`);
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
            this.reconstruct(localStorage.getItem(this.#key));
        else return {};
    }

    // Reconstruct projects array from local storage
    reconstruct(proj){
        console.log('reconstructing..');
        const p = JSON.parse(proj).data;
        p.forEach((project) => {
            const project_re = new Project(project.title, []);
            this.addProject(project_re);
            project.todos.forEach((todo)=>{
                project_re.addTodo(new Todo(todo.title, todo.desc, new Date(todo.dueDate), todo.priority));
            })
        });
    }

    // Initialize with default projects
    initialize(){
        const todo1 = new Todo("Do Pushups", 'Do 3 sets of 10 pushups', new Date('2023', '06', '21'), createPriority(1));
        const todo2 = new Todo("Do Pullups", 'Do 1 set of 5 pullups', new Date('2023', '06', '20'), createPriority(2));
        const project_workout = new Project("Workout", []);

        const todo3 = new Todo("Learn JavaScript", 'Complete advanced JavaScript section from the Odin Project.', new Date('2023', '06', '18'), createPriority(1));
        const todo4 = new Todo("Learn React", 'Complete the new React section from the Odin Project.', new Date('2023', '06', '28'), createPriority(3));
        const project_odin = new Project("The Odin Project", []);

        this.addProject(project_workout);
        this.addProject(project_odin);

        project_workout.addTodo(todo1);
        project_workout.addTodo(todo2);
        project_odin.addTodo(todo3);
        project_odin.addTodo(todo4);
        
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
    getWeeklyTodos() {
        const weeklyTodos = [];
        this.#projects.forEach((project)=>{
            project.todos.forEach(todo => {
                const diff = differenceInDays(todo.dueDate, new Date());
                if(diff < 7 && diff >= 0){
                    weeklyTodos.push(todo);
                };
            })
        })
        return weeklyTodos;
    }

    // Delete a project by it's index
    deleteProject(index){
        this.#projects.splice(index, 1);
        this.writeToLocal();
    }

    // Add a new project
    addProject(project){
        const len = this.#projects.length;
        if(len === 0) project.id = this.#projects.length;
        else{
            project.id = this.#projects[len-1].id + 1;
        }
        this.#projects.push(project);
        this.writeToLocal();
    }
}

