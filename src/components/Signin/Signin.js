import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions, envEndpoint } from '../../utils/utils';
import Spinner from '../../utils/Spinner/Spinner';

class Signin extends React.Component {
	state = {
		signInEmail: '',
		signInPassword: '',
		isLoading: false
	}

	componentWillUnmount = () => {
		this.setState({ isLoading: false })
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value })
	}

	onSubmitSignIn = () => {
		const { signInEmail, signInPassword } = this.state;
		let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signInEmail)
		if (!validEmail) {
			return toast.error('Wrong format of email!', toastOptions);
		} else if (!signInPassword) {
			return toast.error('Password cannot be empty!', toastOptions);
		} else {
			this.signInUser();
		}
	}

	signInUser = () => {
		let url;
		this.setState({ isLoading: true })
		fetch(`${envEndpoint(url)}signin`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => {
				if (response.status === 401) {
					this.setState({ isLoading: false })
					return toast.error('Invalid username or password!', toastOptions);
				} else if (response.status === 400 || response.status === 404) {
					this.setState({ isLoading: false })
					return toast.error('Error when trying to sign in!', toastOptions);
				}
				return response.json()
			})
			.then(user => {
				if (user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange('home');
					toast.success('Successfully signed in!', toastOptions);
				}
			})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				{this.state.isLoading ? <Spinner /> : null}
				<ToastContainer />
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={this.onSubmitSignIn}
								className="z-1 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"
							/>
						</div>
						<p className='f6'>or</p>
						<div className="lh-copy mt3">
							<p onClick={() => onRouteChange('register')} className="f6 fw6 underline link dim black db pointer">Register</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Signin;