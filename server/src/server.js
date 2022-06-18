const express = require('express')
const path = require('path')
const { ApolloServer, gql } = require("apollo-server-express")
const { ApolloError } = require('apollo-server-errors');
const { GraphQLScalarType, Kind } = require('graphql');
const http = require('http');
const Employee = require('../db/models/Employees');
const axios = require('axios').default;
require('dotenv').config()

const app = express()
// app.use(express.json())
app.use(require('body-parser').urlencoded({ extended: true }));


const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.toISOString().substring(0, 10); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    //return new Date(value);
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.INT) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
      //return new Date(parseInt(ast.value, 10));
    } else if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
      //return new Date(ast.value)
    }
    return null;
  }
})

const typeDefs = gql`
  scalar Date
  
  enum EmployeeType {
    fulltime
    FullTime
    parttime
    Parttime
    contract
    Contract
    seasonal
    Seasonal
  }

  type Employee {
    _id: ID
    age: Int
    currentStatus: Boolean
    dateOfJoining: Date
    department: String
    employeeType: EmployeeType
    firstName: String
    lastName: String
    title: String
  }

  input EmployeeQueryInput {
    _id: ID
    firstName: String
    lastName: String
    department: String
    age: Int
    currentStatus: Boolean
    employeeType: String
    title: String
    dateOfJoining: Date
  }

  input EmployeeInsertInput {
    lastName: String
    department: String
    age: Int
    currentStatus: Boolean
    firstName: String
    employeeType: String
    title: String
    _id: ID
    dateOfJoining: Date
  }
  input EmployeeInsertInput2 {
    lastName: String
    department: String
    age: String
    currentStatus: String
    firstName: String
    employeeType: String
    title: String
    _id: String
    dateOfJoining: String
  }

  type Query {
    getEmployees: [Employee]
    employee(query: EmployeeQueryInput): Employee
  }

  type Mutation {
    insertOneEmployee(data: EmployeeInsertInput2!): Employee
  }
`

class MyError extends ApolloError {
  constructor(message) {
    super(message, 'MY_ERROR_CODE');

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}

const resolvers = {
  Date: dateScalar,
  Query: {
    getEmployees: async () => {
      // mongodb.db.collection("employees").find({});
      try {
        emps = await Employee.find({}).exec()
        return emps
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    insertOneEmployee: async (parent, args) => {
      const employee = new Employee(args.data)
      try {
        await employee.save()
      } catch (error) {
        const errorsJson = error.errors ? Object.keys(error.errors).reduce(
          (errorObj, key) => ({ ...errorObj, [key]: error.errors[key].message }), {}) : {}
        console.log(errorsJson)
        throw new MyError(JSON.stringify(errorsJson))
      }
      return employee
    }
  },
}

async function startApolloServer() {
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    dateScalar,
    typeDefs,
    resolvers,
    // mocks: true,
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen(process.env.PORT, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
}

(async () => {
  try {
    await startApolloServer()
  } catch (err) {
    console.log(err);
  }
})()

app.use(express.static(path.join(__dirname, 'dist')))

app.post('/insertEmployee', async (req, res) => {
  const employee = new Employee(req.body)
  try {
    await employee.save()
  } catch (error) {
    console.log(error)
    const errorsJson = error.errors ? Object.keys(error.errors).reduce(
      (errorObj, key) => ({ ...errorObj, [key]: error.errors[key].message }), {}) : {}
    res.status(400).json(errorsJson)
  }
  res.redirect('/')
})

app.get('/getEmployees', async (req, res) => {
  let emps
  try {
    emps = await Employee.find({}).exec()
  } catch (error) {
    console.log(error)
    const errorsJson = error.errors ? Object.keys(error.errors).reduce(
      (errorObj, key) => ({ ...errorObj, [key]: error.errors[key].message }), {}) : {}
    res.status(400).json(errorsJson)
  }
  res.status(200).send(emps)
})