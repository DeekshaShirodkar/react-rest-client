import React from 'react';


class KeyValueRenderer extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
            pairs: [{'name':'','value': '', 'type':'text', 'path':''}],
        };
        this.textInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.data!== prevProps.data) {
           this.setState({ pairs:this.props.data})
        }
    }
    createUI(){
        return this.state.pairs.map((el, i) => 
            <div key={i}>
               <input type="text" value={el.name||''} placeholder="name" onChange={this.handleNameChange.bind(this, i)}/>
               <input type={el.type||"text"} value={el.value||''} placeholder="value" onChange={this.handleValueChange.bind(this, i)}/>
               <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
               <input type='button' value='toggle' onClick={this.toggleValueType.bind(this,i)} style={{visibility: this.props.isMultipartForm ? 'visible' : 'hidden' }} />
            </div>          
        )
     }

     toggleValueType = (i,event) =>{
        let pairs = [...this.state.pairs];
        pairs[i].type = pairs[i].type === 'text'? 'file' : 'text' ;
        this.setState({pairs});
     }
     handleNameChange = (i, event) => {
         let pairs = [...this.state.pairs];
         pairs[i].name = event.target.value;
         this.setState({pairs});
         this.props.updateStore(pairs);
         
     }
     handleValueChange = (i, event) => {
        let pairs = [...this.state.pairs];
        if(event.target.type === 'file') {
            pairs[i].path =  event.target.files[0].path;
            console.log( event.target.files )
            pairs[i].value =  event.target.value;
        } else {
            pairs[i].value = event.target.value;
        }
        console.log(pairs)
        this.setState({ pairs });
        this.props.updateStore(pairs);
     }
    
     addClick = () => {
        this.setState(prevState => ({ pairs: [...prevState.pairs, {name:'',value:'',type: 'text',path:''}]}))
    }

    removeClick = (i) => {
        let pairs = [...this.state.pairs];
        pairs.splice(i,1);
        this.setState({ pairs });
        this.props.updateStore(pairs);
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