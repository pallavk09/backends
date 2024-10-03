const {
  AddNewApplication,
  ListAllApplicationsForUser,
} = require("../helper/appWrite");

module.exports.CreateNewApplication = async (req, res, next) => {
  try {
    console.log(
      "========== CreateNewApplication. Started ========================"
    );

    const applicationObj = req.body;
    console.log("Data received as");
    console.log(applicationObj);
    const newApplicationResponse = await AddNewApplication(applicationObj);

    if (newApplicationResponse) {
      console.log(
        "========== CreateNewApplication. Success. Ended ========================"
      );
      return res.status(200).json({
        status: "SUCCESS",
        message: "New application created",
        newApplication: newApplicationResponse,
      });
    } else {
      console.log(
        "========== CreateNewApplication. Failed. Ended ========================"
      );
      return res
        .status(500)
        .json({ status: "FAIL", message: "Failed to create new application" });
    }
  } catch (error) {
    console.log(
      "========== CreateNewApplication. Error. Ended ========================"
    );
    const err = new Error(
      `Error while creating new applications. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.ListApplications = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log(`Listing application for ${userId}`);
    const applicationList = await ListAllApplicationsForUser(userId);
    console.log(applicationList);
    if (applicationList) {
      //Send respone to client
      return res.status(200).json({
        status: "SUCCESS",
        result: applicationList,
      });
    } else {
      return res.status(404).json({ status: "SUCCESS", result: [] });
    }
  } catch (error) {
    const err = new Error(
      `Error while listing applications. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};
