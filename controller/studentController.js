const { AddNewStudent, ListAllStudentsForUser } = require("../helper/appWrite");
const { ExcludeMetaData, CatchAsyncException } = require("../utils/utils");

module.exports.CreateNewStudent = async (req, res, next) => {
  try {
    const { userId, phone, studentObj } = req.body;
    console.log("CreateNewStudent: userId -------------> ", userId);
    const newStudent = await AddNewStudent(userId, phone, studentObj);
    if (newStudent) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New student created",
        newStudent: ExcludeMetaData(newStudent),
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

module.exports.UpdateStudent = async (req, res) => {
  try {
    const { userId, studentId } = req.body;
  } catch (error) {
    const err = new Error(
      `Error while updating students. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};
