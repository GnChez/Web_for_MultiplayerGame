export const SERVER_URL = "http://localhost:3666"

export async function downloadImage(formData) {
    const response = await fetch(`${SERVER_URL}/users/downloadImage`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData,
          });
    const imagen = await response.json();
    return imagen;
  }

  export async function downloadGame() {          
      const anchor = document.createElement('a')
      anchor.href = SERVER_URL+"/data/getGame"
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
  }
  
export async function loginGoogle(usuario) {

    return fetch(`${SERVER_URL}/users/loginGoogle`,
      {
        method: 'POST',
        credentials: 'include', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      });
  
}

export async function login(usuario) {
    const response = await fetch(`${SERVER_URL}/users/login`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });
  const data = await response.json();
  console.log(data)
  return data;

  
}

export async function registerUser(infoUser) {
    const response = await fetch(`${SERVER_URL}/users/registerUser`,
      {
        method: 'POST',
        credentials: 'include', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoUser)
      });
    if (response.status === 200) {
      console.log('Registration successful!');
      const messages = await response.text()
      return { success: true, message: messages };
    } else {
      console.log('Registration failed.');
      const messages = await response.text()
      return { success: false, message: messages };
    }
}

export async function getLogin() {
    return fetch(`${SERVER_URL}/users/getLogin`, { method: 'GET', credentials: 'include', mode: 'cors' });
}

export async function endSession() {
    return fetch(`${SERVER_URL}/users/logout`, { method: 'GET', credentials: 'include', mode: 'cors' });
}

export async function isUsernameAvailable(username) {
  try {
    const response = await fetch(`${SERVER_URL}/users/isUsernameAvailable/${username}`, {
      method: 'GET',
      credentials: 'include', 
      mode: 'cors'            
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();

    return data.available;

  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

export async function isEmailAvailable(email) {
  try {
    const response = await fetch(`${SERVER_URL}/users/isEmailAvailable/${email}`, {
      method: 'GET',
      credentials: 'include', 
      mode: 'cors'         
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();

    return data.available;

  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

export async function updateUsername(user,newUsername) {
  try {
    const response = await fetch(`${SERVER_URL}/users/updateUser/${user.id}`, {
      method: 'POST',
      credentials: 'include', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername, password: user.password })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

//Obtain the top 10 matches
export async function getTopMatches() {
  try {
    const response = await fetch(`${SERVER_URL}/match/getTopMatches`, {
      method: 'GET',
      credentials: 'include', 
      mode: 'cors'         
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Network response was not ok. Status: ${response.status}, Text: ${text}`);
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

export async function getPersonalStatsData(playerId) {
  try {
    const response = await fetch(`${SERVER_URL}/data/getPersonalStatsData/${playerId}`, {
      method: 'GET',
      credentials: 'include', 
      mode: 'cors'         
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Network response was not ok. Status: ${response.status}, Text: ${text}`);
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}



//REGENERAR CONTRASEÑA
