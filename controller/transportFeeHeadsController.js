const moment = require("moment");
const {
  AddNewDocument,
  UpdateDocument,
  ListAllDocument,
  AddMultipleDocuments,
} = require("../helper/appWrite");

module.exports.Get = async (req, res, next) => {
  try {
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE
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
    const { user, arrayOfItems } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";

    const newItems = await AddMultipleDocuments(
      arrayOfItems,
      updated_on,
      updated_by,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_CLASSES_COLLECTION
    );
    if (newItems) {
      return res.status(200).json({
        status: "SUCCESS",
        message: `Added ${newItems.length} documents`,
        // result: newSubject,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Entry not added" });
    }
  } catch (error) {
    const err = new Error(`Exception: ${error.message}`);
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.Update = async (req, res, next) => {
  try {
    const arrayOfItems = req.body;

    const updatedItems = await UpdateMultipleDocuments(
      arrayOfItems,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_CLASSES_COLLECTION
    );
    if (updatedItems) {
      return res.status(200).json({
        status: "SUCCESS",
        message: `Updated ${updatedItems.length} documents`,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "Entry not updated" });
    }
  } catch (error) {
    const err = new Error(`Exception: ${error.message}`);
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};
