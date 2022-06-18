import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { gql } from 'graphql-request'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: graphqlRequestBaseQuery({
    url: '/graphql',
  }),

  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => ({
        document: `
          query GetEmployees {
            getEmployees {
              firstName
              lastName
              age
              currentStatus
              dateOfJoining
              department
              employeeType
              title
            }
          }
        `
      }),
      // transformResponse: (response) => response.posts.data,
    }),
    createEmployee: builder.mutation({
      query: (empData) => ({
        document: gql`
          mutation Mutation($data: EmployeeInsertInput2!) {
            insertOneEmployee (data: $data){
              firstName
              lastName
              title
              employeeType
              department
              dateOfJoining
              currentStatus
              age
            }
          }        
        `,
        variables: {
          data:
          {
            // insertOneEmployee: {
            age: empData.age,
            currentStatus: empData.currentStatus,
            dateOfJoining: empData.dateOfJoining,
            department: empData.department,
            employeeType: empData.employeeType,
            firstName: empData.firstName,
            lastName: empData.lastName,
            title: empData.title

            // }
          }
        }
      }),
      // transformResponse: (response) => response.posts.data,
    })
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetEmployeesQuery, useCreateEmployeeMutation } = apiSlice