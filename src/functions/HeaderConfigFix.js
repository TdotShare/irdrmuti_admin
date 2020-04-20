const headerConfig = (token) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'content-type': 'multipart/form-data',
            'Authorization': token
        }
    };

    return config
}


const headerConfig_json = (token) => {
    const config = {
        headers: {
            'accept': 'application/json',
            'Authorization': token
        }
    };

    return config
}

export default { headerConfig , headerConfig_json }