import React, { Component } from 'react';
import '../styles/styles.css';
import CoverDetails from './CoverDetails';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import AdditonalDetails from './AdditionalDetails';
import PaymentDetails from './PaymentDetails';
import CoverPage from './CoverPage';
import ExtraOptions from './extraOptions';


class CustomerDetails extends Component{
    constructor(props)
    {
        super(props)
        {
            this.state={
                // isHidden : false,
                // ExtraOptionData: '',
                CoverDetailsData :'',
                PersonalDetailsData :'',
                ContactDetailsData : '',
                AdditionalDetailsData: '',
                PaymentDetailsData : ''
            }
        }
    }
    
// ChangeEState = ( ExtraOptionData) =>{ this.setState({ ExtraOptionData :  ExtraOptionData}), () => { }
//   }

  ChangeCDState = ( CoverDetailsData) =>{ this.setState({ CoverDetailsData :  CoverDetailsData}), () => { }
  }
  ChangePDState = ( PersonalDetailsData) =>{ this.setState({ PersonalDetailsData :  PersonalDetailsData}), () => { }
  }
  ChangeCTState = (ContactDetailsData) => {this.setState({ContactDetailsData : ContactDetailsData}), () => {}
  }

  ChangeADState = (AdditionalDetailsData) => {this.setState({AdditionalDetailsData : AdditionalDetailsData}), () => {}
  }
  
  ChangePayState = (PaymentDetailsData) => {this.setState({PaymentDetailsData : PaymentDetailsData}), () => {}
  }
  
  handleSubmit = (event) => {
    console.log(this.state)
  }
    render()
    {
        return (
           
        <div>
            {/* {this.state.isHidden && <ExtraOptions onStateChange={this.ChangeEState} />} */}
            <CoverDetails onStateChange={this.ChangeCDState} />
            <br/>
            <PersonalDetails onStateChange={this.ChangePDState} />
            <br/>
            <ContactDetails onStateChange={this.ChangeCTState}/>
            <br/>
            <AdditonalDetails onStateChange={this.ChangeADState}/>
            <br/>
            <PaymentDetails onStateChange={this.ChangePayState}/>
            <br/>
            <input type="button" value="Continue" onClick={this.handleSubmit} className="button full-submit next-step primary ra" />
            
        </div> 
        )
    }
}


export default CustomerDetails;