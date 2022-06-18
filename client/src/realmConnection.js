// import * as Realm from "realm-web";

// const APP_ID = "spring22-afs-assignment-tblxy"

// export const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

// console.log(graphqlUri);

// // Connect to your MongoDB Realm app
// const app = new Realm.App(APP_ID);
// // Gets a valid Realm user access token to authenticate requests
// export async function getValidAccessToken() {
//   // Guarantee that there's a logged in user with a valid access token
//   if (!app.currentUser) {
//     // If no user is logged in, log in an anonymous user. The logged in user will have a valid
//     // access token.
//     await app.logIn(Realm.Credentials.anonymous());
//   } else {
//     // An already logged in user's access token might be stale. To guarantee that the token is
//     // valid, we refresh the user's custom data which also refreshes their access token.
//     await app.currentUser.refreshCustomData();
//   }
//   return app.currentUser.accessToken;
// }