import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  Button  from 'react-bootstrap/Button'
import axios from 'axios'


export default class StudentTableRow extends Component {


    deleteStudent = ()=>{
        axios.delete('http://localhost:4000/students/delete-student/'+this.props.obj._id)
        .then((res)=>{
            console.log("Student successfully deleted! "); this.props.history.push('/student-list')
        }).catch((error)=>{
            console.log(error)
        });
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.rollno}</td>
                    <td>
                    <Link className='edit-link btn btn-warning' to={"/edit-student/" + this.props.obj._id}>
                        แก้ไข
                    </Link>
                        <Button  variant="danger" onClick={this.deleteStudent}>ลบข้อมูล</Button>   
                    </td>
            </tr>
        )
    }
}
