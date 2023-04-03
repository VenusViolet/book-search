import decode from 'jwt-decode';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  async getProfile() {
    const token = await this.getToken();
    return decode(token);
  }

  // check if user's logged in
  async loggedIn() {
    try {
      const token = await this.getTokenFromServer();
      return !!token && !this.isTokenExpired(token); // handwaiving here
    } catch (err) {
      return false;
    }
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  async getTokenFromServer() {
    try {
      const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache()
      });

      const query = gql`
        query {
          token {
            value
          }
        }
      `;

      const { data } = await client.query({ query });

      return data.token.value;
    } catch (err) {
      throw new Error('Authentication error');
    }
  }

  async getToken() {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem('id_token');
    if (token && !this.isTokenExpired(token)) {
      return token;
    } else {
      const newToken = await this.getTokenFromServer();
      localStorage.setItem('id_token', newToken);
      return newToken;
    }
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
