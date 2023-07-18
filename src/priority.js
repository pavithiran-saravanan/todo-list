
export class Priority{
    constructor(number, text){
        this.number = number;
        this.text = text;
    }
}

function createPriorityHelper(number, text){
    return new Priority(number, text);
}

function createPriority(priority){
    if(priority == 1 || priority == 'low'){ 
        return createPriorityHelper(1, 'low'); 
    };
    if(priority == 2 || priority == 'medium'){
        return createPriorityHelper(2, 'medium');
    };
    if(priority == 3 || priority == 'high'){
        return createPriorityHelper(3, 'high');
    };
}

export {createPriority};
