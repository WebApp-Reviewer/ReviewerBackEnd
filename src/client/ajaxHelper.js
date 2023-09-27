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
    const response = await fetch(`${BASE_URL}/users`);
    const result = await response.json();
    return result.data.users;
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
        user: {username: username, password: password},
    };

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
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
        console.error('Could not login', error)
    }
}

export const fetchAllWebsites = async () => {
    try {
      const response = await fetch(`${BASE_URL}/websites`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  export const fetchSingleWebsite = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Website not found');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };

export async function addWebsite(websiteData) {
    const sendData = {
        websiteData: websiteData,
    };

    try {
        const response = await fetch(`${BASE_URL}/websites`, {
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
        console.error('Could not add website', error);
    }
}

// needs to also have an authorid param with websiteId
export async function deleteWebsite(websiteId) {
    try {
        const response = await fetch (`$BASE_URL}/websites/${websiteId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error deleting website');
        }
        return 'Website deleted successfully';
    } catch (error) {
        console.error ('Could not delete website', error);
    }
}

// emily, I tried passing the authorId param here, I'm not sure if I structured it correctly but wanted to know your thoughts. 
export async function editWebsite(websiteId, authorId, updatedWebsiteData) {
    const sendData = {
      websiteData: { websiteId, authorId, updatedWebsiteData },
    };
  
    try {
      const response = await fetch(`${BASE_URL}/websites/${websiteId}`, {
        method: 'PATCH', 
        headers: getHeaders(),
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Could not edit website', error);
    }
  }
