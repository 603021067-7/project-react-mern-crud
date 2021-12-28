import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  axios  from "axios";

export default class Createstudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      rollno: "",
    };
  }
  //ไว้รับค่าจาก input เพื่อไป อัพเดตค่า ใน state ด้านบน เพื่อจะ submit form เพื่อให้ ไปบันทึกค่าใน Database
  //เมื่อมีการรับค่าจาก formมา ให้มัน sestate
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
  onSubmit=(e)=> {
      e.preventDefault(); //ป้องกันหน้าไม่ให้ refach

    const studentObject={
      name:this.state.name,
      email:this.state.email,
      rollno:this.state.rollno
    };
    axios.post('http://localhost:4000/students/create-student',studentObject).then(res=>
    console.log(res.data));



      // console.log('Student successfully created!');
      // console.log(`Name:${this.state.name}`);
      // console.log(`Email:${this.state.email}`);
      // console.log(`Rollno:${this.state.rollno}`);

      this.setState({
          name:'',
          email:'',
          rollno:''
      })
    
  }






  render() {
    
    return (
      <div className="form-wrapper mt-5">
        <h1>เพิ่มชื่อนักเรียน</h1>
        <Form className="form-control  mt-4"  onSubmit={this.onSubmit}>
          <Form.Group controlId="Name" >
            <Form.Label> <h3>ชื่อ</h3> </Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
          </Form.Group>
          <Form.Group controlId="Email">
            <Form.Label> <h3>Email</h3> </Form.Label>
            <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail}/>
          </Form.Group>
          <Form.Group controlId="Roll">
            <Form.Label><h3>รหัสนักเรียน</h3>  </Form.Label>
            <Form.Control type="text"value={this.state.rollno} onChange={this.onChangeStudentRollno} />
          </Form.Group>

          <br />
          <Button  className="btn btn-success "  size="lg" block="block" type="submit">
            เพิ่ม
          </Button>
        </Form>
      </div>
    );
  }
}
