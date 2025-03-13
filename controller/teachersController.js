const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const {
  ListAllDocument,
  AddNewDocument,
  UpdateDocument,
} = require("../helper/appWrite");
const { Query } = require("node-appwrite");

module.exports.ListTeachers = async (req, res, next) => {
  try {
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TEACHERS_COLLECTION
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

module.exports.AddTeacher = async (req, res, next) => {
  try {
    const {
      id,
      user,
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
    } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const newItem = {
      id,
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
      updated_on,
      updated_by,
    };
    const newTeacher = await AddNewDocument(
      newItem,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TEACHERS_COLLECTION
    );
    if (newTeacher) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New entry added",
        result: newTeacher,
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

module.exports.UpdateTeacher = async (req, res, next) => {
  try {
    const {
      id,
      user,
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
    } = req.body;

    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const updatedItem = {
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
      updated_on,
      updated_by,
    };
    const updatedTeacher = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TEACHERS_COLLECTION,
      id,
      updatedItem
    );
    if (updatedTeacher) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "Entry updated",
        result: updatedTeacher,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Entry not updated" });
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
