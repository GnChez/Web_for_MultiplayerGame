export const SERVER_URL = "http://localhost:3666"

export async function downloadImage(formData) {
    const response = await fetch(`${SERVER_URL}/downloadImage`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData,
          });
    const imagen = await response.json();
    return imagen;
  }

export async function loginGoogle(usuario) {

    return fetch(`${SERVER_URL}/loginGoogle`,
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

    return fetch(`${SERVER_URL}/login`,
      {
        method: 'POST',
        credentials: 'include', mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      });
  
}

export async function registerUser(infoUser) {
    const response = await fetch(`${SERVER_URL}/registerUser`,
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
    return fetch(`${SERVER_URL}/getLogin`, { method: 'GET', credentials: 'include', mode: 'cors' });
}

export async function endSession() {
    return fetch(`${SERVER_URL}/logout`, { method: 'GET', credentials: 'include', mode: 'cors' });
}

//REGENERAR CONTRASEÑA
