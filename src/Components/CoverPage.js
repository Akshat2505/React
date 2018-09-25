import React, { Component } from 'react';
import CoverOptions from './Coveroptions';
import ExtraOptions from './extraOptions';
import CustomerDetails from './CustomerDetails';




class CoverPage extends Component {
  constructor(props) {
    super(props)
    {
      this.state = {
      
          isHidden : false,
          CoverOptionData: '',
          ExtraOptionData: '',
         //redirect : false
      }
    }
  }

  

  ChangeState = ( CoverOptionData) =>{ this.setState({ CoverOptionData :  CoverOptionData}), () => { this.props.onStateChange(this.state)}    
 
  }

  ChangeEState = ( ExtraOptionData) =>{ this.setState({ ExtraOptionData :  ExtraOptionData}), () => { this.props.onStateChange(this.state)}    
 
}

  handleSubmit = (event) => {
    this.setState({isHidden: !this.state.isHidden}, () => {}) 
    
    console.log(this.state.CoverOptionData)
    console.log(this.state.ExtraOptionData)
    
  
  event.preventDefault();
}



  render() {
    return (
      <div>
      
          <article>
        
          {!this.state.isHidden && <CoverOptions onStateChange={this.ChangeState}/>}
          { !this.state.isHidden && <ExtraOptions  onStateChange={this.ChangeEState}/> }
  
         </article>
        
        <div>
         
            <input type="button" value="Continue" onClick={this.handleSubmit} className={"button full-submit next-step primary ra" + (this.state.isHidden===true ? ' hidden' : ''  )}/>
            <div>
           {this.state.isHidden && <CustomerDetails />}
        </div>  
            
            </div>
        </div>
    )    
  }
}

export default CoverPage;
