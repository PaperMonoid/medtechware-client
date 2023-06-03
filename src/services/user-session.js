import Cookie from 'js-cookie';

function createTestUserSession() {
    Cookie.set('username', 'Daniel');
}

function getUsername() {
    const username = Cookie.get('username');
    return new Promise((accept, reject) => {
	if (username) {
	    accept(username);
	} else {
	    reject(new Error('Unable to obtain username.'));
	}
    });
}


export default {
    createTestUserSession,
    getUsername
}
