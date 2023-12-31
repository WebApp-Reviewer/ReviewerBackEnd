const BASE_URL = "http://localhost3000/api";


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

export async function fetchMyData() {
  try {
      const response = await fetch(`${BASE_URL}/users/:id`, {
          headers: getHeaders(),
      });
      const result = await response.json();
      console.log("my data", result);
      return result;
  } catch (error) {
      console.error("Uh oh, trouble fetching your data", error);
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
      console.error('Count not login', error);
    }
}

export async function adminLogin(username, password, secret) {
  const sendData = {
    admin: {username: username, password: password, secret: secret}
  };

  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(sendData)
    });
    const result = await response.json();
    const token = result.data.token;
    localStorage.setItem('admin-token', token);
    localStorage.setItem('username', username);
    return result;
  } catch (error) {
    console.error('Count not login', error);
  }
}

export async function fetchAllWebsites() {
    try {
      const response = await fetch(`${BASE_URL}/websites`, {
        headers: getHeaders(),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Trouble fetching websites!', error);
    }
};

export async function fetchSingleWebsite(websiteId) {
  try {
    const response = await fetch(`${BASE_URL}/websites/${websiteId}`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching the website!', error);
  }
};

export async function createWebsite(name, url, description, image) {
  const sendData = {
    website: {name: name, url: url, description: description, image: image}
  }

  try {
    const response = await fetch(`${BASE_URL}/websites`, {
      headers: getHeaders(),
      method: 'POST',
      body: JSON.stringify(sendData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble creating website!', error);
  }
}

// needs to also have an authorid param with websiteId
export async function deleteWebsite(websiteId) {
    try {
        const response = await fetch (`${BASE_URL}/websites/${websiteId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error ('Could not delete website', error);
    }
}

// emily, I tried passing the authorId param here, I'm not sure if I structured it correctly but wanted to know your thoughts. 
export async function editWebsite(name, description, url, image) {
    const sendData = {
      website: {name: name, description: description, url: url, image: image},
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

export async function fetchAllReviews() {
  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching reviews!', error);
  }
}

export async function fetchSingleReview(reviewId) {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching the review!', error);
  }
};

export async function createReview(name, content, rating, date) {
  const sendData = {
    review: {name: name, content: content, rating: rating, date: date}
  }

  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      headers: getHeaders(),
      method: 'POST',
      body: JSON.stringify(sendData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble creating review!', error);
  }
}

export async function deleteReview(reviewId) {
  try {
      const response = await fetch (`$BASE_URL}/reviews/${reviewId}`, {
          method: 'DELETE',
          headers: getHeaders(),
      });
      const result = await response.json();
      return result;
  } catch (error) {
      console.error ('Could not delete review', error);
  }
}

export async function editReview(name, content, rating, date) {
  const sendData = {
    review: {name: name, content: content, rating: rating, date: date},
  };

  try {
    const response = await fetch(`${BASE_URL}/reviews/${websiteId}`, {
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