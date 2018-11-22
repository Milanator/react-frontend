import axios from "axios";
import {getClosest} from "./helper";

export const addSeenWatchList = (event) => {

	event.preventDefault();
	event.stopPropagation();

	let anchorTag = event.target.parentNode;
	let type = anchorTag.getAttribute('id');
	let card = getClosest(anchorTag,'.card');
	let url = anchorTag.getAttribute('href');
	let inverseUrl = anchorTag.getAttribute('data-inverse-url');
	let icon = event.target;

	axios({
		method: 'get',
		url: url
	}).then(() => {

		icon.classList.toggle('outline');
		anchorTag.setAttribute('href', inverseUrl);
		anchorTag.setAttribute('data-inverse-url', url);
		console.log(card.querySelectorAll('i.bookmark'));

	}).catch(err => {
		console.log(err);
	});
};