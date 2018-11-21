import {movieDbDomain,movieApiKeyPart} from "./variable";

export function expirationTime(countDays) {

	const day = 86400;
	let now = new Date();
	let time = now.getTime();
	time += countDays * day;

	return now.setTime(time);
}

export function setUserInBrowserStorage(email, days,profilePicture,name,id) {

	// count of days
	let now = new Date();
	let startExpiration = btoa(now.getTime());
	let endExpiration = btoa(expirationTime(days));
	profilePicture = btoa(profilePicture);
	email = btoa(email);
	name = btoa(name);
	id = btoa(id);

	// store data to object
	let toLocalStorage = {
		expiration: startExpiration,
		refreshExpiration: endExpiration,
		email: email,
		profilePicture: profilePicture,
		name: name,
		id: id
	};

	// set data to localStorage
	localStorage.setItem('user',JSON.stringify(toLocalStorage));
}

// helper function for checking authenticated user
export function checkAuth() {

	if( !JSON.parse(localStorage.getItem('user')) )
		return false;

	let {email,expiration,refreshExpiration} = JSON.parse(localStorage.getItem('user'));

	// in seconds
	let now = new Date();
	now = now.getTime();

	// IF DATA IS NOT EXIST
	if (!expiration || !refreshExpiration || !email) {
		return false;
	}

	// IF CREDENTIALS EXPIRED
	if (atob(refreshExpiration) < now || atob(expiration) > now) {
		return false;
	}

	return true;
}

export function movieApiUrl(str) {
	return movieDbDomain + str + movieApiKeyPart;
}

export function textLimit(str,count) {
	return str.length < count ? str :
		str.substring(0, count) + "..."
}

