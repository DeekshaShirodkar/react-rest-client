import React from 'react';

class ResponseView extends React.Component {
	
	render () {
		const {
			response
		} = this.props;
		const responseViewStyle = {
			border:'1px ridge black',
			margin :'10px'
		};
			
		return (
			
			<div>
				<pre style ={responseViewStyle}>{JSON.stringify(response, null, 2)}</pre>
			</div>
		)
		
		
	}
}

export default ResponseView;
