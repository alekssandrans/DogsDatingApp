import React, { Component } from 'react';
import Popup from "reactjs-popup";

class DogProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            age: props.age,
            gender: props.gender,
            owner: props.owner,
            breed: props.breed,
            profilePicturePath: props.profilePicturePath,
            specifics: props.specifics
        }
    }

    render() {
        return (
            <div >
                {this.state.profilePicturePath != null &&
                    <div id="dogImageId">
                        <span class="helper"></span><img  src={this.state.profilePicturePath} alt={this.state.name} />
                    </div>}
                {<hr style={{'margin-top': 0}}></hr>}
                {<h2 className="Heading2_DogName"> {this.state.name} </h2>}
                {<p className="DogProfileBreed">{this.state.breed}</p>}
                {<p className="ProfileText">{this.state.gender}</p>}
                {<p className="ProfileText"> {this.state.age} years old</p>}
                
                <Popup on="hover" trigger={<a className="GetToKnowMe"> Get to know me </a>} position="right bottom">
                        {this.state.specifics && <div className="PopupContent">{this.state.specifics}</div> }
                        {!this.state.specifics && <div className="PopupContent">Sorry. No information. ;(</div> }
                </Popup>
            </div>
        )
    }
}
export default DogProfileInfo;