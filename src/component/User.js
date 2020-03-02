import React from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Grid, Button } from "@material-ui/core";
import AddUser from "./AddUser";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      apiResponse: "initial state",
      viewUsers:'',
      updatedResponse: "",
      updatestate:false,
    };
    // this.createData = this.createData.bind(this);
    // this.getUsers = this.getUsers.bind(this);
  }
  changeText = (e) => {
    var statename=e.target.name;
    this.setState({[statename]:e.target.value});
   
  }
  updateUser = id => {
    var data = { id: id };
    var data = "";
    var viewUsers = this.state.viewUsers;
    if (viewUsers != "") {
      data = viewUsers.filter(function(value) {
        if (value.id === id) {
          return value;
        }
      });
    }
    console.log(data);

    this.setState({ fname: data[0].first_name,lname :data[0].last_name });
   
  };
  deleteUser = id => {
    var data = { id: id };
    axios
      .post("http://localhost:9000/delete", data)
      .then(res => {
        if (res.status == 200) {
          this.getUsers();
        }
      })
      .catch(() => {
        console.log("Something went wrong. Plase try again later");
      });
  };
  createData = data => {
    var arr = [];
    if (data.length > 0) {
      data.map((row, index) => {
        arr.push(
          <TableRow key={row.id}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell component="th" align="center" scope="row">
              {row.first_name}
            </TableCell>
            <TableCell component="th" align="center" scope="row">
              {row.last_name}
            </TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.updateUser(row.id);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.deleteUser(row.id);
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        );
      });
    }
    return arr;
  };
  getUsers = async () => {
    const response = await fetch("http://localhost:9000");
    const rows = await response.json();
    var datastr = this.createData(rows);
    this.setState({ apiResponse: datastr,viewUsers:rows });
  };
  AddUserFun = () => {
    let data = {
      first_name: this.state.fname,
      email: this.state.email,
      last_name: this.state.lname
    };

    axios
      .post("http://localhost:9000/add", data)
      .then((res) => {
       if(res.status==200)
       {
        this.getUsers();
        this.setState({fname:'',lname:'',email:''})
       }
      
      })
      .catch(() => {
        console.log("Something went wrong. Plase try again later");
      });
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    var datastr = this.state.apiResponse;
    // var datastr = this.createData(rows);
    return (
      <div className="">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AddUser
                getUsers={this.getUsers}
                fname={this.state.fname}
                lname={this.state.lname}
                email={this.state.email}
                changeText={this.changeText}
                AddUserFun={this.AddUserFun}
              />
            </Grid>
            <Grid item xs={6}>
              <TableContainer component={Paper}>
                <Table className="" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="center">First Name</TableCell>
                      <TableCell align="center">Last Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{datastr}</TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default User;
