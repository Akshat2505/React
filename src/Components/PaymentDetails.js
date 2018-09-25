import React, { Component } from 'react';
import '../styles/styles.css';
import axios from 'axios';

class PaymentDetails extends Component {
    constructor() {
        super()
        {
            this.state = {
                Payment: '',
                PaymentOptionsData: []
            }
        }
    }
    handleChange = (event) => {
        this.setState({
            Payment: event.target.value
        }, () => { this.props.onStateChange(this.state) })
    }

    componentDidMount = () => {
        axios.get(`http://localhost:3000/PaymentOptions.json`).then(response => {

            console.log("response.data ", response)
            this.setState({ PaymentOptionsData: response.data })


        })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }

    RenderPayment = () => {
      
        return this.state.PaymentOptionsData.PaymentType.map((item, itr) => {
            return (
                <div key={itr} className="radio-field block" tabIndex="0" role="radio">
                    <div className="stylish-ds" data-type="radio">
                        <span className={this.state.Payment === item.Type ? 'checked' : ''}>
                            <span className="ico">
                            </span>
                        </span>
                        <input type="radio" onChange={this.handleChange} value={item.Type} id={item.Type} className="payment-frequency" data-yearly-from-account="" name="How would you like to pay?" data-payment-frequency="Yearly" checked="" data-transfer-model="How would you like to pay?" tabIndex="-1" />
                    </div>
                    <label htmlFor={item.Type} className="checked in-focus">{item.Type}</label>
                </div>

            )
        })
    }

    render() {
        if (this.state.PaymentOptionsData.length == 0) {
            return <div></div>
        }
        return (
            <div>
                <article className="payment-options form-module wrapper white-bg-colour shadow-secondary cf sales-journey" data-scripts-loaded="true" data-scripts="payment-options" data-block-id="8ef297e2-fc9f-4574-b7ad-3e786e47b161" data-namespace="paymentOptionsBlock" data-component-name="PaymentOptionsBlock">
                    <h1>Choose your payment option</h1>
                    <form className="form-section cf stylish-form" data-stylish-form="set" data-batch-validation="true" data-di-form-track="">
                        <h6>How would you like to pay?</h6>
                        <div className="form-field cf" role="radiogroup">
                            {this.RenderPayment()}
                        </div>
                    </form>
                </article>
            </div>
        )
    }
}
export default PaymentDetails;