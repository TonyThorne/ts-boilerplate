import * as adam from '../data/adams.json'
import * as monday from '../data/Teams_1677012281.json'
import * as sue from '../data/sue-feb.json'
import * as EmpListINPS from '../data/EmployeeListINPS.json'
import type { EmpList } from 'src/data/types';


export const fn = () => { return 'This is a test' }

const list1 = adam
const list2 = sue

//const results = adam.filter(({ id: id1 }) => !sue.some(({ id: id2 }) => id2 === id1));
export const filter1 = () => {
    const results = list1.filter(({ surname: id1 }) => !list2.some(({ surname: id2 }) => id2.toUpperCase() === id1.toUpperCase()));
    return results
}

type countOfData = {
    adam: Number
    monday: Number
    sue: Number
    inps: Number
}
// console.log('adam', adam.length, 'monday', monday.length, 'sue', sue.length, 'empListINPS', EmpListINPS.length)
export const countItemsInEachFile = () => {
    const items: countOfData = {
        adam: adam.length,
        monday: monday.length,
        sue: sue.length,
        inps: EmpListINPS.length,
    }
    return items
}
console.log(countItemsInEachFile());



// function that returns the differences in both files
export const filter2 = (list1, list2) => {

    //Find values that are in result1 but not in result2
    var uniqueResultOne = list1.filter(function (obj) {
        return !list2.some(function (obj2) {
            return obj.surname.toUpperCase() == obj2.surname.toUpperCase()
        });
    });

    //Find values that are in result2 but not in result1
    var uniqueResultTwo = list2.filter(function (obj) {
        return !list1.some(function (obj2) {
            const partObject = {
                id: obj2.id,
                forename: obj2.forename,
                surname: obj2.surname
            }

            return obj.surname.toUpperCase() == obj2.surname.toUpperCase();
        });
    });

    //Combine the two arrays of unique entries
    var result = uniqueResultOne.concat(uniqueResultTwo);
    return result
}

// console.log('result', filter2(list1, list2));


// console.log('EmpListINPS', EmpListINPS);
// console.log('Filter', EmpListINPS.filter((item: EmpList) => item.surname.toUpperCase() === 'AL MURRANI'));


// console.log('This is adam!', adam)
// console.log('This is monday!', monday)
// console.log('This is sue!', sue)
