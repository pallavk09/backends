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
      process.env.APPWRITE_STOP_COLLECTION
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
    const { user, id, stop_id, name, vehicle_id } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const newItem = {
      id,
      stop_id,
      name,
      vehicle_id,
      updated_on,
      updated_by,
    };
    const newStop = await AddNewDocument(
      newItem,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STOP_COLLECTION
    );
    if (newStop) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New entry added",
        result: newStop,
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
    const { user, id, stop_id, name, vehicle_id } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const updatedItem = {
      stop_id,
      name,
      vehicle_id,
      updated_on,
      updated_by,
    };
    const updatedStop = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STOP_COLLECTION,
      id,
      updatedItem
    );

    if (updatedStop) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "Entry updated",
        result: updatedStop,
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
