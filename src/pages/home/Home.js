import React from "react";
import "./Home.scss";

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			users: [],
			items: {},
			showModal: false,
			userDetails:{}
		};
	}

	getListOfUsers = () => {
		fetch(`https://api.github.com/search/users?q=tom`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					users: res.items
				});
			})
			.catch(e => Promise.reject(e));
	};
	componentDidMount() {
		this.getListOfUsers();
	}
	render() {
		const searchGitHubUserByName = name => {
			return fetch(`https://api.github.com/search/users?q=${name}`)
				.then(res => res.json())
				.catch(e => Promise.reject(e));
		};

		const handleGetUserDetail = (name) => {
			showModal()
			getUserDetails(name).then(res => {
				this.setState({userDetails: res})
			})
		};

		const getUserDetails = name => {
			return fetch(`https://api.github.com/users/${name}`)
			.then(res => res.json())
			.catch(e => Promise.reject(e));
		};

		const highToLowSorting = () => {
			const sortedUsers = [ ...this.state.users ];
			sortedUsers.sort((a, b) => {
				return a.score - b.score;
			});
			this.setState({ users: sortedUsers });
		};

		const showModal = () => {
			this.setState({ showModal: true });
		};

		const hideModal = () => {
			this.setState({ showModal: false });
			this.setState({userDetails: {}})
		};

		const lowToHighSOrting = () => {
			const sortedUsers = [ ...this.state.users ];
			sortedUsers.sort((a, b) => {
				return b.score - a.score;
			});
			this.setState({ users: sortedUsers });
		};

		return (
			<div className="homepage-wrapper">
				<div className="sort-wrapper">
					<div className="label">Sort By Score:</div>
					<div className="sort" onClick={highToLowSorting}>High To Low</div>
					<div className="sort" onClick={lowToHighSOrting}>Low To High</div>
				</div>
				<div className="home">
					{this.state.users.length
						? this.state.users.map(user => (
								<div key={user.id} className="users-wrapper" onClick={() => handleGetUserDetail(user.login)} >
									<img src={user.avatar_url} />
									<div className="info">
										<p>{user.login} </p>
										<p>{user.score.toFixed(2)}</p>
									</div>
								</div>
							))
						: null}
				</div>
				{this.state.showModal ? <div className="modal-wrapper">
					<div className="modal">
						<div className="close" onClick={hideModal}>X</div>
						<div className="modal-info">
						<p>Public Repos: {this.state.userDetails.public_repos}</p>
						<p>follower: {this.state.userDetails.followers}</p>
						<p>following: {this.state.userDetails.following}</p>
						<p>Created At : {this.state.userDetails.created_at}</p>
						{this.state.userDetails.site_admin ? <p>admin</p> : null}

						</div>
					</div>
				</div> : null}
			</div>
		);
	}
}

export default Homepage;