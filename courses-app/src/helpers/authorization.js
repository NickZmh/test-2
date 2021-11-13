// set the token and user from the session storage
export const setUserSession = (token, user) => {
	console.log(token, user);
	sessionStorage.setItem('token', token);
	sessionStorage.setItem('user', JSON.stringify(user));
};
// get the token and user from the session storage
export const getUserSession = (value) => {
	return sessionStorage.getItem(value);
};
// delete user token and user from the seesion storage
export const deleteUserSession = (token, user) => {
	sessionStorage.removeItem(token);
	sessionStorage.removeItem(user);
};

export const getUserByToken = async () => {
	const response = await fetch('http://localhost:3000/users/me', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: getUserSession('token'),
		},
		method: 'GET',
	});
	const responseResult = await response.json();
	console.log();
	if (responseResult.successful === true) {
		return responseResult;
	} else if (responseResult.successful === false) {
		return null;
	}
};

// show error validation form
export const setError = (error, errorText) => {
	console.log(error);
	alert(errorText);
};
// validation form
export const validation = (inputValue, succesMessages) => {
	const { name, email, password } = inputValue;

	const patern =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const valid = patern.test(email);

	if (name.length < 1 || email.length < 1 || password < 1) {
		alert('Please, fill all inputs');
		return false;
	} else if (valid === false) {
		alert(`Email field is not valid`);
		return false;
	} else if (name.length < 2) {
		alert('Name must include at least two characters');
		return false;
	} else if (password.length < 6) {
		alert('Password field must include at least six characters');
		return false;
	} else {
		if (succesMessages !== undefined) alert(succesMessages);
		return true;
	}
};
