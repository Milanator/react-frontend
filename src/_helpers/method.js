import axios from "axios";
import {ourApiUrl} from "./variable";
import $ from "jquery";

// set genres to film
export const setFilmGenre = (genres,films,fromMyList=0) => {

	let genreArray = [];

	// set genre array, where ID is key and value is name
	genres.forEach((genre, key) => {

		genreArray[genre.id] = genre.name;
	});

	// create and set parameter genre to this.state.films
	films.forEach((film, key) => {

		film.genres = [];

		if (film.genre_ids) {
			film.genre_ids.forEach((id, key) => {

				film.genres.push(genreArray[id]);
			});
		}
		if (film.genres) {
			film.genres.forEach(res => {
				film.genres.push(genreArray[res.id]);
			});
		}
	});

	return films;
};

// set new attribute to film, all lists idies, where is film added
// fromMyList - MyList.js file
export const setMyListToMovie = (films,myLists,fromMyList=0) =>{

	if( myLists ){

        films.forEach((film,key) => {

            film.inMyLists = [];
            let filmId = fromMyList ? film.movie_id : film.id;

            myLists.forEach((list,key) => {

                if( filmId === list.movie_id ){

                    film.inMyLists.push(list.myList_id);
                }
            });
        })
	}

	return films;
};

// function for adding and removing to myList
export const addMyList = (event,that, fromFilmModal=0,) => {

	let movieInMyLists;
	let target = $(event.target);
	let hiddenData = target.closest('.marks').find('.hidden-data');
	let listId = Number(target.closest('.addToList').attr('data-list-id'));
	let data = setRequestDataToMyList(hiddenData, listId);

	if( fromFilmModal ){

		movieInMyLists = that.props.movieInMyLists;
	} else {

		movieInMyLists = that.state.movieInMyLists;
	}

	const index = movieInMyLists.indexOf(listId);
	let url;

	// IF LIST CONTAINS MOVIE
	if( index !== -1 ){

		movieInMyLists.splice(index, 1);
		url = ourApiUrl+'mylist/delete';
	} else{		// IF LIST DOESNT CONTAIN MOVIE

		movieInMyLists.push(listId);
		url = ourApiUrl+'mylist/add';
	}

	axios({
		method: 'post',
		url: url,
		data: data
	}).then((res) => {

		that.setState({movieInMyLists: movieInMyLists});
		if( !fromFilmModal ){
			// send data to film modal --> update seen and watch button
			that.props.sendWatchSeen(that.state.inWatchList,that.state.inSeenList,that.state.movieInMyLists)
		}

	}).catch(err => {
		console.log(err);
	});
}

// function for add to seen and watchlist list also
export const addSeenWatchList = (event,that,fromFilmModal = 0) => {

	event.preventDefault();
	event.stopPropagation();

	let icon = $(event.target);
	let hiddenData = icon.closest('.marks').find('.hidden-data');
	let listId = Number(icon.closest('.addToList')[0].getAttribute('data-list-id'));
	let data = setRequestDataToMyList(hiddenData, listId);
	let anchorTag = icon.parent();
	let url = anchorTag.attr('href');
	let inverseUrl = anchorTag.attr('data-inverse-url');

	axios({
		method: 'post',
		url: url,
		data: data
	}).then((resp) => {

		// change visual of icon
		icon.toggleClass('outline');
		// change href of anchors
		anchorTag.attr('href',inverseUrl);
		anchorTag.attr('data-inverse-url',url);

		if (icon.hasClass('watchlist')) {
			// set opposite value
			that.setState({inWatchList: 1 - that.state.inWatchList});
		} else if (icon.hasClass('seenlist')) {
			// set opposite value
			that.setState({inSeenList: 1 - that.state.inSeenList});
		}

		if( !fromFilmModal ){
			// send data to film modal --> update seen and watch button
			that.props.sendWatchSeen(that.state.inWatchList,that.state.inSeenList,that.state.movieInMyLists)
		}

	}).catch(err => {
		console.log(err);
	});
};

const setRequestDataToMyList = (hiddenData, listId=null) => {

	return {
		movieId: Number(hiddenData.find("input[name='movieId']")[0].getAttribute('value') ),
		posterPath: hiddenData.find("input[name='posterPath']")[0].getAttribute('value'),
		title: hiddenData.find("input[name='title']")[0].getAttribute('value'),
		overview: hiddenData.find("input[name='overview']")[0].getAttribute('value'),
		originalLanguage: hiddenData.find("input[name='originalLanguage']")[0].getAttribute('value'),
		myListId: listId,
		listId: listId,
		voteAverage: Number(hiddenData.find("input[name='rating']")[0].getAttribute('value')),
		genres: hiddenData.find("input[name='genres']")[0].getAttribute('value')
	}
}