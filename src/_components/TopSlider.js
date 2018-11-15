import React, { Component } from 'react'
import { Button, Menu, Sidebar, Icon } from 'semantic-ui-react'
import axios from 'axios'
import MaterialIcon from 'react-google-material-icons'

export default class SidebarExampleSidebar extends Component {
    state = {
        visible: false,
        genres: []
    }

    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=e0338266d7945597731b014d7e806075&language=en-US')
            .then(res => {
                this.setState({ genres: res.data.genres });
                console.log(this.state);
            })
            .catch(error => {
                console.log(error);
            });


    }

    render() {
        const { visible } = this.state

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
                        <Menu.Item as='a'>{genre.name}</Menu.Item>
                    )}
                </Sidebar>
            </div>
        )
    }
}