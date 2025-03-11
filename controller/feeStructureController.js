const moment = require("moment");
const {
  ListAllDocument,
  AddMultipleDocuments,
  UpdateMultipleDocuments,
  DeleteAllDocument,
} = require("../helper/appWrite");

module.exports.GetTransportFeeStructure = async (req, res, next) => {
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

module.exports.GetStopWiseTotalFees = async (req, res, next) => {
  try {
    const response = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE
    );
    const stopwiseFees = {};
    response.documents.forEach((feeStructure) => {
      const stopName = feeStructure.stop_name;

      // Parse monthly_fees JSON
      const monthlyFeesArray = JSON.parse(feeStructure.monthly_fees);

      // Initialize class entry
      if (!stopwiseFees[stopName]) {
        stopwiseFees[stopName] = {
          total: 0,
          monthwise: {},
        };
      }

      // Process each month's fee
      monthlyFeesArray.forEach((monthEntry) => {
        const { month, total_fees } = monthEntry;

        // Store month-wise fee
        stopwiseFees[stopName].monthwise[month] = total_fees;

        // Add to total fees for the class
        stopwiseFees[stopName].total += total_fees;
      });
    });

    if (stopwiseFees && Object.entries(stopwiseFees).length > 0) {
      return res.status(200).json({
        status: "SUCCESS",
        result: stopwiseFees,
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

module.exports.AddTransportFeeStructure = async (req, res, next) => {
  try {
    const { user, arrayOfItems } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";

    const newItems = await AddMultipleDocuments(
      arrayOfItems,
      updated_on,
      updated_by,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE
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

module.exports.UpdateTransportFeeStructure = async (req, res, next) => {
  try {
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE
    );
    if (itemList && itemList.documents.length > 0) {
      await DeleteAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE
      );
    }

    const { user, arrayOfItems } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";

    const newItems = await AddMultipleDocuments(
      arrayOfItems,
      updated_on,
      updated_by,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE
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

    // // const updatedItems = await UpdateMultipleDocuments(
    // //   arrayOfItems,
    // //   updated_on,
    // //   updated_by,
    // //   process.env.APPWRITE_DB_ID,
    // //   process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE
    // // );
    // // if (updatedItems) {
    // //   return res.status(200).json({
    // //     status: "SUCCESS",
    // //     message: `Updated ${updatedItems.length} documents`,
    // //   });
    // // } else {
    // //   return res
    // //     .status(500)
    // //     .json({ status: "FAIL", message: "Entry not updated" });
    // // }
  } catch (error) {
    const err = new Error(`Exception: ${error.message}`);
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.GetClassFeeStructure = async (req, res, next) => {
  try {
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_CLASS_FEE_STRUCTURE
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

module.exports.GetClassWiseTotalFees = async (req, res, next) => {
  try {
    const response = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_CLASS_FEE_STRUCTURE
    );
    const classwiseFees = {};
    response.documents.forEach((feeStructure) => {
      const className = feeStructure.class;

      // Parse monthly_fees JSON
      const monthlyFeesArray = JSON.parse(feeStructure.monthly_fees);

      // Initialize class entry
      if (!classwiseFees[className]) {
        classwiseFees[className] = {
          total: 0,
          monthwise: {},
        };
      }

      // Process each month's fee
      monthlyFeesArray.forEach((monthEntry) => {
        const { month, total_fees } = monthEntry;

        // Store month-wise fee
        classwiseFees[className].monthwise[month] = total_fees;

        // Add to total fees for the class
        classwiseFees[className].total += total_fees;
      });
    });

    if (classwiseFees && Object.entries(classwiseFees).length > 0) {
      return res.status(200).json({
        status: "SUCCESS",
        result: classwiseFees,
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

module.exports.AddClassFeeStructure = async (req, res, next) => {
  try {
    const { user, arrayOfItems } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";

    const newItems = await AddMultipleDocuments(
      arrayOfItems,
      updated_on,
      updated_by,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_CLASS_FEE_STRUCTURE
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

module.exports.UpdateClassFeeStructure = async (req, res, next) => {
  try {
    const { user, arrayOfItems } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";

    const updatedItems = await UpdateMultipleDocuments(
      arrayOfItems,
      updated_on,
      updated_by,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_CLASS_FEE_STRUCTURE
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
