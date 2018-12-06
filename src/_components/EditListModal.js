import React, { Component } from 'react';
import axios from 'axios';

import { Button, Icon, Modal, Input } from 'semantic-ui-react';

import { ourApiUrl } from '../_helpers/variable';

class EditListModal extends Component {
    constructor(props) {
        super(props);
        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            userId: userId,
            myListId: this.props.myListId,
            name: this.props.myListName
        }
    }

    saveList(event) {

        axios({
            data: {
                myListId: this.state.myListId,
                name: this.inputListName.inputRef.value
            },
            method: 'put',
            url: ourApiUrl + 'mylist/update'
        })
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { myListName, disabled } = this.props;
        console.log(this.state);

        return (
            <Modal
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
                    <Input
                        fluid
                        defaultValue={myListName}
                        ref={input => this.inputListName = input} />
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