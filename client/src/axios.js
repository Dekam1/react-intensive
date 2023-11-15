import axios from 'axios';

const instance = axios.create({
	baseURL: "https://test-ns29.onrender.com"
});

export default instance;