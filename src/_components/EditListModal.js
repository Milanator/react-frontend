import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

import { Button, Icon, Modal, Input } from 'semantic-ui-react';

import { ourApiUrl } from '../_helpers/variable';

import FlashMessage from '../_components/FlashMessage';

class EditListModal extends Component {
    constructor(props) {
        super(props);
        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            userId: userId,
            myListId: this.props.myListId,
            name: this.props.myListName,
            myListDescription: this.props.myListDescription
        }
    }

    saveList(event) {
        if (this.inputListName.inputRef.value == "") {
            this.setState({ flashMessage: true, flashMessageText: 'Please enter a List Name' });
        } else if (this.inputListDescription.inputRef.value == "") {
            this.setState({ flashMessage: true, flashMessageText: 'Please enter a List Description' });
        } else {
            axios({
                data: {
                    myListId: this.state.myListId,
                    name: this.inputListName.inputRef.value,
                    description: this.inputListDescription.inputRef.value,
                },
                method: 'put',
                url: ourApiUrl + 'mylist/update'
            })
                .then(function (response) {
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {

        const { myListName, myListDescription, disabled } = this.props;

        return (
            <Modal
                onClose={() => this.setState({ flashMessage: false })}
                trigger={
                    <Button
                        icon
                        disabled={disabled}>
                        <Icon
                            name='pencil alternate'
                            className={'addToMyList blue-icon'} />
                    </Button>
                }
                size="tiny"
                id="add-list-modal"
                centered={false}>

                <Modal.Header>Edit the Name of Your List</Modal.Header>

                <Modal.Content>
                {this.state.flashMessage &&
                            <FlashMessage message={this.state.flashMessageText} type={'danger'} />
                        }
                    <Input
                        className="add-list-input-field"
                        fluid
                        label="Name"
                        defaultValue={myListName}
                        ref={input => this.inputListName = input} />
                    <Input
                        fluid
                        label="Description"
                        placeholder="Enter a Description for Your List"
                        defaultValue={myListDescription}
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
        )
    }
}

export default EditListModal