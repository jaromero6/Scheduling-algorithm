'use strict';

export function isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}

export function getMinimum(numbersArray){
    let minValue = numbersArray[0];
    numbersArray.forEach(element => {
    if(element < minValue){
        minValue = element;
        }
    });
}

export function getMaximum(numbersArray){
    let maxValue = 0;
    numbersArray.forEach(element => {
        if(element > maxValue) maxValue = element;
    });
    return maxValue;
}

export function isUnique(arrayElements, value){
    return arrayElements.filter(element => {element === value}).length == 1;
}

export function isEmpityMatrix(arrayOfArray){
    return arrayOfArray.filter(element => {element.length == 0}).length == arrayOfArray.length;

}