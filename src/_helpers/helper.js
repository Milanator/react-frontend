import {movieDbDomain,movieApiKeyPart} from "./variable";

export function expirationTime(countDays) {

	const day = 86400;
	let now = new Date();
	let time = 0;
	time += (countDays * day);

	return (Number(now.getTime()+time));
}

export function setUserInBrowserStorage(email, days,profilePicture,name,id) {

	// count of days
	let now = new Date();
	profilePicture = btoa(profilePicture);
	email = btoa(email);
	name = btoa(name);
	id = btoa(id);


	// store data to object
	let toLocalStorage = {
		expiration: now.getTime(),
		refreshExpiration: expirationTime(days),
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
	if (refreshExpiration < now || expiration > now) {
		return false;
	}

	return true;
}

export function movieApiUrl(str) {
	return movieDbDomain + str + movieApiKeyPart;
}

export function textLimit(str,count) {
	return str && str.length < count ? str :
		str.substring(0, count) + "..."
}

export function slugify(text) {

	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}

export function unSlugify(text) {

	return text.toString().replace('-',' ');
}

