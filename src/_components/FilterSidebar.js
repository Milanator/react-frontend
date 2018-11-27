import React, { Component } from 'react'
import { Button, Menu, Sidebar, Icon } from 'semantic-ui-react'
import axios from 'axios'

export default class FilterSidebar extends Component {

	constructor(props){

		super(props);

		this.state = {
			visible: false,
			genres: this.props.genres
		}

		this.handleShowClick = () => this.setState({ visible: true })
		this.handleSidebarHide = () => this.setState({ visible: false })
	}

    render() {
        const { visible } = this.state;

        return (
            <div>
                <div className="filter-genres">
                <Button basic icon labelPosition='left' disabled={visible} onClick={this.handleShowClick}>
                    Genres
                    <Icon name='filter' />
                </Button>
                </div>
                

                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={visible}
                    width='thin'
                >
                    {this.state.genres.map(genre =>
                        <Menu.Item as='a' key={genre.id}>{genre.name}</Menu.Item>
                    )}
                </Sidebar>
            </div>
        )
    }
}