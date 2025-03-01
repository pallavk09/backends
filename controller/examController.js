const moment = require("moment");
const {
  AddNewDocument,
  UpdateDocument,
  ListAllDocument,
} = require("../helper/appWrite");

module.exports.Get = async (req, res, next) => {
  try {
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_EXAM_COLLECTION
    );
    if (itemList) {
      return res.status(200).json({
        status: "SUCCESS",
        result: itemList,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Unable to fetch" });
    }
  } catch (error) {
    const err = new Error(
      `Exception. Unable to fetch. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.Add = async (req, res, next) => {
  try {
    const {
      id,
      user,
      exam_id,
      session,
      code,
      name,
      max_marks,
      pass_marks,
      total_working_days,
    } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const newItem = {
      id,
      exam_id,
      session,
      code,
      name,
      max_marks,
      pass_marks,
      total_working_days,
      updated_on,
      updated_by,
    };
    const newExam = await AddNewDocument(
      newItem,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_EXAM_COLLECTION
    );
    if (newExam) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New entry added",
        result: newExam,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Entry not added" });
    }
  } catch (error) {
    const err = new Error(
      `Exception. Entry not updated. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.Update = async (req, res, next) => {
  try {
    const {
      id,
      user,
      exam_id,
      session,
      code,
      name,
      max_marks,
      pass_marks,
      total_working_days,
    } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const updatedItem = {
      exam_id,
      session,
      code,
      name,
      max_marks,
      pass_marks,
      total_working_days,
      updated_on,
      updated_by,
    };
    const updatedExam = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_EXAM_COLLECTION,
      id,
      updatedItem
    );

    if (updatedExam) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "Entry updated",
        result: updatedExam,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Entry not updated" });
    }
  } catch (error) {
    const err = new Error(`Exception. Entry not updated: ${error.message}`);
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};
