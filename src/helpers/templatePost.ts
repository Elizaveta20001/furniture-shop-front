export const templateFetch = (url: string, data: object) => {
    return fetch(url,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
}