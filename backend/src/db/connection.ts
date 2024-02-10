// import {connect, disconnect} from "mongoose";
// async function connectToDatabase() {
//     try {
//        await connect(process.env.MONGODB_URL)
//     }
//     catch (e) {
//        throw new Error("Cannot connect to MongoDB");
//     }
// }
//
// async function disconnectFromDatabase() {
//   try {
//       await disconnect();
//   }  catch (e) {
//       console.log(e);
//       throw new Error("Could not disconnect from MongoDB");
//   }
// }
//
// export { connectToDatabase, disconnectFromDatabase };