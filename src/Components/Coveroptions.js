import React, { Component } from 'react';
import '../styles/styles.css';
import axios from 'axios';


class CoverOptions extends Component {
    constructor(props) {
        super(props)
        {

            this.state = {
                CoverType: '',
                CoverOptionsData: []
            }
            this.handleChange = this.handleChange.bind(this);
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:3000/CoverOptions.json`).then(response => {

            console.log("response.data ", response)
            this.setState({ CoverOptionsData: response.data })


        })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }

    handleChange = (event) => {
        this.setState({
            CoverType: event.target.value

        }, () => {       //Callback
            this.props.onStateChange(this.state);
            // console.log("Selected Cover ", this.state.CoverType)
        });
    }

    renderCoverOptions = () => {
        let className = className
        return this.state.CoverOptionsData.CoverOptions.map((item, itr) => {
            return (
                <div key={itr}>
                    
                    <div className="form-field cf" role="radiogroup">
                        <div className={"radio-field block white-bg-color transition cf " + (this.state.CoverType === item.CoverTypes ? 'highlighted' : '')} data-option-id="26edafc2-a10f-4bea-986d-3f72802d22c7" tabIndex="0" role="radio">
                            <div className="option-details">
                                <label className="select-label transition" htmlFor={item.CoverTypes} ></label>
                                <figure className="image">
                                <img src={item.ImgLink} alt={item.CoverTypes} />
                                 </figure>
                                <div key={itr} className="label-description">
                                    <span className="large-label">{item.CoverTypes}</span>
                                    <div className="desktop-description">
                                        <p>{item.Description}</p>
                                    </div>
                                </div>
                                <div className="input">
                                    <span className="select-label desktop-tablet-view " data-select-label="">{(this.state.CoverType === item.CoverTypes) ? "Selected" : 'Select'}</span>
                                    <div className="stylish-ds " data-type="radio">
                                        <span className={this.state.CoverType === item.CoverTypes ? 'checked' : ''}>
                                            <span className="ico"></span></span>
                                        <input type="radio" className="Cover" id={item.CoverTypes} name="Choose a type of cover"
                                            onChange={this.handleChange} value={item.CoverTypes} tabIndex="-1" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

    }


    render() {

        if (this.state.CoverOptionsData.length == 0) {
            return <div></div>
        }
        return (
            <div >
                <article data-scripts="cover-type-options" data-scripts-loaded="true" className="cover-type-options cf form-module wrapper sales-journey sales-journey-option-types" data-default-cover="Vehicle cover" data-block-id="40d2a55c-879f-4952-b450-fb4be363bb25" >
                    <h1><strong>Choose a type of cover</strong></h1>
                    <form className="form-section cf stylish-form" data-stylish-form="set" data-batch-validation="true" data-di-form-track="">
                        <div>
                            {this.renderCoverOptions()}
                        </div>
                    </form>
                </article>
            </div>

        )
    }
}
export default CoverOptions;
