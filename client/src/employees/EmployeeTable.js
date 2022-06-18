import React from 'react';

const EmployeeTable = ({ empData }) => {
  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {empData.map((emp, i) => {
            return (
              <tr key={i}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.age}</td>
                <td>{emp.dateOfJoining}</td>
                <td>{emp.title}</td>
                <td>{emp.department}</td>
                <td>{emp.employeeType}</td>
                <td>{emp.currentStatus ? "true" : "false"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeTable;