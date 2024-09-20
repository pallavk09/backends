const sdk = require("node-appwrite");
const moment = require("moment");
const {
  ParseStringify,
  ExcludeMetaData,
  FormatListStudentReponse,
} = require("../utils/utils");

const { ID, Query } = require("node-appwrite");

const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
  .setKey(process.env.APPWRITE_PROJECT_KEY);

let users = new sdk.Users(client);
let database = new sdk.Databases(client);

// module.exports.trycheckIfUserExists = async (req, res) => {
//   const result = await this.checkIfUserExists("+918580370340");
//   console.log("User result", result);
//   if (result) return res.status(200).json({ message: "User Exists" });
//   else return res.status(404).json({ message: "User not found" });
// };

module.exports.trycreateAppwriteUser = async (req, res) => {
  const user = await this.createRegistration("+918580370340");
  if (user) return res.status(200).json({ newUser: ExcludeMetaData(user) });
  else return res.status(404).json({ message: "User creation failed" });
};

module.exports.GetUsers = async (phoneNumber) => {
  try {
    console.log("Inside GetUsers");
    const results = await users.list([Query.equal("phone", [phoneNumber])]);
    return results?.users[0];
  } catch (error) {
    console.log("Error while checking for user: ", error.message);
  }
};

module.exports.createRegistration = async (phone) => {
  try {
    const userId = ID.unique();
    const newRegistration = await users.create(
      userId,
      undefined,
      phone,
      undefined,
      undefined
    );
    if (newRegistration) {
      const date = moment();
      const createdAt = date.format("D/MM/YYYY");
      const newUserObj = {
        userId,
        phone,
        role: "student",
        otpVerified: true,
        siblings: [],
        createdAt,
      };
      //Creating new document under User collection
      const newUser = await AddNewDocument(
        newUserObj,
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_USERS_COLLECTION
      );
      console.log("New Registration created:", newUser.$id);
      return ParseStringify(newUser);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating registration:", error.message);
  }
};

module.exports.AddNewStudent = async (userId, studentObj) => {
  try {
    const date = moment();
    const createdAt = date.format("D/MM/YYYY");
    const newStudentObj = {
      userId,
      studentId: studentObj.id,
      personalDetails: JSON.stringify(studentObj.personalDetails),
      guardianDetails: JSON.stringify(studentObj.guardianDetails),
      academicsDetails: JSON.stringify(studentObj.academicsDetails),
      fees: [],
      newAdmission: studentObj.newAdmission,
      createdAt,
    };
    const newStudent = await AddNewDocument(
      newStudentObj,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION
    );
    console.log("New Student created:", newStudent.$id);
    return ParseStringify(newStudent);
  } catch (error) {
    console.error("Error creating student:", error.message);
  }
};

module.exports.ListAllStudentsForUser = async (userId) => {
  try {
    const studentList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION,
      [Query.equal("userId", [userId])]
    );
    // return studentList?.documents;
    return FormatListStudentReponse(studentList?.documents);
  } catch (error) {
    console.error("Error listing documents:", error.message);
  }
};

const AddNewDocument = async (newDocumentObj, db_id, collection_id) => {
  const documentId = ID.unique();
  try {
    const newDocument = await database.createDocument(
      db_id,
      collection_id,
      documentId,
      newDocumentObj
    );
    return ParseStringify(newDocument);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};

const ListAllDocument = async (db_id, collection_id, query) => {
  try {
    const documentList = await database.listDocuments(
      db_id,
      collection_id,
      query
    );
    return ParseStringify(documentList);
  } catch (error) {
    console.error("Error listing documents:", error.message);
  }
};
