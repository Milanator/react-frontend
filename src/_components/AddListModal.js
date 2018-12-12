import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

import { Button, Modal, Input } from 'semantic-ui-react';

import { ourApiUrl } from '../_helpers/variable';

import FlashMessage from '../_components/FlashMessage';

class AddListModal extends Component {
    constructor(props) {
        super(props);
        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            userId: userId
        }
    }

    saveList(event) {
        if (this.inputListName.inputRef.value == "") {
            this.setState({flashMessage: true, flashMessageText: 'Please enter a List Name'});
        } else if (this.inputListDescription.inputRef.value == "") {
            this.setState({flashMessage: true, flashMessageText: 'Please enter a List Description'});
        } else {
            axios.post(ourApiUrl + 'mylist/create', {
                userId: this.state.userId,
                name: this.inputListName.inputRef.value,
                description: this.inputListDescription.inputRef.value,
                first: 0,
            })
                .then(function (response) {
                    console.log(response);
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {

        return (
            <div className="mylists-button-panel">
                <Modal
                    onClose={() => this.setState({flashMessage: false})}
                    trigger={
                        <Button
                            color='blue'
                            icon='plus'
                            labelPosition='left'
                            content='Add List' />
                    }
                    size="tiny"
                    id="add-list-modal"
                    centered={false}>

                    <Modal.Header>Create a New List</Modal.Header>

                    <Modal.Content>
                        {this.state.flashMessage &&
                            <FlashMessage message={this.state.flashMessageText} type={'danger'} />
                        }
                        <Input
                            className="add-list-input-field"
                            fluid
                            label="Name"
                            placeholder="Enter a Name for Your List"
                            ref={input => this.inputListName = input} />
                        <Input
                            fluid
                            label="Description"
                            placeholder="Enter a Description for Your List"
                            ref={input => this.inputListDescription = input} />
                    </Modal.Content>

                    <Modal.Actions>
                        <Button
                            color="blue"
                            icon="checkmark"
                            labelPosition="right"
                            content="Save"
                            onClick={this.saveList.bind(this)} />
                    </Modal.Actions>

                </Modal>
            </div>
        )
    }
}

export default AddListModal