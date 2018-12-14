import React, { Component } from 'react';
import { Dropdown, Image, Grid, GridColumn, DropdownDivider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { baseUrl } from "../_helpers/variable";
import logo from "../img/Logo.png";
import '../css/navbar.css';
import '../css/responsive/navbar.css';

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
						<GridColumn className={'website-title col-lg-7 col-md-5 col-sm-5 col-xs-12'} centered>
							<Image src={logo} as={Link} to="/home" alt="logo" className={'website-logo'} />
						</GridColumn>
						<GridColumn className={"search-field col-xl-4 col-lg-3 col-md-5 col-sm-4 col-xs-6"} verticalAlign="middle">
							<SearchInput/>
						</GridColumn>
						<GridColumn verticalAlign="middle" className={'col-xl-1 col-lg-2 col-md-2 col-sm-2 col-xs-6'}>
							<Dropdown trigger={<Image avatar src={this.state.user.profilePicture} />} className="top-navigation-dropdown profile-picture">
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