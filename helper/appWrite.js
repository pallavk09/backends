const sdk = require("node-appwrite");
const moment = require("moment");
const {
  ParseStringify,
  ExcludeMetaData,
  FormatListStudentReponse,
} = require("../utils/utils");

const { ID, Query } = require("node-appwrite");
// const e = require("express");

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
    throw new Error(
      `Error while getting list of users. Error: ${error.message}. Stack: ${error.stack}`
    );
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
      return ParseStringify(newUser);
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(
      `Error while creating registration. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports.AddNewStudent = async (userId, phone, studentObj) => {
  try {
    const date = moment();
    const createdAt = date.format("D/MM/YYYY");
    const newStudentObj = {
      userId,
      phone,
      studentId: studentObj.id,
      personalDetails: JSON.stringify(studentObj.personalDetails),
      guardianDetails: JSON.stringify(studentObj.guardianDetails),
      academicsDetails: JSON.stringify(studentObj.academicsDetails),
      fees: studentObj.fees,
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
    throw new Error(
      `Error while adding new student for user: ${userId}. Error: ${error.message}. Stack: ${error.stack}`
    );
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

    return FormatListStudentReponse(studentList?.documents || []);
  } catch (error) {
    throw new Error(
      `Error while listing students for user: ${userId}. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports.GetRegisteredUser = async (userId) => {
  try {
    const studentList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_USERS_COLLECTION,
      [Query.equal("userId", [userId])]
    );

    return studentList?.documents || [];
  } catch (error) {
    throw new Error(
      `Error while listing RegisteredUser: ${userId}. Error: ${error.message}. Stack: ${error.stack}`
    );
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
    throw new Error(`Error while creating document: ${error.message}`);
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
    throw new Error(
      `Error while listing all document. DB: ${db_id}. Collection: ${collection_id}, Query: ${query}. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};
