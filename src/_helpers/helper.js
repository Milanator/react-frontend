import {movieDbDomain,movieApiKeyPart} from "./variable";

export function expirationTime(countDays) {

	const day = 86400;
	let now = new Date();
	let time = now.getTime();
	time += countDays * day;

	return now.setTime(time);
}

export function setUserInBrowserStorage(email, days) {

	// count of days
	let now = new Date();
	let startExpiration = btoa(now.getTime());
	let endExpiration = btoa(expirationTime(days));
	email = btoa(email);

	// set data about user in browser storage
	localStorage.setItem('expiration', startExpiration);
	localStorage.setItem('refreshExpiration', endExpiration);
	localStorage.setItem('email', email);
}

// helper function for checking authenticated user
export function checkAuth() {

	// in seconds
	let now = new Date();
	now = now.getTime();
	let email = localStorage.getItem('email');
	let expiration = localStorage.getItem('expiration');
	let refreshExpiration = localStorage.getItem('refreshExpiration');

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

