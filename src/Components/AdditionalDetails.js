import React, { Component } from 'react';
import '../styles/styles.css';
import axios from 'axios';

class AdditionalDetails extends Component {
    constructor() {
        super()
        {
            this.state = {
                numberPlate: '',
                Month: '',
                emailOptIn: '',
                smsOptIn: '',
                AdditionalDetailsData: []

            }
        }
    }
    keyNumberPlate(e) {
        if (e.keyCode >= 47 && e.keyCode <= 90) {
        }
        else if (e.keyCode == 8 || e.keyCode == 9) {
        }
        else {
            e.preventDefault();
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:3000/AdditionalDetails.json`).then(response => {

            console.log("response.data ", response)
            this.setState({ AdditionalDetailsData: response.data })

        })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }

    RenderMonths = () => {
        return this.state.AdditionalDetailsData.Month.map((item, itr) => {
            return (

                <option key={itr} className="month" value={item.Name}>{item.Name}</option>

            )
        })
    }
    RenderEmailOpt = () => {
        return this.state.AdditionalDetailsData.OptIn.map((item, itr) => {
            return (
                <div key={itr} className="opt-col">

                    <div className="stylish-ds" data-type="radio">
                        <span className={this.state.emailOptIn === item.Answer ? 'checked' : ''}>
                            <span className="ico"></span></span>
                        <input checked="" onChange={this.handleChange} name="emailOptIn" id={`email${item.Answer}`} type="radio" data-transfer-model="emailOptIn" value={item.Answer} data-di-id={`#email${item.Answer}`} /></div>
                    <label htmlFor={`email${item.Answer}`}>{item.Answer}</label>
                </div>
            )
        })
    }

    RenderTextOp = () => {
        return this.state.AdditionalDetailsData.OptIn.map((item, itr) => {
            return (
                <div key={itr} className="opt-col">
                    <div className="stylish-ds" data-type="radio">
                        <span className={this.state.smsOptIn === item.Answer ? 'checked' : ''}>
                            <span className="ico"></span>
                        </span>
                        <input onChange={this.handleChange} checked="" name="smsOptIn" id={`textGroup${item.Answer}`} type="radio" data-transfer-model="smsOptIn" value={item.Answer} data-di-id={`#textGroup${item.Answer}`} /></div>
                    <label htmlFor={`textGroup${item.Answer}`}>{item.Answer}</label>
                </div>
            )
        })
    }





    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.props.onStateChange(this.state) });
    }
    render() {
        if (this.state.AdditionalDetailsData.length == 0) {
            return <div></div>
        }
        return (
            <div>
                <article data-scripts="additional-details" data-scripts-loaded="true" className="mod-form additional-details form-module wrapper white-bg-colour shadow-secondary cf sales-journey" data-error-summary="false" data-inline-errors="true" data-instant-feedback="false" data-save-on-blur="true" data-block-id="1e5e0d69-410e-40cb-82ed-d701045f816b" data-namespace="additionalDetails" data-id="modForm_4">
                    <h1><strong>Additional details</strong></h1>
                    <form className="form-section cf stylish-form" data-stylish-form="set" data-batch-validation="true" data-id="batch_1" data-section-id="0" data-di-form-track="">
                        <div className="form-field additional-vrn cf">
                            <label htmlFor="Number plate">Number plate</label>
                            <div className="field">
                                <div className="stylish-text" data-type="text" tabIndex="-1"><span></span>
                                    <input type="text" maxLength="10" onKeyDown={this.keyNumberPlate} onChange={(event) => { this.handleChange(event) }} value={this.state.numberPlate} name="numberPlate" id="Number plate" className="registration-number alphanumerical-only registration" data-serialise-details="RegistrationNumber" tabIndex="0" /></div>
                            </div>
                        </div>
                        <div className="form-field cf select-month-group" data-time-stamp="T00:00:00" data-insurance-renewal-date="">
                            <label htmlFor="Car insurance renewal date">Car insurance renewal date</label>
                            <div className="field">
                                <div className="stylish-select" data-type="select-one" tabIndex="-1">
                                    <select name="Month" onChange={(event => { this.handleChange(event) })} className="month-select" id="Car insurance renewal date" data-serialise-details="InsuranceRenewalDate" >
                                        {this.RenderMonths()}
                                    </select>

                                    <span className="selected">
                                        <span className="text">
                                        </span>
                                        <span className="ico">
                                        </span>
                                    </span><div className="dropdown-list" role="listbox">
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </article>
                <article id="marketing-preferences-block" className="contact-pref-module form-module wrapper white-bg-colour shadow-secondary mod-form cf no-ra sales-journey stylish-form" data-stylish-form="set" data-scripts="marketing-preferences" data-scripts-loaded="true" data-namespace="MarketingPreferences" data-block-id="8a907534-ac47-49dc-a1d4-40d829837aac" data-error-summary="false" data-save-on-blur="true" data-instant-feedback="false" data-id="modForm_5">
                    <header>
                        <h1><strong>Stay in the know</strong></h1>
                        <p></p><p>We’ll keep you in the loop by post and phone with Member benefits, and advice that’ll get your car road-ready (if you’re on the Telephone Preference Service we won’t call you). We’ll keep your information safe and only send things we think you’ll love. You can opt out at any time – see our <a href="http://www.theaa.com/privacy-notice" target="_blank" data-di-id="di-id-f559588e-e90a4a6b">privacy notice</a> to find out how.</p>
                        <p>We’d also like to keep in touch by email and text. If you’d rather we didn’t, just choose ‘No’:</p><p></p>
                    </header>
                    <form className="contact-preferences-form" data-di-form-track="">

                        <div className="contact-pref-row cf">
                            <div className="contact-pref-block">
                                <div className="contact-pref-heading"><h2>Email</h2></div>
                                <div className="contact-pref-options">
                                    {this.RenderEmailOpt()}
                                </div>
                            </div>

                            <div className="contact-pref-block">
                                <div className="contact-pref-heading"><h2>Text</h2></div>
                                <div className="contact-pref-options">

                                    {this.RenderTextOp()}
                                </div>
                            </div>
                        </div>

                        <div className="divider-bdr cf">&nbsp;</div>

                        <div className="privacy-notice">
                            <h3>Your personal information</h3>
                            <p>Our <a href="http://www.theaa.com/privacy-notice" target="_blank" data-di-id="di-id-dead8eca-1baa119">privacy notice</a> explains how and why we use your personal information – including what details we hold, who we might share it with, and your choices and rights. It also includes information about any checks and decisions we may make.</p>
                        </div>
                    </form>
                </article>
            </div>
        )
    }
}

export default AdditionalDetails;