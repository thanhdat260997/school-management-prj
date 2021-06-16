export function authHeader() {
  // return authorization header with jwt token
  let token = localStorage.getItem('token');

  if (token) {
      return { 
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
  } else {
      return {};
  }
}