import React from 'react';
import * as constants from '../common/constants';
import SendButton from './send-button.js'
import {FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Col} from 'react-bootstrap';

class UrlBar extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			methods:constants.HTTP_METHODS
		};

		this.handleUrlChange = this.handleUrlChange.bind(this);
		this.handleMethodChange = this.handleMethodChange.bind(this);
	}
	handleUrlChange = (e) => {
		this.props.handleUrlChange(e);
	}
	
	handleMethodChange = (value)=> {
		this.props.handleMethodChange(value);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.requestObject.url !== this.props.requestObject.url) {
		  this.setInputValue(nextProps.requestObject.url)
		}
	}
	setInputValue(val) {
		this.refs.urlInput.value = val
	}
	render() {
		const {
			fetchData,
			requestObject
		} = this.props;

		return (
			<form>
				<FormGroup>
					<Col xs={9}>
						<InputGroup>
							<DropdownButton
								componentClass={InputGroup.Button}
								id="input-dropdown-addon"
								title={requestObject.method}
							>
								{constants.HTTP_METHODS.map(method => (
									<MenuItem  key={method} onSelect ={this.handleMethodChange} eventKey={method}>{method}</MenuItem>
								))}
							</DropdownButton>
							<FormControl type="text"  ref="urlInput" value={this.props.requestObject.url} onChange = {this.handleUrlChange} />
						</InputGroup>
					</Col>
					<SendButton fetchData = {fetchData} />
 				 </FormGroup>
			</form>
		)
	}
}



export default UrlBar;