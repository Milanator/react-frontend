import React, {Component} from 'react';
import TopNavigation from './../_components/TopNavigation';
import NewFilms from "./newFilms";

class Home extends Component {

	constructor(props){

		super(props);

		let userStorage = JSON.parse(localStorage.getItem('user'));

		this.state = {
			name: atob(userStorage.name)
		}
	}

	render() {

		return (
			<div>
				<TopNavigation />
				<div className="container">
					<h1 className={'title'}>Welcome { this.state.name }</h1>
					<NewFilms/>
				</div>
			</div>
		);
	}
}

export default Home;