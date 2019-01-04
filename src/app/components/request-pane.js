import React from 'react';
import {Tab, Nav, Row, Col, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import KeyValueRenderer from './key-value-renderer'
class RequestPane extends React.Component {
  
    render() {
      return (
        <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
            <Row className="clearfix">
                <Col sm={12}>
                <Nav bsStyle="tabs">
                    <NavDropdown eventKey="Body" title="Body" >
                        <MenuItem eventKey="Multipart Form">Multipart Form</MenuItem>
                        <MenuItem eventKey="Form URL Encoded">Form URL Encoded</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="JSON">JSON</MenuItem>
                        <MenuItem eventKey="XML">XML</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey="first">Headers</NavItem>
                    <NavItem eventKey="second">Query</NavItem>
                </Nav>
                </Col>
                <Col sm={12}>
                <Tab.Content animation>
                    <Tab.Pane eventKey="first">Headers content</Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <KeyValueRenderer {...this.props}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Multipart Form">Multipart Form content</Tab.Pane>
                    <Tab.Pane eventKey="Form URL Encoded">Form URL Encoded content</Tab.Pane>
                    <Tab.Pane eventKey="JSON">JSON content</Tab.Pane>
                    <Tab.Pane eventKey="XML">XML content</Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
    </Tab.Container>
      );
    }
  }
  
export default RequestPane;