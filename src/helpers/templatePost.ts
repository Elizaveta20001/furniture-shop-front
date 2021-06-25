export const templateFetch = (url: string, data: object, token: string, callback: CallableFunction) => {
    fetch(url,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(async(response) => {
            const data = await response.json();
            return {data: data, status: response.status};
    }).then(({data,status}) => {
        alert(data.message);
        return callback(data, status);
    }).catch(error => {
        return alert(error.message);
    });
}
