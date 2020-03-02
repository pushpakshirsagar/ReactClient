import React from "react";
import "../App.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    

  }

  
 
  render() {
    return (
      <div>
        <div>
          <TextField
            className="text-field"
            id="name"
            label="First Name"
            name="fname"
            value={this.props.fname}
            onChange={this.props.changeText}
          />
        </div>
        <div>
          <TextField
            className="text-field"
            id="name"
            label="Last Name"
            name="lname"
            value={this.props.lname}
            onChange={this.props.changeText}
          />
        </div>
        <div>
          <TextField
            className="text-field"
            id="email"
            label="Email"
            name="email"
            value={this.props.email}
            onChange={this.props.changeText}
          />
        </div>
        <Button
          className="text-btn"
          variant="contained"
          color="primary"
          align="right"
          type="submit"
          onClick={this.props.AddUserFun}
        >
          Submit
        </Button>
      </div>
    );
  }
}
