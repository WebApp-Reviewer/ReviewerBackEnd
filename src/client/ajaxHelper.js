const BASE_URL = "http://localhost:3000/api";


function getAdminHeaders() {
    const headers ={
        'Content-Type': 'application/json'
    };
  const currentToken = JSON.parse(localStorage.getItem('token'));

  //console.log("current token", currentToken);

  if (currentToken === null) {
    headers['Authorization'] = 'Bearer ' + currentToken;
  }
  return headers;
}

function getHeaders() {
  const headers ={
      'Content-Type': 'application/json'
  };
  const currentToken = JSON.parse(localStorage.getItem('token'));

  console.log("current token", currentToken);

  if (currentToken !== null) {
    headers['Authorization'] = 'Bearer ' + currentToken;
  } 

  return headers;
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

export async function fetchAllAdminUsers() {
  try {
     const response = await fetch(`${BASE_URL}/admin/users`);
     const users = await response.json();
     console.log("ajax users", users);
     return users;
  } catch (error) {
      console.error('Trouble fetching users!', error);
  }
}

export async function fetchUserById(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function fetchMyData() {
  try {
      const response = await fetch(`${BASE_URL}/users/:id`, {
          headers: getHeaders(),
      });
      const result = await response.json();
      return result;
  } catch (error) {
      console.error("Uh oh, trouble fetching your data", error);
  }
}

export async function registerUser(username, password) {
  try {
      const response = await fetch(`${BASE_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(username, password)
      });
      const result = await response.json();
      const token = result;
      localStorage.setItem('user-token', token);
      localStorage.setItem('username', username);
      return result;
  } catch (error) {
      console.error('Could not register', error);
  }
}

export async function userLogin(username, password) {
  try {
      const response = await fetch(`${BASE_URL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(username, password)
      });
      const result = await response.json();
      const token = result;
      localStorage.setItem('user-token', token);
      localStorage.setItem('username', username);
      return result;
  } catch (error) {
    console.error('Count not login', error);
  }
}

export async function adminLogin({username, password, secret}) {
  console.log("admin ajax", username, password, secret);
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, secret})
    });
    const result = await response.json();
    console.log("admin result", result);
    const token = result.token;
    localStorage.setItem('user-token', token);
    localStorage.setItem('username', username);
    return result;
  } catch (error) {
    console.error('Count not login', error);
  }
}

export async function fetchAllWebsites() {
    try {
      const response = await fetch(`${BASE_URL}/websites`, {
        //headers: getHeaders(),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Trouble fetching websites!', error);
    }
};

export async function fetchAllAdminWebsites() {
  try {
    const response = await fetch(`${BASE_URL}/admin/websites`, {
      headers: {'Content-Type': 'application/json'}
    });
    const result = await response.json();
    console.log("admin websites", result);
    return result;
  } catch (error) {
    console.error('Trouble fetching websites!', error);
  }
};

export async function fetchSingleWebsite(websiteId) {
  try {
    const response = await fetch(`${BASE_URL}/websites/${websiteId}`, {
      headers: {'Content-Type': 'application/json'}
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble fetching the website!', error);
  }
};

export async function createWebsite(name, url, description, image) {
  console.log("website details", name, url, description, image);
  try {
    const response = await fetch(`${BASE_URL}/admin/websites`, {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({name, url, description, image})
    });
    console.log("ajax create website", response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble creating website!', error);
  }
}

export async function deleteWebsite(id) {
    try {
        const response = await fetch (`${BASE_URL}/websites/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error ('Could not delete website', error);
    }
}

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
      headers: {
        'Content-Type': 'application/json'
      }
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

export async function fetchReviewsByAuthorId(authorId) {
  try {
      // Make a request to your API to fetch reviews by authorId
      const response = await fetch(`${BASE_URL}/reviews?authorId=${authorId}`);
      if (!response.ok) {
          throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      return data.reviews;
  } catch (error) {
      throw error;
  }
}

export async function createReview(name, content, rating, websiteid, date = null) {
  console.log("Review details", name, content, rating, websiteid, date);
  console.log(getHeaders());

  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      headers: getHeaders(),
      method: 'POST',
      body: JSON.stringify({ name, content, rating, websiteid, date})
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Trouble creating review!', error);
  }
}


export async function deleteReview(id) {
  try {
      const response = await fetch (`${BASE_URL}/reviews/${id}`, {
          method: 'DELETE',
          headers: getHeaders(),
      });
      const result = await response.json();
      return result;
  } catch (error) {
      console.error ('Could not delete review', error);
  }
}

export async function editReview(id, name, content, rating, date) {
  console.log("Review details", name, content, rating, date);
  console.log(getHeaders());

  try {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, {
      headers: getHeaders(),
      method: 'PATCH',
      body: JSON.stringify({ name, content, rating, date })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Trouble editing review!', error);
  }
}



/* export async function createWebsite(name, url, description, image) {
  console.log("website details", name, url, description, image);
  try {
    const response = await fetch(`${BASE_URL}/admin/websites`, {
      headers: getAdminHeaders(),
      method: 'POST',
      body: JSON.stringify({name, url, description, image})
    });
    console.log("ajax create website", response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trouble creating website!', error);
  }
} */