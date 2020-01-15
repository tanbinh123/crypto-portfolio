import fetch from 'unfetch';

export const getAllItems = () => 
    fetch('api/items').then(checkStatus);

export const addNewItem = student =>
    fetch('api/items', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student)
    })
    .then(checkStatus);

export const deleteItem = studentId =>
    fetch(`api/items/${studentId}`, {
        method: 'DELETE'
    })
    .then(checkStatus);

    const checkStatus = response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            response.json().then(e => {
                error.error = e;
            });
            return Promise.reject(error);
        }
    }
    