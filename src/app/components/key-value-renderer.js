import React from 'react';


class KeyValueRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pairs: [{
                name: '',
                value: ''
            }]
        
            };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        console.log("componentdidupdate")
        if (this.props.requestObject.queryParams !== prevProps.requestObject.queryParams) {
           this.setState({ pairs:this.props.requestObject.queryParams })
        }
    }
    createUI(){
        console.log("createUI")
        return this.state.pairs.map((el, i) => 
            <div key={i}>
               <input type="text" value={el.name||''} placeholder="name" onChange={this.handleNameChange.bind(this, i)}/>
               <input type="text" value={el.value||''} placeholder="value" onChange={this.handleValueChange.bind(this, i)}/>
               <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
            </div>          
        )
     }
     handleNameChange = (i, event) => {
         let pairs = [...this.state.pairs];
         pairs[i].name = event.target.value;
         this.setState({pairs});
         console.log(this._reactInternalFiber.return.stateNode)
     }
     handleValueChange = (i, event) => {
        let pairs = [...this.state.pairs];
        pairs[i].value = event.target.value;
        this.setState({ pairs });
     }
    
     addClick = () => {
        this.setState(prevState => ({ pairs: [...prevState.pairs, {name:'',value:''}]}))
    }

    removeClick = (i) => {
        let pairs = [...this.state.pairs];
        pairs.splice(i,1);
        this.setState({ pairs });
    }
     handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
              {this.createUI()}        
              <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
          </form>
        );
    }
}

export default KeyValueRenderer;