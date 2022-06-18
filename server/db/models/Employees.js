const mongoose = require("mongoose")
require("dotenv").config()

const connectionString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@sandbox.tuank.mongodb.net/spring22_ems`

mongoose.connect(connectionString, { useNewUrlParser: true, })
mongoose.connection.on("connected", () => console.log("Application is connected to database \"spring22_ems\""))

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    required: [true, 'Please provide First Name'],
    type: String,
  },
  lastName: {
    required: [true, 'Please provide Last Name'],
    type: String,
  },
  // userID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  age: {
    required: [true, 'Please provide Age'],
    // type: { type: Number, min: 20, max: 70 },
    type: Number
  },
  dateOfJoining: {
    required: [true, 'Please provide Date of Joining'],
    type: Date
  },
  // "G" or "G2"
  title: {
    required: [true, 'Please provive Title'],
    type: String,
    lowercase: true,
    enum: {
      values: ["employee", "manager", "director", "vp"],
      message: "Title must be between \"Employee\", \"Manager\", \"Director\", \"VP\" (case-insensitive)"
    }
  },
  department: {
    required: [true, 'Please provive Department'],
    type: String,
    lowercase: true,
    enum: {
      values: ["it", "marketing", "hr", "engineering"],
      message: "Department must be between \"IT\", \"Marketing\", \"HR\", \"Engineering\" (case-insensitive)"
    }
  },
  employeeType: {
    required: [true, 'Please provive Employee Type'],
    type: String,
    lowercase: true,
    enum: {
      values: ["fulltime", "parttime", "contract", "seasonal"],
      message: "Employee type must be between \"FullTime\", \"PartTime\", \"Contract\", \"Seasonal\" (case-insensitive)"
    }
  },
  currentStatus: {
    type: Boolean,
    default: true,
    required: function () {    // false when inserting new doc and true when update or findOneAndUpdate (when no context given in options) 
      return !this.employeeType
    }
  },
})

// EmployeeSchema.pre( "save", function( next ) {
//   const driver = this
//   bcrypt.hash( driver.carLicenceNumber, 10, ( error, hash ) => {
//     driver.carLicenceNumber = hash
//     next()
//   } )
// } )


// EmployeeSchema.pre( 'findOneAndUpdate', function( next ) {
//   this.options.runValidators = true
//   next()
// } )

// for updating
// const res = await Person.replaceOne({ _id: 24601 }, { name: 'Jean Valjean' });
// findOneAndReplace(filter, replacement, options, callback); // executes


const Employee = mongoose.model("Employee", EmployeeSchema)

module.exports = Employee