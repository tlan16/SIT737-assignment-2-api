import _ from 'lodash';

let component = () => {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Welcome', 'to', 'SIT737', 'Assignment 1'], ' ');

    return element;
};

document.body.appendChild(component());