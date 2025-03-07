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
      process.env.APPWRITE_EXAM_SCHEDULE
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
    const { id, user, schedule_id, class_id, exam_id, session, exam_schedule } =
      req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const newItem = {
      id,
      schedule_id,
      class_id,
      exam_id,
      session,
      exam_schedule,
      updated_on,
      updated_by,
    };
    const newSchedule = await AddNewDocument(
      newItem,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_EXAM_SCHEDULE
    );
    if (newSchedule) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New entry added",
        result: newSchedule,
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
    const { id, user, schedule_id, class_id, exam_id, session, exam_schedule } =
      req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const updatedItem = {
      schedule_id,
      class_id,
      exam_id,
      session,
      exam_schedule,
      updated_on,
      updated_by,
    };
    const updatedSchedule = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_EXAM_SCHEDULE,
      id,
      updatedItem
    );

    if (updatedSchedule) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "Entry updated",
        result: updatedSchedule,
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
