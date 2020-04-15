import React, { Component } from 'react';
import Cities from '../Components/Cities';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class EditProfileForm extends Component {
    constructor() {
        super();

        this.state = {
            token: localStorage.getItem("api-key"),
            fullName: "",
            username: "",
            phoneNumber: "",
            email: "",
            socialMediaLink: "",
            city: "",
            lettersForList: '',
            lengthOfLetters: 0,
            displayList: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
        const AuthStr = 'Bearer '.concat(this.state.token);

        axios({
            method: 'get',
            url: 'http://localhost:5000/api/usermanagement/user',
            headers: { Authorization: AuthStr }
        })
            .then((response) => {

                if (response.status === 200) {

                    this.setState({
                        fullName: response.data.fullName,
                        username: response.data.username,
                        phoneNumber: response.data.phoneNumber,
                        email: response.data.email,
                        socialMediaLink: response.data.socialMediaLink,
                        city: response.data.city
                    });
                }
            });
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleKey(e) {
        const target = e.target;
        const value = target.value;
        const length = value.length;

        this.setState({
            city: value,
            lengthOfLetters: length,
            displayList: false
        });

        if (this.state.lengthOfLetters >= 2) {
            this.setState(
                {
                    lettersForList: value,
                    displayList: true
                }
            )

        }
        if (this.state.value === "") {
            this.setState({
                lengthOfLetters: 0,
                displayList: true
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const AuthStr = 'Bearer '.concat(this.state.token);

        const userForUpdate = {
            "phoneNumber": this.state.phoneNumber,
            "email": this.state.email,
            "socialMediaLink": this.state.socialMediaLink,
            "city": this.state.city
        };

        axios({
            method: 'put',
            url: 'http://localhost:5000/api/usermanagement/update',
            headers: { Authorization: AuthStr },
            data: userForUpdate
        })
            .then((response) => {

                if (response.data.success) {
                    console.log(response);
                }

            })
            .catch((error) => {
                if (error.response) {
                   
                    alert(error.response.data.error);

                } else if (error.request) {
                    
                    alert('Unable to update user. Please try again later.');

                } else {
                    
                    alert('Error' + error.message);
                }
                
            });


    }

    render() {

        return (
            <div>

                <h2 class="Heading2_Titles">Welcome {this.state.username}</h2>

                <h2 class="Heading2">Edit Profile</h2>

                <hr class="Hr"></hr>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label className="FormField__LabelCustom" htmlFor="phoneNumber">Phone Number</Form.Label>
                        <Form.Control type="text" className="FormField__InputCustom" id="phoneNumber" placeholder={this.state.phoneNumber} name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="FormField__LabelCustom" htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" className="FormField__InputCustom" id="email" placeholder={this.state.email} name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="FormField__LabelCustom" htmlFor="socialMediaLink">Social Media Link</Form.Label>
                        <Form.Control type="url" className="FormField__InputCustom" id="socialMediaLink" placeholder={this.state.socialMediaLink} name="socialMediaLink" value={this.state.socialMediaLink} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="FormField__LabelCustom" htmlFor="city">City</Form.Label>
                        <Form.Control type="text" list="cities" className="FormField__InputCustom" id="city" placeholder={this.state.city} name="city" value={this.state.city} onChange={this.handleKey} required/>
                        {this.state.displayList && <Cities letters={this.state.lettersForList}></Cities>}
                        {!this.state.displayList &&
                            <datalist id="cities">
                                <option value="Sofia" />
                                <option value="Plovdiv" />
                                <option value="Varna" />
                                <option value="Burgas" />
                            </datalist>
                        }
                    </Form.Group>

                    <Button className="FormField__ButtonCustom" type="submit" variant="outline-light">
                        Update
                    </Button>
                </Form>
            </div>

        );
    }
}

export default EditProfileForm;