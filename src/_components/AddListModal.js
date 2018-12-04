import React, { Component } from 'react';
import axios from 'axios';

import { Button, Modal, Input } from 'semantic-ui-react';

import { ourApiUrl } from '../_helpers/variable';

class AddListModal extends Component {
    constructor(props) {
        super(props);
        let userId = atob(JSON.parse(localStorage.getItem('user')).id);

        this.state = {
            userId: userId
        }
    }

    saveList(event) {
        console.log(this.inputListName.inputRef.value);

        axios.post(ourApiUrl + 'mylist/create', {
            userId: this.state.userId,
            name: this.inputListName.inputRef.value,
            first: 0,
          })
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });

            //body.userId,body.name,body.first,body.shortcut

    }

    render() {

        return (
            <div className="mylists-button-panel">
                <Modal
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
                        <Input
                            fluid
                            placeholder="Enter a Name for Your List"
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
            </div>
        )
    }
}

export default AddListModal