import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class Editstudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      rollno: "",
    };
  }

  componentDidMount() {
    axios.get(
        'http://localhost:4000/students/edit-student/' +this.props.match.params.id)
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  onChangeStudentName = (e) => {
    this.setState({ name: e.target.value }); //e.target.value เป็นค่าที่รับมาจาก ฟอม name
  };
  onChangeStudentEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangeStudentRollno = (e) => {
    this.setState({ rollno: e.target.value });
  };

  //เมื่อกดsubmit ให้เพิ่มค่า `Name:${this.state.name}` รวมทั้งreset
  onSubmit = (e) => {
    e.preventDefault(); //ป้องกันหน้าไม่ให้ refach

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno,
    };

    axios
      .put(
        "http://localhost:4000/students/update-student/" +
          this.props.match.params.id,
        studentObject
      )
      .then((res) => {
        console.log(res.data);
        console.log("Student successfully Updated");
      })
      .catch((error) => {
        console.log(error);
      });
    this.props.history.push("/student-list");
  };

  render() {
    return (
      <div className="form-wrapper mt-5">
        <h1>แก้ไข ข้อมูลนักเรียน</h1>
        <Form className="form-control row" onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label> ชื่อนักเรียน </Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeStudentName}
            />
          </Form.Group>
          <Form.Group controlId="Email">
            <Form.Label> Email </Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              onChange={this.onChangeStudentEmail}
            />
          </Form.Group>
          <Form.Group controlId="Roll">
            <Form.Label> รหัสนักเรียน </Form.Label>
            <Form.Control
              type="text"
              value={this.state.rollno}
              onChange={this.onChangeStudentRollno}
            />
          </Form.Group>

          <Button variant="success" size="lg" block="block" type="submit">
            ยืนยัน
          </Button>
        </Form>
      </div>
    );
  }
}
