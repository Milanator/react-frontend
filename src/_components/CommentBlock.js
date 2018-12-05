import React, {Component} from 'react';
import '../css/CommentBlock.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {ourApiUrl} from "../_helpers/variable";
import moment from 'moment'
import $ from 'jquery'

class CommentBlock extends Component {

	constructor(props) {

		super(props)

		this.state = {
			userId: this.props.userId,
			movieId: this.props.movieId,
			userName: this.props.userName,
			profilePicture: this.props.profilePicture,
			comments: this.props.comments,
			DBoffest: this.props.DBoffest
		}

		this.addCommentToDB = this.addCommentToDB.bind(this)
	}

	addComment = (event) => {

		event.preventDefault();

		let input = document.getElementById('userComment')
		let inputValue = input.value

		if( inputValue !== '' )
			this.addCommentToDB(inputValue,input);
	}

	addCommentToDB = (content,input) => {

		const {userId, movieId, userName} = this.state;

		axios({
			url: ourApiUrl + 'comment/add',
			data: {
				userId: userId,
				movieId: movieId,
				content: content
			},
			method: 'post'
		}).then(() => {

			let comments = $('.comments')
			let addButton = $('#add-button')
			let commentTemplate = `
				<ul class="list-unstyled ui-sortable comment highlight">
					<strong class="primary-font user-name">${userName}</strong>
					<small class="text-muted created-at">
						<span class="glyphicon glyphicon-time">${moment().format('DD.MM.YY h:mma')}</span>
					</small>
					<li>
						<p class='content'>${content}</p>
					</li>
				</ul>
			`

			if(addButton.hasClass('highlight'))
				addButton.removeClass('highlight')

			input.value = ''
			input.focus()
			addButton.addClass('highlight')

			comments.append(commentTemplate)

		}).catch(err => {
			console.log(err);
		})
	}

	render() {

		const {profilePicture, comments} = this.state

		return (
			<div className="container comment-block">
				<div className="col-lg-6 col-lg-offset-3 col-sm-6 text-center">
					<div>
						<form action="#" onSubmit={this.addComment}>
							<h4>What do you think about film?</h4>
							<div className="input-group new-comment">
								<div className={'profile-picture'} style={{backgroundImage: 'url(' + profilePicture + ')'}}/>
								<textarea rows={1} id="userComment" className={"form-control input-sm chat-input"} placeholder="Write your thoughts here..."/>
								<span className={"input-group-btn"} onClick={this.addComment}>
								<a href="#" className={"btn btn-primary btn-sm"} id={'add-button'} role={"button"}>
									<span className={"glyphicon glyphicon-comment"}/>Add Comment
								</a>
							</span>
							</div>
							<hr/>
							<div className={'comments'}>
								{comments.map((comment, key) => (
									<ul className={"list-unstyled ui-sortable comment"}>
										<strong className={"primary-font user-name"}>{comment.name}</strong>
										<small className={"text-muted created-at"}>
											<span className={"glyphicon glyphicon-time"}/>{moment(comment.created_at).format('DD.MM.YY h:mma')}
										</small>
										<li>
											<p className={'content'}>
												{comment.content}
											</p>
										</li>
									</ul>
								))}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default CommentBlock;