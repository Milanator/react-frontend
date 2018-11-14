import React, { Component } from 'react';
import logo from "../Logo.png";
import { Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Login from '../Login.js';

class TopNavigation extends Component {
    render() {
        return (
            <div className="top-navigation">
                <Image src={logo} as={Link} to="/browse" alt="logo" />

                <Dropdown trigger={<Image avatar src={logo} />} className="top-navigation-dropdown">
                    <Dropdown.Menu position="right">
                        <Dropdown.Item as={Link} to="/mywatchlist" text="My Movies"/>                        
                        <Dropdown.Item as={Link} to="/logout" text="Logout" />
                    </Dropdown.Menu>
                </Dropdown>
            </div >
        );
    }
}

export default TopNavigation;