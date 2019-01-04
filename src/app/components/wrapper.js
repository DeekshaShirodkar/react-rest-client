import React from 'react';
import { connect } from 'react-redux';
import url from 'url';
import UrlBar from './url-bar.js';
import ResponseView from './response-view.js';
import axios from 'axios';
import RequestPane from './request-pane.js';
import { queryStringToJSON } from '../utils/request-utils.js';

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		
		this.state ={
            response: []
		}
	}
	getResponse = () => {
		let body = `${JSON.stringify(this.props.requestObject.data)}`;
		let headers = `${JSON.stringify(this.props.requestObject.headers)}`
		let config = {
			url: `${this.props.requestObject.url}`,
			method: `${this.props.requestObject.method}`,
			headers: JSON.parse(headers),
			data: JSON.parse(body),
			json: true

		}
		console.log(config)
		axios(config)
			.then((response) => {
			console.log(response)
			this.setState({ response: response })
		  });
		

	}

	handleUrlChange = (e) => {
		let inputUrl = e.target.value;
		if(inputUrl.includes('?')){
			let parsedUrl = url.parse(inputUrl)
			let queryString = queryStringToJSON(parsedUrl)
			this.props.updateQueryParams(queryString)
		}
		this.props.updateURL(inputUrl);
	}
	render() {
		return (
			<div className="Container">
			    <UrlBar {...this.props} fetchData={this.getResponse} handleUrlChange={this.handleUrlChange} handleMethodChange={this.props.handleMethodChange}/>
				<RequestPane {...this.props} />
			    <ResponseView  response = {this.state.response}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		requestObject: state.request
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (inputUrl) => {
			const action = { type: "URL_CHANGE", text: inputUrl }
			dispatch(action)
		},
		handleMethodChange: (value) => {
			const action = { type: "CHANGE_METHOD", text: value }
			dispatch(action)
		},
		updateQueryParams : (queryString) =>{
			const action = { type: "UPDATE_QUERY_PARAM", pairs:queryString}
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
