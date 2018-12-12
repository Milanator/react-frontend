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

		/* if (film.genres) {
			film.genres.forEach(res => {
				film.genres.push(genreArray[res.id]);
				// console.log(genreArray[res.id])
			});
		} */
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
export const addMyList = (event,that, fromFilmModal=0,fromFilmDetail=0) => {

	let movieInMyLists;
	let target = $(event.target);
	let hiddenData = target.closest('.marks').find('.hidden-data');
	let listId = Number(target.closest('.addToList').attr('data-list-id'));
	let data = setRequestDataToMyList(hiddenData, listId);
	let listName = target.closest('.addToList').attr('data-list-name');
	let flashMessage = {}

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

		// movie was removed from list
		if( index !== -1 ){
			
			flashMessage = {
				message: `Succesfully removed to ${listName}`,
				type: 'danger'
			};
		} else {	// movie was added to list

			flashMessage = {
				message: `Succesfully added to ${listName}`,
				type: 'success'
			};
		}

		$('.alert.flash-message').show()

		that.setState({flashMessage:flashMessage,movieInMyLists: movieInMyLists})

		if( !fromFilmModal && !fromFilmDetail ){
			// send data to film modal --> update flash message 
			that.props.changeFlashMessage(flashMessage)
		}

	}).catch(err => {
		console.log(err);
	});

	return flashMessage
}

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

/// formatting money
export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};
