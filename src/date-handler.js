import { compareAsc, format } from 'date-fns';

function getFormattedDate(date){
    return format(date, 'dd/MM/yyyy');
}

function createDateFromString(dueDate){
    const dateArray = dueDate.split('T')[0].split('-');
    return new Date(dateArray[0], dateArray[1], dateArray[2]);
}

export {getFormattedDate, createDateFromString};