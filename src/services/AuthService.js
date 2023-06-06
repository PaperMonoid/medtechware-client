const ServerURL = 'http://localhost:3001';

function createAuthService() {
    let jwt = null;

    function checkAccountExists(email) {
	return fetch(`${ServerURL}/user/checkEmail/${email}`, {
	    method: 'GET',
	    headers: {
		'Content-Type': 'application/json',
	    },
	})
	    .then(response => {
		if (!response.ok) throw new Error('Error creating new user');
		return response.json();
	    })
	    .then(data => {
		return data.exists;
	    });
    }

    function signin({ fullName, email, password }) {
	return fetch(`${ServerURL}/user/register`, {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({ fullName, email, password }),
	})
	    .then(response => {
		if (!response.ok) throw new Error('Error creating new user');
		return response.json();
	    })
	    .then(data => {
		jwt = data.token;
		document.cookie = `jwt=${data.token};max-age=604800;path=/`;
		return jwt;
	    });
    }

    function login(email, password) {
	return fetch(`${ServerURL}/auth/login`, {
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
		return jwt;
	    });
    }

    function logout() {
	jwt = null;
	document.cookie = 'jwt=;max-age=0;path=/';
        document.cookie = 'disclaimer=;max-age=0;path=/';
    }

    function isLoggedIn() {
	return getJwt() !== null;
    }

    function getJwt() {
	const cookie = document.cookie.split("; ").filter(cookie => cookie.startsWith('jwt='));
	if (cookie) {
	    if (cookie.length > 0) {
		jwt = cookie[0].split('=')[1];
		return jwt;
	    } else {
		return null;
	    }
	} else {
	    return null;
	}
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

    function isAdmin() {
	try {
	    if (isLoggedIn()) {
		const jwt = getJwt();
		const payload = jwt.split('.')[1];
		const json = JSON.parse(atob(payload));
		return json.isAdmin;
	    } else {
		return false;
	    }
	} catch(error) {
	    return false;
	}
    }

    return {
	checkAccountExists,
	signin,
	login,
	logout,
	isLoggedIn,
	isAdmin,
	getJwt,
        agreeDisclaimer,
        hasAgreedDisclaimer,
	fetchWithAuth
    };
}

const authService = createAuthService();

export default authService;
