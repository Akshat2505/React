import React, { Component } from 'react';
import '../styles/styles.css';
import axios from 'axios';


class PersonalDetails extends Component {
    constructor() {
        super()
        {
            this.state = {
                Title: '',
                'First Name': '',
                'Last Name': '',
                Day: '',
                Month: '',
                Year: '',
                PersonalDetailsData: []
            }
        }
        this.handleChange = this.handleChange.bind(this);

    }


    componentDidMount = () => {
        axios.get(`http://localhost:3000/PersonalDetails.json`).then(response => {
            this.setState({ PersonalDetailsData: response.data })
        })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
        }

    RenderPDetails = () => {
        let className = className
        return this.state.PersonalDetailsData.Details.map((item, itr) => {
            return (
                <div key={itr}>
                    <div key={itr} className="form-field cf first-name-group" data-type="text">
                        <div className="header">
                            <label htmlFor="first-name">{item.CustomerDetails}</label>
                        </div>

                        <div className="field">
                            <div className="stylish-text" data-type="text" tabIndex="-1"><span></span>
                                <input type="text" onChange={(event) => { this.handleChange(event) }} name={item.CustomerDetails} value={this.state.value} id={item.CustomerDetails} className={item.CustomerDetails} maxLength="100" tabIndex="0" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    RenderTitle = () => {
        return this.state.PersonalDetailsData.TitleDetail.map((item, itr) => {
            return (

                <div key={itr} className="radio-field field" tabIndex="0"><div className="" ><span className={this.state === item.Title ? 'checked' : ''}> <span className="ico"></span></span>
                    <input name="Title" type="radio" onChange={(event) => { this.handleChange(event) }} value={item.Title} id={item.Title} data-id="0" tabIndex="-1" data-di-id="#Mr" /></div><label htmlFor={item.Title}>{item.Title}</label></div>



            )
        })

    }
    RenderDOBDetails = () => {
        let fieldsToClassMap = {
            'Day': 'day',
            'Month': 'month',
            'Year': 'year'
        };
        return this.state.PersonalDetailsData.DateOfBirth.map((item, itr) => {
            return (
                <div key={itr} className="field">
                    <div className={`form-field dob-group ${fieldsToClassMap[item.field]}`} data-validation="required|isValidDateOfBirth" data-required="true" data-type="text">
                        <div className="field">
                            <div className="stylish-tel" data-type="tel" tabIndex="-1"><span></span>
                                <input type="number" name={item.field} value={this.state.value} onChange={(event) => { this.handleChange(event) }} id={`Date of birth-${fieldsToClassMap[item.field]}`} inputMode="numeric"
                                    maxLength="2" className={`dob-input ${fieldsToClassMap[item.field]}-number numbers-only`} tabIndex="0" /></div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    validators = {

        Title: (value) => {
            return value;
        },
        'First Name': (value) => {
            return value.match(/^[A-Za-z]+$/)
        },
        'Last Name': (value) => {
            return value.match(/^[A-Za-z]+$/)
        },
        Day: (value) => {
            return value.match(/^(?:[0-9]|[12][0-9]|3[01])$/)

        },
        Month: (value) => {
            return value.match(/^(1[0-2]|[1-9])$/)
        },
        Year: (value) => {
            return value.match(/^(?:(?:19|20)[0-9]{2})$/);
        }
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (this.validators[name](value) || !value) {
            this.setState({ [name]: value },
                () => { this.props.onStateChange(this.state) });
        }
    }



    render() {
        if (this.state.PersonalDetailsData.length == 0) {
            return <div></div>
        }
        return (
            <div>

                <article className="mod-form personal-details form-module wrapper white-bg-colour shadow-secondary cf sales-journey" data-scripts="main-policy-holder" data-scripts-loaded="true" data-block-id="49506263-6bfd-4f47-bbe8-277f4250e26a" data-error-summary="false" data-inline-errors="true" data-instant-feedback="false" data-save-on-blur="true" data-namespace="mainPolicyHolder" data-id="modForm_2">
                    <h1><strong>Personal details</strong></h1>

                    <p>Who's going to be the main policy holder? Please note: this needs to be the same person who's paying for the cover.</p>
                    <p>If somebody else is paying, no problem. Just call us instead on <strong>0800 085 2721</strong>.</p>

                    <form className="form-section cf stylish-form" data-stylish-form="set" data-batch-validation="true" data-id="batch_1" data-section-id="0" data-di-form-track="">
                        <div className="form-field radio-buttons-group cf" data-validation="required" data-required="true" data-type="radio" data-name="Prefix" data-selected-prefix="0">
                            <h6>Title</h6><div data-stylish-form="set" data-transfer-model-group="Prefix" data-single-value="true" data-raw-value="true" className="stylish-form">
                                {this.RenderTitle()}
                            </div></div>

                        <div>
                            {this.RenderPDetails()}</div>
                        <br />

                        <div>

                            <div className="form-field cf date-of-birth-group" data-selected-birth-date="0001-01-01T00:00:00">
                                <label htmlFor="Date of birth">Date of birth</label>

                                {this.RenderDOBDetails()}
                            </div>

                            <div className="help-block">For example: 20 1 1980</div>
                        </div>

                        <div className="form-field cf">
                            <div className="field checkbox-field information cf" tabIndex="0">
                                <div className="stylish-ds" data-type="checkbox"><span className=""><span className="ico"></span></span><input type="checkbox" id="I have a Blue Badge issued by my local council" name="HasBlueBadge" data-transfer-model="HasBlueBadge" tabIndex="-1" /></div>
                                <div className="header">
                                    <label htmlFor="I have a Blue Badge issued by my local council">
                                        <span>I have a Blue Badge issued by my local council<span className="ico info" ></span></span>
                                    </label>
                                    <div className="more-information cf">
                                        <p>
                                            <i><span className="ico close"></span>If you break down, we'll know if you need any special assistance.</i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </article>
            </div>
        )
    }
}

export default PersonalDetails;