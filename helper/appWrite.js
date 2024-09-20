const sdk = require("node-appwrite");

const { ID, Query } = require("node-appwrite");

const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
  .setKey(process.env.APPWRITE_PROJECT_KEY);

let users = new sdk.Users(client);

// module.exports.trycheckIfUserExists = async (req, res) => {
//   const result = await this.checkIfUserExists("+918580370340");
//   console.log("User result", result);
//   if (result) return res.status(200).json({ message: "User Exists" });
//   else return res.status(404).json({ message: "User not found" });
// };

// module.exports.trycreateAppwriteUser = async (req, res) => {
//   const user = await this.createAppwriteUser("+918580370340");
//   console.log("User: ", user);
//   if (user)
//     return res.status(200).json({ message: `User Created: ${user.$id}` });
//   else return res.status(404).json({ message: "User creation failed" });
// };

module.exports.checkIfUserExists = async (phoneNumber) => {
  try {
    console.log("Inside checkIfUserExists");
    const results = await users.list([Query.equal("phone", [phoneNumber])]);
    return results?.users[0];
  } catch (error) {
    console.log("Error while checking for user: ", error.message);
  }
};

module.exports.createAppwriteUser = async (phoneNumber) => {
  try {
    const user = await users.create(
      ID.unique(),
      undefined,
      phoneNumber,
      undefined,
      undefined
    );
    console.log("User created in Appwrite:", user.$id);
    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};
