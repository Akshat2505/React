import React, { Component } from 'react';
import '../styles/styles.css';
import axios from 'axios';

class ExtraOptions extends Component {
    constructor(props) {
        super(props)
        {
            this.state = {
                NationalRecovery: '',
                AtHome: '',
                OnwardTravel: '',
                PartsAndGarageCover: '',
                ExtraOptionsData: []

            }

        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:3000/ExtraOptions.json`).then(response => {

            this.setState({ ExtraOptionsData: response.data })


        })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }

    renderExtraOptions = () => {
            let className = className
        return this.state.ExtraOptionsData.ExtraOptions.map((item, itr) => {
            return (
                <div key={itr}>
                    <p></p>
                    <p></p>
                    <div key={itr} className="form-field cf">
                        <div className="checkbox-field block transition white-bg-color cf " data-product-code="PRD_UK_0004" data-option-id="3216cdcf-9c2d-481c-ad01-316405659c3f" tabIndex="0" role="checkbox" >
                            <div className="option-details">
                                <label className="select-label transition" htmlFor={item.EOptionsType}></label>
                                <figure className="image">
                                    <img src={item.ImgLink} alt={item.EOptionsType} />
                                </figure>
                                <div className="label-description">
                                    <span className="large-label">{item.EOptionsType}</span>
                                    <div className="desktop-description">
                                        <p>{item.Description}</p>
                                    </div>
                                </div>
                                <div className="input">
                                    <span className="select-label desktop-tablet-view" data-selected-label="Selected" data-select-label="Select">
                                    {(this.state.NationalRecovery === item.EOptionsType && this.state.AtHome === item.EOptionsType && this.state.OnwardTravel === item.EOptionsType && this.state.PartsAndGarageCover === item.EOptionsType) ? "Selected" : 'Select'}
                                    </span>
                                    <div className="stylish-ds" data-type="checkbox"><span className={this.handleChange === item.EOptionsType ? 'checked' : ''}><span className="ico"></span></span>
                                        <input type="checkbox" id={item.EOptionsType}  onChange={this.handleChange} className="option " data-id="National Recovery" data-is-editing="false" data-modal-id="vrn-modal" data-selected-option="" data-modal="false" name={item.EOptionsType} value={item.EOptionsType} tabIndex="-1" className="Cover" /></div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )
        })

    }

    handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        this.setState(
            {
                [name]: value
            }, () => {
                this.props.onStateChange(this.state);    //Callback function
            });
            
    }
    render() {
        if (this.state.ExtraOptionsData.length == 0) {
            return <div></div>
        }

        return (
            <div>
                <br />
                <article>
                    <aside className="stylish-ds " id="eligibility-promotion-message" className="promo-banner form-module desktop-tablet-view cf sales-journey " data-block-id="df971008-8d29-4932-ade5-69ddb834b521" data-component-name="EligibilityPromoBannerBlock">
                        <div className="  wrapper size cf  promo is-featured rich-text">
                            <header className="featured-promo">
                                <h6 className=" wrapper cf small-text">Special offer</h6>
                            </header>
                            <div className="wrapper  cf">
                                <h1>Free Onward Travel for 12 months</h1>
                                <div className="message">
                                    Just choose breakdown cover with National Recovery and add Onward Travel to qualify*
            </div>
                            </div>
                        </div>
                    </aside>
                </article>
                <article data-scripts="cover-options" data-scripts-loaded="true" className="cover-options cf form-module wrapper sales-journey sales-journey-option-types" data-namespace="coverageOptionsBlock" data-component-name="CoverageOptionsBlock" data-block-id="00219536-c6e4-4a50-b812-7f68e85ffd3e">
                    <h1><strong>Choose your options</strong></h1>
                    <form className="form-section cf stylish-form" data-stylish-form="set" data-batch-validation="true" data-di-form-track="">
                        <div>{this.renderExtraOptions()}</div>
                    </form>
                </article>
            </div>
        )
    }
}

export default ExtraOptions;
