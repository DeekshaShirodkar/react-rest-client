import React from 'react';

class DropdownItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick = (e) => {
		 this.props.sendData(e.target.getAttribute('value')); 
	}
	render() {
		const {
			a
		} = this.props;
		return(
			<div>
				<a className="dropdown-item" href="#" key={a} onClick ={this.handleClick} value={a}>{a}</a>
			</div>		
		)
	}
}

export default DropdownItem;
