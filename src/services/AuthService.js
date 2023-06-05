const ServerURL = 'http://localhost:3000';

function createAuthService() {
    let jwt = null;

    function login(email, password) {
	return fetch(`${ServerURL}/login`, {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({ email, password }),
	})
	    .then(response => {
		if (!response.ok) throw new Error('Invalid email or password');
		return response.json();
	    })
	    .then(data => {
		jwt = data.token;
		document.cookie = `jwt=${data.token};max-age=604800;path=/`;
	    });
    }

    function logout() {
	jwt = null;
	document.cookie = 'jwt=;max-age=0;path=/';
        document.cookie = 'disclaimer=;max-age=0;path=/';
    }

    function isLoggedIn() {
	return jwt !== null;
    }

    function getJwt() {
	return jwt;
    }

    function agreeDisclaimer() {
        document.cookie = `disclaimer=agreed;max-age=604800;path=/`;
    }

    function hasAgreedDisclaimer() {
        return document.cookie.split(';').some((item) => item.trim().startsWith('disclaimer='));
    }

    async function fetchWithAuth(url, options = {}) {
	return new Promise((accept, reject) => {
	    if (!authService.isLoggedIn()) {
		reject('Not logged in');
	    } else {
		options.headers = options.headers || {};
		options.headers['Authorization'] = `Bearer ${getJwt()}`;
		fetch(url, options).then(accept).catch(reject);
	    }
	})
    }

    return {
	login,
	logout,
	isLoggedIn,
	getJwt,
        agreeDisclaimer,
        hasAgreedDisclaimer,
    };
}

const authService = createAuthService();

export default authService;
