import React, {Component} from 'react';
import TopNavigation from './../_components/TopNavigation';

class Home extends Component {
	render() {
		return (
			<div>
				<TopNavigation />
				<div className="container">
					Home
				</div>
			</div>
		);
	}
}

export default Home;