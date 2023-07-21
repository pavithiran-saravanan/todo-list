import Comp, { getMenuItem, getProjectItem } from "./ui-components";
import addBtn from './icons/add-icon-bold.svg';
import tasksIcon from './icons/tasks-icon.svg';
import todayIcon from './icons/today-icon-outline.svg';
import profilePic from './images/stock-profile-2.jpg';
import dropDown from './icons/dropdown-icon.svg';
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
        new Comp('img', {classList: ['add-btn'], src: addBtn, width: 18}).render()
    );

    // Create 4 menu items: All tasks, Today, This Week, High Priority. Append all 4 to quickLinks section.
    const menuBody = document.querySelector('.menu-body');
    menuBody.append(
        getMenuItem('All Tasks', tasksIcon),
        getMenuItem('Today', todayIcon),
        getMenuItem('This Week', todayIcon),
        getMenuItem('High Priority', tasksIcon),
    );   

    // Add event listener to dropdown
    const menuTitleContainer = document.querySelector('.menu-title-container');
    menuTitleContainer.addEventListener('click', toggleMenuItems);
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

export function addEventListernersToMenuItems(app){
    // Get all menu item elements
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((menuItem, index)=>{
        menuItem.addEventListener('click', (e) => {
            // Select the clicked item
            if(!menuItem.classList.contains('selected')){
                menuItem.classList.add('selected');
                console.log(menuItem)
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
        });
    });
}

function getMenuTasks(menuIndex, app){
    if(menuIndex == 0) return;
};

function displayTodos(title, todos){
    const main = document.querySelector('.main');
    main.textContent = '';
    main.appendChild(new Comp('h1', {textContent: title}).render());
    todos.forEach((todo)=>{
        // Call a function that returns an todo main element and append it to main
        main.appendChild(new Comp('div', {textContent: todo.title}).render());
    });
};

function renderStaticMain(){
    const main = document.querySelector('.main');
    const mainTitleContainer = new Comp('div', {classList: ['main-title-container']}).render();
    mainTitleContainer.append(new Comp('div', {classList: ['main-title'], textContent: 'All Tasks'}).render());

    const mainBody = new Comp('div', {classList: ['main-body']}).render();
    mainBody.append(new Comp('div', {classList: ['main-info'], textContent: 'No Projects to display'}).render());
    
    main.append(
        mainTitleContainer,
        mainBody
    );
};