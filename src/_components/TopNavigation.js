import React, { Component } from 'react';
import { Dropdown, Image, Grid, GridColumn, DropdownDivider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { baseUrl } from "../_helpers/variable";
import logo from "../img/Logo.png";
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
						<GridColumn width={7}>
							<Image src={logo} as={Link} to="/home" alt="logo" />
						</GridColumn>
						<GridColumn className="search-field" verticalAlign="middle" width={7}>
							<SearchInput/>
						</GridColumn>
						<GridColumn verticalAlign="middle" width={2}>
							<Dropdown trigger={<Image avatar src={this.state.user.profilePicture} />} className="top-navigation-dropdown">
								<Dropdown.Menu direction="left">
									<Dropdown.Item icon="film" as={Link} to="/home" text="Browse All" />
									<Dropdown.Item icon="bookmark" as={Link} to="/mylists" text="My Lists" />
									<Dropdown.Item icon="user" as={Link} to="/profile" text="My Profile" />
									<DropdownDivider />
									<Dropdown.Item icon="log out" text="Logout" onClick={this.logOut} />
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