const BASE_URL = "http://localhost3000/api:";

function getHeaders() {
    const headers ={
        'Content-Type': 'application/json'
};
const currentToken = localStorage.getItem('user token');
if (currentToken !== null) {
    headers['Authorization'] = 'Bearer' + currentToken;
} return headers;
}

export async function fetchAllUsers() {
    try {
       const response = await fetch(`${BASE_URL}/users`);
       const users = await response.json();
       return users;
    } catch (error) {
        console.error('Trouble fetching users!', error);
    }
} 


export async function registerUser(username, password) {
    const sendData = {
        user: {username: username, password: password},
    };

    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(sendData)
        });
        const result = await response.json();
        const token = result.data.token;
        localStorage.setItem('user-token', token);
        localStorage.setItem('username', username);
        return result;
    } catch (error) {
        console.error('Could not register', error);
    }

}

export async function userLogin(username, password) {
    const sendData = {
        user: {username: username, password: password}
    };

    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(sendData)
        });
    }
}

export async function featchAllWebsites() {
        const resposne = await fetch (`${BASE_URL}/websites`);
        const result = await response.json();
        return result.data.website;
    }

export async function fetchSingleWebsite() {
    const response = await fetch(`${BASE_URL}/websites/${websiteId}`)
    const result = await response.json();
    return result.data.websiteId
}

export async function addNewWebsite(website, token) {
    const response = await fetch(`${BASE_URL}/websites`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(website)
    })
    const result = await response.json();
    return result.data.website
}

export async function deleteWebsite(website, websiteId, token) {
    const response = await fetch(`${BASE_URL}/websites`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(website)
    })
    const result = await response.json();
    return result.data.website
}

export async function editWebsite(websiteId, token, userId, updatedWebsite) {
    try {
        // Fetch the original website to check its owner
        const originalResponse = await fetch(`${BASE_URL}/websites/${websiteId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!originalResponse.ok) {
            // Handle the case where the website does not exist or there's an error
            throw new Error("Website not found or an error occurred.");
        }
        const originalWebsite = await originalResponse.json();
        // Check if the user making the request is the owner of the website
        if (originalWebsite.userId !== userId) {
            throw new Error("You are not authorized to edit this website.");
        }
        // If the user is the owner, proceed with the update
        const updateResponse = await fetch(`${BASE_URL}/websites/${websiteId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedWebsite)
        });
        if (!updateResponse.ok) {
            // Handle the case where the update fails
            throw new Error("Failed to update the website.");
        }
        const result = await updateResponse.json();
        return result.data.website;
    } catch (error) {
        console.error("editWebsite", error);
        throw error;
    }
}