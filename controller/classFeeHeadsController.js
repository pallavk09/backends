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
      process.env.APPWRITE_FEE_HEADS_COLLECTION
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
    const { id, user, feehead_id, title, amount, frequency } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const _frequency = frequency || "";
    const newItem = {
      id,
      feehead_id,
      title,
      amount,
      frequency: _frequency,
      updated_on,
      updated_by,
    };
    const newfeeHead = await AddNewDocument(
      newItem,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_FEE_HEADS_COLLECTION
    );
    if (newfeeHead) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New entry added",
        result: newfeeHead,
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
    const { id, user, feehead_id, title, amount, frequency } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const _frequency = frequency || "";
    const updatedItem = {
      feehead_id,
      title,
      amount,
      frequency: _frequency,
      updated_on,
      updated_by,
    };
    const updatedfeeHead = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_FEE_HEADS_COLLECTION,
      id,
      updatedItem
    );

    if (updatedfeeHead) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "Entry updated",
        result: updatedfeeHead,
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
