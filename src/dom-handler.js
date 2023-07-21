import Comp, { getMenuItem, getProjectItem} from "./ui-components-sidebar";
import getTodoItem from "./ui-components-main";
import addBtn from './icons/add-icon-bold.svg';
import tasksIcon from './icons/tasks-icon.svg';
import todayIcon from './icons/today-icon-outline.svg';
import profilePic from './images/stock-profile-2.jpg';
import dropDown from './icons/dropdown-icon.svg';
import { add } from "date-fns";
// import { TodoApp } from "./todo-app";

export default function renderStaticContent(){
    const content = document.querySelector('#content');

    // Create two divs: sidebar and main. Append them to content.
    content.append(
        new Comp('div', {classList: ['sidebar']}).render(),
        new Comp('div', {classList: ['main']}).render(),
    )
    // Render static main content
    renderStaticMain();

    // Create 3 divs: profileSection, menuSection, projectsSection. Append them to sidebar.
    const sidebar = document.querySelector('.sidebar');
    sidebar.append(
        new Comp('div', {classList: ['profile-section']}).render(),
        new Comp('div', {classList: ['menu-section']}).render(),
        new Comp('div', {classList: ['projects-section']}).render()
    );

    // Create 3 divs: profilePicture, username, taskMaster. Append them to profileSection.
    const profileSection = document.querySelector('.profile-section');
    profileSection.append(
        new Comp('div', {classList: ['profile-picture']}).render(),
        new Comp('div', {classList: ['username'], textContent: 'Quiet2k'}).render(),
        new Comp('div', {classList: ['taskmaster'], textContent: 'TaskMaster'}).render()
    )
    const profilePicture = new Image(); profilePicture.src = profilePic; profilePicture.width = 50;
    document.querySelector('.profile-picture').append(profilePicture);

    // Create 2 divs: quickLinksTitleContainer and projectsTitleContainer. Append them to quickLinksSection and projectsSection.
    // Create 2 divs: quickLinksBody and projectsBody. Append them to quickLinksSection and projectsSection.
    const menuSection = document.querySelector('.menu-section');
    const projectsSection = document.querySelector('.projects-section');
    menuSection.append(
        new Comp('div', {classList: ['menu-title-container']}).render(),
        new Comp('div', {classList: ['menu-body']}).render()
    );
    projectsSection.append(
        new Comp('div', {classList: ['projects-title-container']}).render(),
        new Comp('div', {classList: ['projects-body']}).render()
    );

    // Create 2 titles: Quick Links and Projects. Append quick links to menu section. Append Projects title and 'add project' button to projectsTitleContainer.
    document.querySelector('.menu-title-container').append(
        new Comp('div', {classList: ['menu-title'], textContent: 'Quick Links'}).render(),
        new Comp('img', {classList: ['dropdown-btn expanded'], src: dropDown, width: 20}).render()
    );
    document.querySelector('.projects-title-container').append(
        new Comp('div', {classList: ['projects-title'], textContent: 'Projects'}).render(),
        new Comp('img', {classList: ['dropdown-btn-projects add-mode'], src: addBtn, width: 20}).render()
    );

    // Create 4 menu items: All tasks, Today, This Week, High Priority. Append all 4 to quickLinks section.
    const menuBody = document.querySelector('.menu-body');
    menuBody.append(
        getMenuItem('All Tasks', tasksIcon),
        getMenuItem('Today', todayIcon),
        getMenuItem('This Week', todayIcon),
        getMenuItem('High Priority', tasksIcon),
    );   

    // Add event listener to Menu dropdown
    const menuTitleContainer = document.querySelector('.menu-title-container');
    menuTitleContainer.addEventListener('click', toggleMenuItems);

    // Add event listener to Menu dropdown
    const projectsTitleContainer = document.querySelector('.projects-title-container');
    projectsTitleContainer.addEventListener('click', toggleProjectItems);
}

// Get all project titles from myApp. Create a project item for each project title. Append all to projects section.
export function populateProjects(projectTitles){
    const projectsBody = document.querySelector('.projects-body');
    for(const title of projectTitles){
        projectsBody.append(getProjectItem(title));
    }
}

// Function to hide and unhide quick links
function toggleMenuItems(e){
    document.querySelector('.menu-body').classList.toggle('hide');
    document.querySelector('.dropdown-btn').classList.toggle('expanded');
    // document.querySelector('.projects-section')
}

// Function to hide and unhide Project Links
function toggleProjectItems(e){
    document.querySelector('.projects-body').classList.toggle('hide');
    const btn = document.querySelector('.dropdown-btn-projects');
    btn.classList.toggle('add-mode');
    if(btn.classList.contains('add-mode')) btn.src = addBtn;
    else btn.src = dropDown;
    // document.querySelector('.projects-section')
}

// Add event listerners to menu item
export function addEventListernersToMenuItems(app){
    // Get all menu item elements
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((menuItem, index)=>{
        menuItem.addEventListener('click', (e) => {
            // Select the clicked item
            if(!menuItem.classList.contains('selected')){
                menuItem.classList.add('selected');
                if(index === 0) displayTodos("All Tasks", app.getAllTodos());
                if(index === 1) displayTodos("Today", app.getDailyTodos());
                if(index === 2) displayTodos("This Week", app.getWeeklyTodos());
                if(index === 3) displayTodos("High Priority", app.getPriorityTodos(3));
            }
            // Unselect all other items
            menuItems.forEach((item)=>{
                if( item != menuItem ){
                    item.classList.remove('selected');
                }
            })
            document.querySelectorAll('.project-item').forEach((item)=>{item.classList.remove('selected');})
        });
    });
}

// Add event listeners to project items
export function addEventListernersToProjectItems(app){
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((projectItem, index)=>{
        projectItem.addEventListener('click', (e) => {
            // Select the clicked item
            if(!projectItem.classList.contains('selected')){
                projectItem.classList.add('selected');
                displayTodos(app.projects[index].title, app.projects[index].todos, index);
            }
            // Unselect all other menu items and project items
            projectItems.forEach((item)=>{
                if( item != projectItem ){
                    item.classList.remove('selected');
                }
            })
            document.querySelectorAll('.menu-item').forEach((item)=>{item.classList.remove('selected');})
        });
    });
}

function getMenuTasks(menuIndex, app){
    if(menuIndex == 0) return;
};

// Display's todos in main based on the menuItem selected
function displayTodos(title, todos, projectId){
    document.querySelector('.main-title').textContent = title;
    const mainBody = document.querySelector('.main-body');
    mainBody.textContent = '';
    todos.forEach((todo, index)=>{
        // Call a function that returns an todo main element and append it to main
        mainBody.append(getTodoItem(todo, index, todo.project));
    });
};


// Add basic structure to main
function renderStaticMain(){
    const main = document.querySelector('.main');
    const mainTitleContainer = new Comp('div', {classList: ['main-title-container']}).render();
    mainTitleContainer.append(new Comp('div', {classList: ['main-title'], textContent: 'All Tasks'}).render());
    mainTitleContainer.append(
        new Comp('img', {classList: ['add-todo-button'], src: addBtn, width: 40}).render()
    )

    const mainBody = new Comp('div', {classList: ['main-body']}).render();
    mainBody.append(new Comp('div', {classList: ['main-info'], textContent: 'No Projects to display'}).render());

    main.append(
        mainTitleContainer,
        mainBody
    );
};

// function getTodo(todo, index, getpro){
//     return getTodoItem(todo, index);
// }

export function selectAllTasks(app){
    document.querySelector('.menu-item').classList.add('selected');
    displayTodos("All Tasks", app.getAllTodos());
};