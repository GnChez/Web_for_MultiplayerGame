export const SERVER_URL = "https://web-for-multiplayergame-server.onrender.com"

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

export async function getTopMatches2() {
  const data = [
      {
        "id": 1,
        "complete_date": "2024-02-25T14:30:00Z",
        "time": "00:04:30",
        "id_host": 101,
        "host_username": "HostPlayer1",
        "id_client": 201,
        "client_username": "ClientPlayer1",
        "stages": [
          {
            "id": 11,
            "name": "Stage 1",
            "time": "00:00:45",
            "rooms": [
              { "id": 111, "name": "Room A", "order": 1, "time": "00:00:15" },
              { "id": 112, "name": "Room B", "order": 2, "time": "00:00:20" },
              { "id": 113, "name": "Room C", "order": 3, "time": "00:00:10" }
            ]
          },
          {
            "id": 12,
            "name": "Stage 2",
            "time": "00:01:30",
            "rooms": [
              { "id": 114, "name": "Room D", "order": 1, "time": "00:00:30" },
              { "id": 115, "name": "Room E", "order": 2, "time": "00:00:40" },
              { "id": 116, "name": "Room F", "order": 3, "time": "00:00:20" }
            ]
          },
          {
            "id": 13,
            "name": "Stage 3",
            "time": "00:02:15",
            "rooms": [
              { "id": 117, "name": "Room G", "order": 1, "time": "00:00:50" },
              { "id": 118, "name": "Room H", "order": 2, "time": "00:00:45" },
              { "id": 119, "name": "Room I", "order": 3, "time": "00:00:40" }
            ]
          }
        ]
      },
      {
        "id": 2,
        "complete_date": "2024-02-26T15:00:00Z",
        "time": "00:06:00",
        "id_host": 102,
        "host_username": "HostPlayer2",
        "id_client": 202,
        "client_username": "ClientPlayer2",
        "stages": [
          {
            "id": 11,
            "name": "Stage 1",
            "time": "00:02:00",
            "rooms": [
              { "id": 120, "name": "Room A", "order": 1, "time": "00:01:20" },
              { "id": 121, "name": "Room B", "order": 2, "time": "00:00:25" },
              { "id": 122, "name": "Room C", "order": 3, "time": "00:00:15" }
            ]
          },
          {
            "id": 12,
            "name": "Stage 2",
            "time": "00:01:30",
            "rooms": [
              { "id": 123, "name": "Room D", "order": 1, "time": "00:00:40" },
              { "id": 124, "name": "Room E", "order": 2, "time": "00:00:30" },
              { "id": 125, "name": "Room F", "order": 3, "time": "00:00:20" }
            ]
          },
          {
            "id": 13,
            "name": "Stage 3",
            "time": "00:02:15",
            "rooms": [
              { "id": 117, "name": "Room G", "order": 1, "time": "00:00:50" },
              { "id": 118, "name": "Room H", "order": 2, "time": "00:00:45" },
              { "id": 119, "name": "Room I", "order": 3, "time": "00:00:40" }
            ]
          }
        ]
      }
    ]
  
  
  
  return data  
}

export async function getPersonalStatsData2(playerId) {
  const data =  {
    timePlayed: 2,
    matchs_registered: 2,
    frequentPartner: "Player 2",
    bestTime: "01:30",
  }
  return data
}

//REGENERAR CONTRASEÑA
