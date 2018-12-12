import React, {Component} from 'react';
import '../css/CommentBlock.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {ourApiUrl,movieDbDomain} from "../_helpers/variable";
import moment from 'moment'
import $ from 'jquery'

let apiUrl = movieDbDomain + 'movie';

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
		this.moreComments = this.moreComments.bind(this)
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
			let commentTemplate = this.commentTemplate(userName,content)

			if(addButton.hasClass('highlight'))
				addButton.removeClass('highlight')

			input.value = ''
			input.focus()
			addButton.addClass('highlight')

			comments.prepend(commentTemplate)

		}).catch(err => {
			console.log(err);
		})
	}

	moreComments = (event) => {

		event.preventDefault()

		let {DBoffest,movieId} = this.state;
		let comments = $('.comments')
		DBoffest += 3
		this.setState({DBoffest:DBoffest})

		// get next 5 comments
		axios.get(ourApiUrl + "comment/movie/"+movieId+"/"+DBoffest).then((res) => {
			
			let nextComments = res.data;
			let commentsTemplate = '';

			if( nextComments.length < 3 )
				$('.more-comments').text('Nothing else').css('color','black')

			nextComments.forEach((comment) => {
				
				commentsTemplate += this.commentTemplate(comment.name,comment.content,comment.created_at)
			});

			comments.append(commentsTemplate)

		}).catch((error) => { console.log( error ); })
	}

	commentTemplate = (userName,content,createdAt=null) => {

		return `
					<ul class="list-unstyled ui-sortable comment highlight">
						<strong class="primary-font user-name">${userName}</strong>
						<small class="text-muted created-at">
							<span class="glyphicon glyphicon-time">${createdAt ? moment(createdAt).format('DD.MM.YY h:mma') : moment().format('DD.MM.YY h:mma')}</span>
						</small>
						<li>
							<p class='content'>${content}</p>
						</li>
					</ul>
				`
	}

	render() {

		const {profilePicture,comments,DBoffest,movieId} = this.state

		return (
			<div className=" comment-block">
				<div>
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
							{ comments.length > 2 && (
								<div className={'more-comments'}>
									<a href={ourApiUrl+'comment/movie/'+movieId+'/'+DBoffest} onClick={this.moreComments}>More comments</a>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default CommentBlock;