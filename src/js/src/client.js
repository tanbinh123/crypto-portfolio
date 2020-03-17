import fetch from 'unfetch';

export const getAllItems = () => 
    fetch('api/items').then(checkStatus);

export const addNewItem = item =>
    fetch('api/items', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(item)
    })
    .then(checkStatus);

export const deleteItem = itemId =>
    fetch(`api/items/${itemId}`, {
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
    