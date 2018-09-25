import React, { Component } from 'react';
import '../styles/styles.css';
import axios from 'axios';

class ContactDetails extends Component {
    constructor() {
        super()
        {
            this.state = {
                address1: '',
                Postcode: '',
                Telephone: '',
                Email: '',
                ContactDetailsData: []
            }
        }
    }

    validators = {
        address1: (value) => {
            return value;
        },
        Postcode: (value) => {
            return value.match(/^[a-zA-Z0-9\s]+$/);

        },
        Telephone: (value) => {
            return value.match(/^[0-9]*$/);
        },
        Email: (value) => {
            return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        }
    }


    componentDidMount = () => {
        axios.get(`http://localhost:3000/ContactDetails.json`).then(response => {

            console.log("response.data ", response)
            this.setState({ ContactDetailsData: response.data })
            console.log(this.state.ContactDetailsData.TypeOfFields[0])
        })

            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }


    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (this.validators[name](value) || !value) {
            this.setState({ [name]: value },
                () => { this.props.onStateChange(this.state) });
        }
    }

    RenderAddress = () => {
        return this.state.ContactDetailsData.Details.Address.map((item, itr) => {
            return (

                <div key={itr} className="dynamic-address-fields">
                    <div className="full-address-fields hidden">
                        <div key={itr} className="form-field narrow cf" data-type="text" data-required="true" data-validation="required">
                            <div className="field">
                                <div className="header">
                                    <label htmlFor={item.Type}>{item.Type}</label>
                                </div>
                                <div className="stylish-text" data-type="text" tabIndex="-1"><span></span>
                                    <input type="text" id={item.Type} maxLength="100" data-model-property="Line1" data-transfer-model="FirstLine" tabIndex="0" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    RenderPostcode = () => {
        return this.state.ContactDetailsData.Details.PostCode.map((item, itr) => {
            return (
                <div key={itr} className="form-field narrow cf" data-type="text" data-required="true" data-validation="required">
                    <div className="field">
                        <div className="header">
                            <label htmlFor={item.Name}>{item.Name}</label>
                        </div>
                        <div className="stylish-text" data-type="text" tabIndex="-1"><span></span>
                            <input onChange={(event) => { this.handleChange(event) }}
                                value={this.state.Postcode} type="text" name={item.Name} id={item.Name} maxLength="8" className="postcode-field uppercase" data-model-property={item.Name} data-address-lookup={item.Name} data-transfer-model={item.Name} tabIndex="0" data-di-id="#Postcode" /></div>
                    </div>
                </div>
            )
        })
    }

    RenderPhoneNumber = () => {
        return this.state.ContactDetailsData.Details.Phone.map((item, itr) => {
            return (
                <div key={itr} className="form-field cf" data-type="text" data-required="true" data-validation="required|{&quot;rule&quot; : &quot;minLength&quot;, &quot;val&quot;: &quot;10&quot; }">
                    <div className="field">
                        <div className="header">
                            <label htmlFor={item.Name}>{item.Name}</label>

                            <div className="more-information cf">
                                <p>
                                    <i>We'd prefer your mobile number so we can contact you if you break down.<span className="right ico close"></span></i>
                                </p>
                            </div>
                        </div>
                        <div className="stylish-tel" data-type="tel" tabIndex="-1"><span></span>
                            <input onChange={(event) => { this.handleChange(event) }} value={this.state.Telephone} type="tel" id={item.Name} maxLength="10" name="Telephone" className="telephone-only" data-transfer-model="Phone" tabIndex="0" /></div>
                        <h6 className="cf example-text">Mobile if possible</h6>

                    </div>
                </div>
            )
        })
    }

    RenderEmail = () => {
        return this.state.ContactDetailsData.Details.Email.map((item, itr) => {
            return (
                <div  key={itr} className="form-field cf" data-type="text" data-required="true" data-validation="required|email">
                    <div className="field">
                        <div className="header">
                            <label htmlFor={item.Name}>{item.Name}</label>

                            <div className="more-information cf">
                                <p>
                                    <i>We'll send a confirmation email with details of your cover to this address.<span className="right ico close"></span></i>
                                </p>
                            </div>
                        </div>
                        <div className="stylish-email" data-type="email" tabIndex="-1"><span></span>
                        <input type="email" id={item.Name} name={item.Name} onChange={(event) => { this.handleChange(event) }} valule={this.state.Email} maxLength="100" className="" data-transfer-model={item.Name} tabIndex="0" data-di-id="#Email" /></div>
                        <h6 className="cf example-text">For example: anne@example.com</h6>

                    </div>
                </div>
            )
        })
    }

    render() {
        if (this.state.ContactDetailsData.length == 0) {
            return <div></div>
        }
        return (
            <div>
                <article className="mod-form contact-details form-module wrapper white-bg-colour shadow-secondary cf sales-journey" data-scripts="contact-details" data-scripts-loaded="true" data-block-id="bf978ae4-be33-4b74-8477-80e9d99da757" data-error-summary="false" data-inline-errors="true" data-instant-feedback="false" data-save-on-blur="true" data-namespace="contactDetails" data-id="modForm_3">
                    <h1><strong>Contact details</strong></h1>
                    <form className="form-section cf stylish-form" data-stylish-form="set" data-batch-validation="true" data-id="batch_1" data-section-id="0" data-di-form-track="">
                        <div className="address-lookup-fields">
                            <div className="form-field cf house-flat-number">
                                <div className="field">
                                    <div className="header">
                                        <label htmlFor="First line of address">First Line of Address</label>
                                    </div>
                                    <div className="stylish-text" data-type="text" tabIndex="-1"><span></span>
                                        <input onChange={(event) => { this.handleChange(event) }} value={this.state.address1} type="text" name="address1" id="First line of address" maxLength="100" className="HouseOrFlatNumber" data-address-lookup="HouseOrFlatNumber" tabIndex="0" /></div>
                                </div>
                            </div>
                        </div>
                        <div>{this.RenderAddress()}</div>
                        <div className="form-section" data-batch-validation="true" data-id="batch_2" data-section-id="1">
                            <div>{this.RenderPostcode()}</div>
                            <input type="button" className="partial-submit button secondary ra find-address-trigger" value="Find your address" data-alt-label="Change your address" />

                            <input type="button" className="button secondary ra change-address-trigger hidden" value="Change your address" />
                        </div>

                        <div>{this.RenderPhoneNumber()}</div>

                        <div>{this.RenderEmail()}</div>
                    </form>
                </article>
            </div>
        )
    }
}

export default ContactDetails;