import React, { Component } from 'react';
import logo from "../img/Logo.png";
import { Dropdown, Image, Grid, GridColumn } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { baseUrl } from "../_helpers/variable";
import '../css/navbar.css';

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
					<Grid columns={3}>
						<GridColumn>
							<Image src={logo} as={Link} to="/browseAll" alt="logo"/>
						</GridColumn>
						<GridColumn>
							{/* insert search field here */}
						</GridColumn>
						<GridColumn>
							<Dropdown trigger={<Image avatar src={this.state.user.profilePicture} />} className="top-navigation-dropdown">
								<Dropdown.Menu position="right">
									<Dropdown.Item as={Link} to="/mywatchlist" text="My Movies" />
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