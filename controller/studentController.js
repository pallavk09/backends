const { AddNewStudent, ListAllStudentsForUser } = require("../helper/appWrite");
const { ExcludeMetaData } = require("../utils/utils");

module.exports.CreateNewStudent = async (req, res) => {
  try {
    const { userId, studentObj } = req.body;
    const newStudent = await AddNewStudent(userId, studentObj);
    if (newStudent) {
      return res.status(200).json({
        message: "New student created",
        newStudent: ExcludeMetaData(newStudent),
      });
    } else {
      return res.status(500).json({ error: "Failed to create student" });
    }
  } catch (error) {
    console.log("Error while creating new student");
    res.status(500).json({ status: "FAIL", message: error.message });
  }
};

module.exports.ListStudents = async (req, res) => {
  try {
    const { userId } = req.body;
    const studentList = await ListAllStudentsForUser(userId);
    if (studentList) {
      return res.status(200).json({
        status: "SUCCESS",
        result: studentList,
      });
    } else {
      return res.status(500).json({ error: "Failed to fetch students" });
    }
  } catch (error) {
    console.log("Error while getting students");
    res.status(500).json({ status: "FAIL", message: error.message });
  }
};

module.exports.UpdateStudent = async (req, res) => {
  try {
    const { userId, studentId } = req.body;
  } catch (error) {
    console.log("Error while updating student");
    res.status(500).json({ status: "FAIL", message: error.message });
  }
};
