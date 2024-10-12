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
let storage = new sdk.Storage(client);

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

module.exports.createRegistration = async (phone, type) => {
  console.log("Inside createRegistration");
  console.log("Phone and type received as :", phone, type);
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
      console.log("New Registration created");
      if (type === "STUDENT") {
        console.log("Type is STUDENT");
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
        console.log("Adding New Document for STUDENT");
        const newUser = await AddNewDocument(
          newUserObj,
          process.env.APPWRITE_DB_ID,
          process.env.APPWRITE_USERS_COLLECTION
        );
        return ParseStringify(newUser);
      } else if (type === "NEWADMISSION") {
        return newRegistration;
        // const date = moment();
        // console.log("Type is NEW ADMISSION");
        // const createdAt = date.format("D/MM/YYYY");
        // const newUserObj = {
        //   fileUrl: "",
        //   userId,
        //   phone,
        //   emailId: "",
        //   applicationId: "",
        //   applicationData: "",
        //   submissionDate: "",
        //   status: "",
        //   statusUpdatedOn: "",
        //   role: "newadmission",
        //   createdAt,
        // };
        // //Creating new document under new-admission collection
        // console.log("Adding New Document for NEW ADMISSION");
        // const newUser = await AddNewDocument(
        //   newUserObj,
        //   process.env.APPWRITE_DB_ID,
        //   process.env.APPWRITE_NEW_ADMISSION_COLLECTION
        // );
        // return ParseStringify(newUser);
      } else {
        console.log(
          `Error: Phone: ${phone}. Type: ${type}. ${error.message}. Stack: ${error.stack}`
        );
        throw new Error(`Registration type unknown`);
      }
    } else {
      console.log(
        `Registration failed. Error: Phone: ${phone}. Type: ${type}. ${error.message}. Stack: ${error.stack}`
      );
      throw new Error(`Registration failed.`);
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
      photoUrl: studentObj.photoUrl,
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

module.exports.UpdateExistingStudent = async (
  userId,
  phone,
  documentId,
  studentObj
) => {
  try {
    const date = moment();
    const updatedAt = date.format("D/MM/YYYY");
    const updatedStudentObj = {
      userId,
      phone,
      studentId: studentObj.id,
      photoUrl: studentObj.photoUrl,
      personalDetails: JSON.stringify(studentObj.personalDetails),
      guardianDetails: JSON.stringify(studentObj.guardianDetails),
      academicsDetails: JSON.stringify(studentObj.academicsDetails),
      fees: studentObj.fees,
      newAdmission: studentObj.newAdmission,
      updatedAt,
    };
    const updatedStudent = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION,
      documentId,
      updatedStudentObj
    );
    console.log(
      "Inside UpdateExistingStudent method returning updated student"
    );
    console.log(updatedStudent);
    return ParseStringify(updatedStudent);
  } catch (error) {
    throw new Error(
      `Error while updating student for user: ${userId}. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports.UploadFileToStorage = async (
  db_id,
  collection_id,
  bucket_id,
  photoUrl,
  document_id
) => {
  try {
    const uploadImage = await AddFileToStorage(bucket_id, photoUrl);
    if (uploadImage) {
      const updatedDocument = await UpdateDocument(
        db_id,
        collection_id,
        document_id
      );
    }

    return updatedDocument;
  } catch (error) {
    error.message;
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

module.exports.AddNewApplication = async (applicationObj) => {
  try {
    console.log(
      "========== AddNewApplication. Started ========================"
    );
    const date = moment();
    const currentDate = date.format("D/MM/YYYY");

    const newApplicationObj = {
      photoUrl: applicationObj?.photoUrl,
      userId: applicationObj.userId,
      phone: applicationObj.phone,
      emailId: applicationObj.emailId,
      applicationId: applicationObj.applicationId,
      currentStatus: applicationObj.status,
      role: applicationObj.role,
      submissionDate: currentDate,
      createdAt: currentDate,
      statusUpdatedOn: "",
      applicationData: applicationObj.applicationData,
      submissionStatus: applicationObj.submissionStatus,
      paymentStatus: applicationObj.paymentStatus,
      transactionId: "",
    };

    const newApplicationResponse = await AddNewDocument(
      newApplicationObj,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_NEW_ADMISSION_COLLECTION
    );
    console.log("New Application created:", newApplicationResponse.$id);

    console.log("========== AddNewApplication. Ended ========================");
    return newApplicationResponse;
  } catch (error) {
    throw new Error(
      `Error while adding new application for userId: ${userId}. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports.ListAllApplicationsForUser = async (userId) => {
  try {
    const applicationList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_NEW_ADMISSION_COLLECTION,
      [Query.equal("userId", [userId])]
    );
    console.log("Applications listed");
    return applicationList?.documents || [];
  } catch (error) {
    throw new Error(
      `Error while listing applications for user: ${userId}. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const AddNewDocument = async (newDocumentObj, db_id, collection_id) => {
  const documentId = ID.unique();
  console.log("========== AddNewDocument. Started ========================");
  console.log("Payload received: ");
  console.log(newDocumentObj);
  try {
    const newDocument = await database.createDocument(
      db_id,
      collection_id,
      documentId,
      newDocumentObj
    );
    console.log("========== AddNewDocument. Created ========================");
    return newDocument;
  } catch (error) {
    console.log("Error while adding new document: ", error.message);
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

const AddFileToStorage = async (bucket_id, file) => {
  try {
    const Id = ID.unique();
    const result = await storage.createFile(bucket_id, Id, file);
    if (result) {
      const imageUrl = result.$id; // Get the file ID or URL
      return imageUrl;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(
      `Error while uploading to storage. DB: ${db_id}. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};

const UpdateDocument = async (db_id, collection_id, document_id, updateObj) => {
  try {
    const updatedDocument = await database.updateDocument(
      db_id,
      collection_id,
      document_id,
      updateObj
    );
    console.log("Document updated successfully");
    console.log(updatedDocument);
    return updatedDocument;
  } catch (error) {
    throw new Error(
      `Error while updating document. COLLECTION ID: ${collection_id}, updateObj: ${updateObj}. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};
