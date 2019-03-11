import React from 'react';
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/autorefresh'


require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');


class BodyEditor extends React.Component {
    constructor(props) {
		super(props);
		
		this.state ={
            code: "",
			mode: 'javascript',
		}
    }
    componentDidMount() {
        var cm = this.refs.editor.getCodeMirror()
        cm.setSize(null,200)
    }
	updateCode = (newCode) => {
		this.setState({
			code: newCode
		});
	}
	render () {
		var options = {
			lineNumbers: true,
            mode: this.props.mode,
            autoRefresh: 2000
		};
		return (
			<div className="x-body-containter">
				<CodeMirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
			</div>
		);
	}
    
}

export default BodyEditor;