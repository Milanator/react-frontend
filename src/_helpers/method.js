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
		anchorTag.setAttribute('href', inverseUrl);
		anchorTag.setAttribute('data-inverse-url', url);

		if (icon.classList.contains('watchlist')) {
			that.setState({ watchList: 1 - that.state.watchList() });
		} else if (icon.classList.contains('seenlist')) {
			that.setState({ seenList: 1 - that.state.seenList });
		}

	}).catch(err => {
		console.log(err);
	});
};

// set genres to film
export const setFilmGenre = (genres, films) => {

	let genreArray = [];

	// set genre array, where ID is key and value is name
	genres.forEach((genre, key) => {

		genreArray[genre.id] = genre.name;
	});

	// create and set parameter genre to this.state.films
	films.forEach((film, key) => {

		film.genre = [];

		if (film.genre_ids) {
			film.genre_ids.forEach((id, key) => {

				film.genre.push(genreArray[id]);
			});
		}
		if (film.genres) {
			film.genres.forEach(res => {
				film.genre.push(genreArray[res.id]);
			});
		}
	});

	return films;
};