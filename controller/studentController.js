const {
  AddNewStudent,
  ListAllStudentsForUser,
  UploadProfilePhoto,
  UpdateExistingStudent,
  ListAllDocument,
} = require("../helper/appWrite");
const { ExcludeMetaData, CatchAsyncException } = require("../utils/utils");
const { Query } = require("node-appwrite");

module.exports.CreateNewStudent = async (req, res, next) => {
  try {
    const { userId, phone, studentObj } = req.body;
    console.log("CreateNewStudent: userId -------------> ", userId);
    const newStudent = await AddNewStudent(userId, phone, studentObj);
    if (newStudent) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New student created",
        newStudent: newStudent,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Failed to create student" });
    }
  } catch (error) {
    const err = new Error(
      `Error while creating new student. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.ListStudents = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const studentList = await ListAllStudentsForUser(userId);
    if (studentList) {
      //Update Siblings under users collection for this userId

      //Send respone to client
      return res.status(200).json({
        status: "SUCCESS",
        result: studentList,
      });
    } else {
      return res.status(404).json({ status: "SUCCESS", result: [] });
    }
  } catch (error) {
    const err = new Error(
      `Error while listing students. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.UpdateStudent = async (req, res, next) => {
  try {
    const { documentId, userId, phone, studentObj } = req.body;
    console.log("UpdateStudent: userId -------------> ", userId);
    const updatedStudent = await UpdateExistingStudent(
      userId,
      phone,
      documentId,
      studentObj
    );
    if (updatedStudent) {
      console.log("Student updated successfully");
      console.log(updatedStudent);

      return res.status(200).json({
        status: "SUCCESS",
        message: "New student created",
        updatedStudent: updatedStudent,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Failed to update student" });
    }
  } catch (error) {
    const err = new Error(
      `Error while updatig student. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

// module.exports.GetMatchingStudents = async (req, res, next) => {
//   const queryParams = req.body;

//   const queries = [];

//   for (const [key, value] of Object.entries(queryParams)) {
//     queries.push(Query.equal(key, [value]));
//   }
//   try {
//     console.log(queries);
//     return res.status(200).json({
//       status: "SUCCESS",
//       queries: queries,
//     });
//     //   const studentList = await ListAllDocument(
//     //     process.env.APPWRITE_DB_ID,
//     //     process.env.APPWRITE_STUDENTS_COLLECTION,
//     //     queries
//     //   );
//     //   if (studentList) {
//     //     //Send respone to client
//     //     return res.status(200).json({
//     //       status: "SUCCESS",
//     //       result: studentList,
//     //     });
//     //   } else {
//     //     return res.status(404).json({ status: "SUCCESS", result: [] });
//     //   }
//   } catch (error) {
//     // const err = new Error(
//     //   `Error while listing students for query: ${query}. Error: ${error.message}`
//     // );
//     const err = new Error(`Error`);
//     err.status = "FAIL";
//     err.statusCode = 500;

//     next(err);
//   }
// };
