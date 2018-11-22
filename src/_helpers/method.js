import axios from "axios";

export const addToWatchList = (event) => {

	event.preventDefault();
	event.stopPropagation();

	let url = event.target.parentNode.href;

	axios({
		method: 'get',
		url: url
	}).catch(err => {
		console.log(err);
	});
};

export const addToSeenList = (event) => {

	event.preventDefault();
	event.stopPropagation();

	let url = event.target.parentNode.href;

	axios({
		method: 'get',
		url: url
	}).catch(err => {
		console.log(err);
	});
};