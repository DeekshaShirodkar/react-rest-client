import React from 'react';

class SendButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = () =>{
		this.props.fetchData();
	}
	
	render () {
		return (
			<button type="button" className="btn btn-primary"  onClick ={this.handleClick} >Send</button>
		)
	}
}

export default SendButton;
