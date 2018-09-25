import React, { Component } from 'react';
import '../styles/styles.css'

class CoverDetails extends Component {
   constructor()
   {
       super()
       {
           this.state = {
           CoverDetails: ''
           }
        }
        
   }
   
   handleChange = (event) => {
    this.setState({
        CoverDetails: event.target.value
    }, () => {    this.props.onStateChange(this.state)   //Callback
    });

}
   
    render()
    {
        return(
            <div>
              <div className="sales-journey-blocks cf details blocks-visible" data-current-step="8e38d1bd-f699-46e4-afaf-b695abac7016">
              <article className="cover-details-module form-module wrapper white-bg-colour shadow-secondary mod-form cf no-ra sales-journey stylish-form" data-scripts="cover-details" data-scripts-loaded="true" data-stylish-form="set" data-error-summary="false" data-instant-feedback="false" data-inline-errors="true" data-block-id="42f6c0d4-e278-4191-abd5-0c3d53429fbb" data-save-on-blur="true" data-namespace="coverDetails" data-id="modForm_1">
    <header>
        <h1><strong>Cover details</strong></h1>
        <p>When would you like your Roadside Assistance to start?</p>
    </header>
    <form className="form-section cf" data-id="batch_1" data-section-id="0" data-di-form-track="">
        <div className="assistance-date" data-transfer-model-group="StartCoverDate" data-single-value="true" data-raw-value="true">
            <ul role="radiogroup">
                <li tabIndex="0" role="radio">
                    <label htmlFor="today" className="form-field cf ra start-date today active-border">
                        <span className="field">
                            <span className="assist-day">Today</span>
                            <span className="cover-date">24 Aug</span>
                            <div className="stylish-ds" data-type="radio"><span className={this.state.CoverDetails === "2018-08-24T00:00:00+01:00" ? 'checked' : ''}><span className="ico"></span></span>
                            <input name="date-button" onChange={this.handleChange} type="radio" value="2018-08-24T00:00:00+01:00" data-id="2018-08-24T00:00:00+01:00" id="today" className="cover-button today" checked="" tabIndex="-1" data-di-id="#today"/></div>
                        </span>
                    </label>
                </li>
                <li tabIndex="0" role="radio">
                    <label htmlFor="tomorrow" className="form-field cf ra start-date tomorrow">
                        <span className="field">
                            <span className="assist-day">Tomorrow</span>
                            <span className="cover-date">25 Aug</span>
                            <div className="stylish-ds" data-type="radio"><span  className={this.state.CoverDetails === "2018-08-25T00:00:00+01:00" ? 'checked' : ''}><span className="ico"></span></span>
                            <input name="date-button" onChange={this.handleChange} type="radio" value="2018-08-25T00:00:00+01:00" data-id="2018-08-25T00:00:00+01:00" id="tomorrow" className="cover-button tommorow" tabIndex="-1"  data-di-id="#tomorrow"/></div>
                        </span>
                    </label>
                </li>
                <li role="radio">
                    <div className="stylish-text" data-type="text" tabIndex="-1"><span></span>
                    <input type="text" className="datepicker no-select hasDatepicker" readOnly="readOnly" aria-haspopup="true" aria-owns="ui-datepicker-div" tabIndex="0" id="dp1535108008939" data-di-id="#dp1535108008939"/></div>
                    <label htmlFor="datepicker" className="form-field cf ra start-date other">
                        <span className="field">
                            <span className="assist-day">Other</span>
                            <span className="cover-date"><div className="stylish-text" data-type="text" tabIndex="-1"><span></span>
                            <input type="text" id="alternate" className="date-field alternate" maxLength="7" readOnly="readOnly" tabIndex="-1" data-di-id="#alternate"/></div></span>
                            <div className="stylish-ds" data-type="radio"><span className={this.state.CoverDetails === "Other" ? 'checked' : ''}><span className="ico"></span></span>
                            <input name="date-button" onChange={this.handleChange} type="radio" value="Other" id="datepicker" data-id="Other" className="cover-button" tabIndex="-1"  data-di-id="#datepicker"/></div>
                            <input type="hidden" className="start-date" id="other-date" data-di-id="#other-date"/>
                        </span>
                    </label>
                </li>
            </ul>
        <div id="ui-datepicker-div" className="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" aria-hidden="true" aria-expanded="false" tabIndex="-1"></div>
        </div>
        <div className="info cf" data-two-days="Your {cover-options} can be used 24 hours after purchase." data-any-time="Your {cover-options} can be used as soon as your cover starts." >
            <p className="info-body cf">
                <span className="info-message-container">
                    <span className="info-message covers">
                    </span>
                    <span data-label="Add Parts and Garage Cover" className="info-message pgc-cover">
                        You can get help with Parts and Garage Cover bills for breakdowns that happen after the first 14 days of your cover.
                    </span>
                </span>
            </p>
        </div>
        <section className="vrn-numbers-list cf"></section>
    </form>
    <form className="vehicles-data" data-di-form-track=""></form>
</article>
</div>
</div>
        )
    }
}

export default CoverDetails;