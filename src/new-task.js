import { myApp } from ".";
import { createPriority } from "./priority";
import Todo from "./todo";
import getTodoItem, { getEditForm } from "./ui-components-main";
import Comp from "./ui-components-sidebar";

export function addTaskHandler(e){
    // Hide add button to prevent addition of multiple new todos
    e.target.classList.add('hidden');

    // Create a dummy todo
    const dummy = new Todo('New Title..', 'New Description..', new Date(), createPriority('low'));
    const editForm = getEditForm(dummy);
    
    const mainBody = document.querySelector('.main-body');
    const todoItem = new Comp('div', {classList: ['todo-item']}).render();
    todoItem.append(editForm);
    mainBody.append(todoItem);
    todoItem.scrollIntoView({behavior: "smooth"});
};