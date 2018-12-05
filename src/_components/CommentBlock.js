import React, {Component} from 'react';
import '../css/CommentBlock.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class CommentBlock extends Component {

	constructor(props) {

		super(props)

		this.addComment = this.addComment.bind(this)
	}

	addComment = () => {

		document.getElementById("ui-state-default").innerHTML = document.getElementById("userComment").value;
	}

	render() {
		return (
			<div className="container">
				<div className="col-lg-6 col-sm-6 text-center">
					<div className="well">
						<h4>What is on your mind?</h4>
						<div className="input-group">
							<input type="text" id="userComment" className={"form-control input-sm chat-input"} placeholder="Write your message here..."/>
							<span className={"input-group-btn"} onClick={this.addComment}>
								<a href="#" className={"btn btn-primary btn-sm"}>
									<span className={"glyphicon glyphicon-comment"}></span> Add Comment
								</a>
							</span>
						</div>
						<hr data-brackets-id="12673"/>
						<ul data-brackets-id="12674" id="sortable" className={"list-unstyled ui-sortable"}>
							<strong className={"pull-left primary-font"}>James</strong>
							<small className={"pull-right text-muted"}>
								<span className={"glyphicon glyphicon-time"}></span>7 mins ago
							</small>
							<li className={"ui-state-default"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
							<strong className={"pull-left primary-font"}>Taylor</strong>
							<small className={"pull-right text-muted"}>
								<span className={"glyphicon glyphicon-time"}></span>14 mins ago
							</small>
							<li className={"ui-state-default"}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default CommentBlock;