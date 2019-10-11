import { Component } from 'react';

interface ErrorCatcherState {
	hasError: boolean;
}

export class ErrorCatcher extends Component<{}, ErrorCatcherState> {
	state = {
		hasError: false
	};

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		return this.state.hasError ? 'Ooops, error occured!' : this.props.children;
	}
}
