import React from 'react';
import { connect } from 'react-redux';
class ResponseView extends React.Component {
	
	render () {
		const responseViewStyle = {
			border:'1px ridge black',
			margin :'10px'
		};
			
		return (
			
			<div className="flex-column flex-column-response-view x-response" >
				 <div className="x-badge bg-success" display="inline-flex" >{this.props.responseObject.status}</div>
				 <div className="x-badge bg-default" display="inline-flex" >{this.props.responseObject.statusText}</div>
				 <div className="x-badge bg-default" display="inline-flex" >{this.props.responseObject.timeTaken}</div>
				<pre style ={responseViewStyle}>{JSON.stringify(this.props.responseObject.data, null, 2)}</pre>
			</div>
		)
		
		
	}
}
const mapStateToProps = (state) => {
	return {
		responseObject: state.response
	}
}
export default connect(mapStateToProps) (ResponseView);
