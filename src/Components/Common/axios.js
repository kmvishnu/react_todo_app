import axios from "axios";
import config from "../../config";
import { jwtDecode } from "jwt-decode";
import { clearToken, setAuthToken } from "../../features/user/userSlice";

const api = axios.create({
  baseURL: config.apiBaseUrl,
});

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    return decoded.exp > now;
  } catch (error) {
    return false;
  }
};

async function setRefreshToken(refreshToken, dispatch) {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/v2/refreshToken`, { refreshToken });
    const { token } = response.data;
    localStorage.setItem('token', token);
    dispatch(setAuthToken({ token, refreshToken }));
    return token;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    dispatch(clearToken());
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    throw new Error('Failed to refresh token');
  }
}

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const dispatch = config.dispatch; // Access the dispatch function passed in

    if (!isTokenValid(token) && refreshToken) {
      token = await setRefreshToken(refreshToken, dispatch);
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
