import React from 'react';
import { connect } from 'react-redux';
import url from 'url';
import UrlBar from './url-bar.js';
import ResponseView from './response-view.js';
import axios from 'axios';
import RequestPane from './request-pane.js';
import { queryStringToJSON } from '../utils/request-utils.js';
import * as fs from 'fs';
import FormData, {getHeaders} from 'form-data'

class Wrapper extends React.Component {
	
	getHeaders = (headers) => {
		let header = {};
		headers.forEach(element => {
			header[element.name] = element.value
		});
		return header;
	}
	getBodyData = () => {
		let contentType = this.props.requestObject.headers.find(function (item) {
			return item.name === "Content-Type"
		})
		console.log(contentType)
		if(contentType.value === "application/x-www-form-urlencoded") {
			let body = {}
		    this.props.requestObject.urlEncodedForm.forEach(formData => {
				if(formData) {
					body[formData.name] = formData.value
				}	
			})
			return body;
		} else if (contentType.value === "multipart/form-data") {
			console.log("multipart")
			const formData = new FormData();
			for (var i in this.props.requestObject.multipartForm) {
				if(this.props.requestObject.multipartForm[i].type === "text"){
					formData.append(this.props.requestObject.multipartForm[i].name, this.props.requestObject.multipartForm[i].value);
				} else {
					console.log("here")
					console.log(this.props.requestObject.multipartForm[i])
					formData.append(this.props.requestObject.multipartForm[i].name, this.props.requestObject.multipartForm[i].path);
					console.log(formData);
				}
			}
			formData.append("imgUploader", "D:\\banking-app-kendo\\src\\resources\\images\\veriskLogo.png");
			return formData;
		} else {
			return JSON.parse(JSON.stringify(this.props.requestObject.rawBody))
		}
	}
	getResponse = () => {
		let body = this.props.requestObject.method === "GET"? "" : this.getBodyData();
		let headers = this.getHeaders(this.props.requestObject.headers);
		let config = {
			url: `${this.props.requestObject.url}`,
			method: `${this.props.requestObject.method}`,
			headers: headers,
			data: body,
			json: true
		}
		console.log(config)
		var startTime = (new Date()).getTime();
		axios(config)
			.then((response) => {
				let timeTaken = (new Date()).getTime() - startTime;
				console.log(timeTaken)
			console.log(response)
				this.setResponse(response,timeTaken);
		  });
		

	}
	setResponse = (response,timeTaken) => {
		let res = {};
		res.data = response.data;
		res.status = response.status;
		res.statusText = response.statusText;
		res.timeTaken = timeTaken;
		this.props.updateResponseObject(res);
	}
	handleUrlChange = (e) => {
		let inputUrl = e.target.value;
		if(inputUrl.includes('?')){
			let parsedUrl = url.parse(inputUrl)
			let queryString = queryStringToJSON(parsedUrl)
			this.props.updateQueryParams(queryString)
		} else {
			this.props.updateQueryParams([{
				name:'',
				value:''
			}])
		}
		this.props.updateURL(inputUrl);
	}
	render() {
		return (
			<div className="container main-container">
			    <UrlBar  {...this.props} fetchData={this.getResponse} handleUrlChange={this.handleUrlChange} handleMethodChange={this.props.handleMethodChange}/>
				<RequestPane  {...this.props} />
			    <ResponseView />
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
			const action = { type: "UPDATE_QUERY_PARAM", pairs:queryString }
			dispatch(action)
		},
		updateResponseObject : (res) => {
			console.log("updateResponseObject")
			const action = { type: "UPDATE_RESPONSE_OBJECT", text: res}
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
