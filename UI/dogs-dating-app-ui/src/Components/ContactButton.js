import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../css/DogProfile.css'


class ContactButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("api-key"),
            owner: props.owner,
            username: '',
            fullName: '',
            phoneNumber: '',
            email: '',
            socialMediaLink: '',
            city: '',

            showContactInfo: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.hideContactInfo = this.hideContactInfo.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        const AuthStr = 'Bearer '.concat(this.state.token);

        axios({
            method: 'get',
            url: 'http://localhost:5000/api/usermanagement/user/' + this.state.owner,
            headers: { Authorization: AuthStr },
        })
            .then((response) => {

                if (response.status == 200) {
                    this.setState({
                        username: response.data.username,
                        fullName: response.data.fullName,
                        phoneNumber: response.data.phoneNumber,
                        email: response.data.email,
                        socialMediaLink: response.data.socialMediaLink,
                        city: response.data.city,
                        showContactInfo: true

                    });
                }
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.error);
                } else if (error.request) {
                    alert('Unable to find contact info. Please try again later.');
                } else {
                    alert('Error' + error.message);
                }

            });
    }

    hideContactInfo(e){
        e.preventDefault();
        this.setState({
            showContactInfo: false
        });
    }

    render() {
        return (

            <div>
                <Button variant="outline-light" className="ContactButton" onClick={this.handleClick}>Contact Info</Button>            
            </div>
            
        )
    }
}

export default ContactButton;