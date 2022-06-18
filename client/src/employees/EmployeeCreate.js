import React, { useState } from 'react'
import { useCreateEmployeeMutation } from '../apiSlice';

const EmployeeCreate = () => {
  const [inputs, setInputs] = useState({});
  const [createEmployee, result] = useCreateEmployeeMutation()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await createEmployee(inputs)
    // console.log(inputs);
    alert(res.error?.message);
    console.log(res);
    console.log(result);
    result.isSuccess ? setInputs({}) : console.log("Insertion failed");
  }

  return (
    <>
      <div className="container fixed-bottom mb-2 ">
        <form onSubmit={handleSubmit} id='collapseForm' className='collapse row bg-primary bg-gradient rounded-top pt-2 text-light'>
          <div className="mb-3 row">
            <div className="col-6">
              <label for="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First Name" value={inputs.firstName || ""} onChange={handleChange} />
            </div>
            <div className="col-6">
              <label for="lastName" className="form-label">Second Name</label>
              <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Last Name" value={inputs.lastName || ""} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-6">
              <label for="age" className="form-label">Age</label>
              <input type="number" className="form-control" name="age" id="age" placeholder="Age" value={inputs.age || ""} onChange={handleChange} />
            </div>
            <div className="col-6">
              <label for="dateOfJoining" className="form-label">Date of Joining</label>
              <input type="date" className="form-control" name="dateOfJoining" id="dateOfJoining" placeholder="Date" value={inputs.dateOfJoining || ""} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col">
              <label for="title" className="form-label">Title</label>
              <input type="text" className="form-control" name="title" id="title" placeholder="Title" value={inputs.title || ""} onChange={handleChange} />
            </div>
            <div className="col">
              <label for="department" className="form-label">Department</label>
              <input type="text" className="form-control" name="department" id="department" placeholder="Department" value={inputs.department || ""} onChange={handleChange} />
            </div>
            <div className="col">
              <label for="employeeType" className="form-label">Employee Type</label>
              <input type="text" className="form-control" name="employeeType" id="employeeType" placeholder="Employee Type" value={inputs.employeeType || ""} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row d-flex justify-content-evenly">
            <div className="col-auto">
              <button type="submit" className="btn btn-success">Create Employee</button>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-warning" disabled>Update Employee</button>
            </div>
          </div>
        </form>
        <div className="row d-flex justify-content-evenly dropup">
          <div className="col-auto">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseForm" aria-expanded="false" aria-controls="collapseForm">
              Add New Employee
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default EmployeeCreate