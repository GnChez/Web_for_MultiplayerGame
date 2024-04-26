export const SERVER_URL = "http://localhost:3666" 



export async function loginGoogle(infoUser) {

  return fetch(`${SERVER_URL}/loginGoogle`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser)
    });

}
export async function login(infoUser) {

  await fetch(`${SERVER_URL}/users/login`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser)
    });

}

export async function registerUser(infoNewUser) {
  const response = await fetch(`${SERVER_URL}/users/registerUser`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoNewUser)
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
  return fetch(`${SERVER_URL}/getLogin`, { method: 'GET', credentials: 'include', mode: 'cors' });
}
export async function endSession() {
  return fetch(`${SERVER_URL}/logout`, { method: 'GET', credentials: 'include', mode: 'cors' });
}
