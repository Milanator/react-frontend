import axios from "axios";

export const addSeenWatchList = (event) => {

	event.preventDefault();
	event.stopPropagation();

	let anchorTag = event.target.parentNode;
	let url = anchorTag.getAttribute('href');
	let inverseUrl = anchorTag.getAttribute('data-inverse-url');
	let icon = event.target;
	let that = this;

	axios({
		method: 'get',
		url: url
	}).then(() => {

		icon.classList.toggle('outline');
		anchorTag.setAttribute('href',inverseUrl);
		anchorTag.setAttribute('data-inverse-url',url);

		if( icon.classList.contains('watchlist') ){
			that.setState({watchList: 1-that.state.watchList()});
		} else if( icon.classList.contains('seenlist') ){
			that.setState({seenList: 1-that.state.seenList});
		}

	}).catch(err => {
		console.log(err);
	});
};