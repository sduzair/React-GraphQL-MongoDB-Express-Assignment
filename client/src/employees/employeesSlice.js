// import { createSlice } from "node_modules/@reduxjs/toolkit/dist/createSlice"

// export const employeesSlice = createSlice({
//   name: 'employees',
//   initialState,
//   reducers: {
//     getAll: (state, action) => {
//       action.payload.forEach(emp => {
//         state.push(emp)
//       })
//     },
//   },
// })

// // these are called action creaters
// export const { getAll } = employeesSlice.actions

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const getAllAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(getAll())
//   }, 1000)
// }

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectEmployees = (state) => state.employees

// export default employeesSlice.reducer



//   // useEffect(() => {
//   //   const query = `query {
//   //     issueList {
//   //       id title,
//   //       created
//   //     }
//   //   }`
//   //   async function queryAPI() {
//   //     const response = await fetch('', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ query })
//   //     });
//   //     setEmployees(response.json().issueList);
//   //   };
//   //   queryAPI();

//   // })