import React from 'react';
import {Tab, Nav, Row, Col, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';

import KeyValueRenderer from './key-value-renderer'
import BodyEditor from './bodyEditor';

class RequestPane extends React.Component {
    constructor(props) {
		super(props);
		
		this.state ={
            dropdownTitle:"body"
		}
	}
    updateQuery = (pairs)=> {
        this.updateURL(pairs)
		this.props.updateQueryParams(pairs);
    }
    updateURL = (pairs) => {
        let inputUrl = this.props.requestObject.url;
        if(inputUrl) {
            if(inputUrl.includes('?')){
                inputUrl  = inputUrl.substring(0,inputUrl.indexOf('?'));
            }
            const url = new URL(inputUrl);
            const params = new URLSearchParams(url.search);
            
            for(var i in pairs){
                params.append(pairs[i].name, pairs[i].value);
            }
            let newURL = params.toString() ? (url+"?"+decodeURIComponent(params.toString())) : url;
            this.props.updateURL(newURL);
        }
    }
    updateHeaders = (pairs) => {
        this.props.updateHeaders(pairs);
    }
    setContentTypeHeaders = (pairs) => {
        var hasContentType = false;
        var headers = [];
        if(this.props.requestObject.headers.length){
            console.log("if")
            headers = this.props.requestObject.headers;
            for (var i = 0; i < headers.length; ++i) {
                if(headers[i].name === "Content-Type"){
                    headers[i].value = pairs.value;
                    hasContentType = true;
                }
            }  
            if(hasContentType) {    
                this.props.updateHeaders(headers)
                return;
            } 
        } 
        headers.push(pairs);
        this.props.updateHeaders(headers)
        
        
    }
    handleSelect = (evt) => {
        var pairs = [];
        switch(evt) {
            case 'MultipartForm':
                pairs = {
                    name:'Content-Type',
                    value:'multipart/form-data'
                }
                this.setContentTypeHeaders(pairs)
                this.setState({dropdownTitle:"Multipart Form"})
                break;
            case 'FormURLEncoded':
                pairs = {
                    name:'Content-Type',
                    value:'application/x-www-form-urlencoded'
                }
                this.setContentTypeHeaders(pairs)
                this.setState({dropdownTitle:"Form"})
                break;
            case 'JSON':
                pairs = {
                    name:'Content-Type',
                    value:'application/json'
                }
                this.setContentTypeHeaders(pairs)
                this.setState({dropdownTitle:"JSON"})
                break;
            case 'XML':
                pairs = {
                    name:'Content-Type',
                    value:'application/xml'
                }
                this.setContentTypeHeaders(pairs)
                this.setState({dropdownTitle:"XML"})
                break;
            default :
                break;
        }
    }
    render() {
      return (
        <div className="flex-column flex-column-request-view">
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={12}>
                    <Nav bsStyle="tabs">
                        <NavDropdown eventKey="Body" title={this.state.dropdownTitle} onSelect={this.handleSelect} >
                            <MenuItem eventKey="MultipartForm">Multipart Form</MenuItem>
                            <MenuItem eventKey="FormURLEncoded">Form URL Encoded</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="JSON">JSON</MenuItem>
                            <MenuItem eventKey="XML">XML</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey="Headers">Headers</NavItem>
                        <NavItem eventKey="Query">Query</NavItem>
                    </Nav>
                    </Col>
                    <Col sm={12}>
                    <Tab.Content animation>
                        <Tab.Pane eventKey="Headers">
                            <KeyValueRenderer data={this.props.requestObject.headers} updateStore={this.updateHeaders}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Query">
                            <KeyValueRenderer data={this.props.requestObject.queryParams} updateStore={this.updateQuery}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="MultipartForm">Multipart Form content</Tab.Pane>
                        <Tab.Pane eventKey="FormURLEncoded">Form URL Encoded content</Tab.Pane>
                        <Tab.Pane eventKey="JSON">
                            <BodyEditor mode = {"javascript"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="XML" >
                            <BodyEditor mode = {"xml"} />
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
        
      );
    }
  }
const mapStateToProps = (state) => {
	return {
		requestObject: state.request
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		updateQueryParams : (queryString) =>{
			const action = { type: "UPDATE_QUERY_PARAM", pairs:queryString}
			dispatch(action)
        },
        updateURL: (inputUrl) => {
			const action = { type: "URL_CHANGE", text: inputUrl }
			dispatch(action)
        },
        updateHeaders : (headers) => {
            const action = { type: "UPDATE_HEADERS", pairs:headers}
			dispatch(action)
        }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestPane); 