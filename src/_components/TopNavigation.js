import React, { Component } from 'react';
import logo from "../img/Logo.png";
import { Dropdown, Image, Grid, GridColumn, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { baseUrl } from "../_helpers/variable";
import '../css/navbar.css';
import SearchInput from "./SearchInput";

class TopNavigation extends Component {

	constructor() {
		super();

		let user = JSON.parse(localStorage.getItem('user'));
		this.state = {
			user: {
				profilePicture: atob(user.profilePicture),
				name: atob(user.name)
			}
		}

		this.logOut = this.logOut.bind(this);
	}

	logOut = () => {
		// clear all data in local storage
		localStorage.clear();
		// redirect
		window.location.href = baseUrl + 'login';
	}

	render() {
		return (
			<div>
				<div className="top-navigation">
					<Grid columns="equal">
						<GridColumn width={6}>
							<Image src={logo} as={Link} to="/home" alt="logo" />
						</GridColumn>
						<GridColumn className="search-field" verticalAlign="middle" width={4}>

							<SearchInput/>

							{/* insert search field here */}
						</GridColumn>
						<GridColumn verticalAlign="middle" textAlign="center" width={1}>
							<Link to="/home">Home</Link>
						</GridColumn>
						<GridColumn verticalAlign="middle" textAlign="center" >
						<Link to="/browseAll">Browse All</Link>
						</GridColumn>
						<GridColumn verticalAlign="middle">
							<Dropdown trigger={<Image avatar src={this.state.user.profilePicture} />} className="top-navigation-dropdown">
								<Dropdown.Menu direction="left">
									<Dropdown.Item icon="bookmark" as={Link} to="/mywatchlist" text="My Watchlist" />
									<Dropdown.Item icon="check square" as={Link} to="/completedmovies" text="Completed Movies" />
									<Dropdown.Item text="Logout" onClick={this.logOut} />
								</Dropdown.Menu>
							</Dropdown>
						</GridColumn>
					</Grid>

				</div >
			</div>
		);
	}
}

export default TopNavigation;