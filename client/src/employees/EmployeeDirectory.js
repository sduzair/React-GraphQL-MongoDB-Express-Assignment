import React from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import { useGetEmployeesQuery } from '../apiSlice';

const EmployeeDirectory = () => {
  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetEmployeesQuery()

  return (
    <>
      <div className="container-xxl mt-5 bg-light">
        <div className="row"><h1 className='display-4 p-0'>Employee Management System</h1></div>
        <div className="row">
          {isLoading
            ? <div>Loading...</div>
            : isError
              ? <div>{error.toString()}</div>
              : isSuccess
                ? <>
                  <EmployeeSearch></EmployeeSearch>
                  <EmployeeTable empData={employees.getEmployees}></EmployeeTable>
                  <EmployeeCreate></EmployeeCreate>
                  {console.log(employees)}
                </>
                : <div>Some error</div>
          }

        </div>
      </div>
    </>
  );
};

export default EmployeeDirectory;
