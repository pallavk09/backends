const {
  AddNewApplication,
  ListAllApplicationsForUser,
  UpdateApplicationStatus,
  ScheduleUpdateApplicationStatus,
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

module.exports.ListAllApplications = async (req, res, next) => {
  try {
    console.log(`Listing all applications`);
    const applicationList = await ListAllApplicationsForUser(null);
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
      `Error while listing all applications. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.UpdateApplicationStatus = async (req, res, next) => {
  try {
    const { documentId, currentStatus } = req.body;
    console.log("UpdateStatus: currentStatus -------------> ", currentStatus);
    const updatedApplication = await UpdateApplicationStatus(
      documentId,
      currentStatus
    );
    if (updatedApplication) {
      console.log("Application Status updated successfully");
      console.log(updatedApplication);

      return res.status(200).json({
        status: "SUCCESS",
        message: "Application status updated.",
        updatedApplication: updatedApplication,
      });
    } else {
      return res.status(500).json({
        status: "FAIL",
        message: "Failed to update application status",
      });
    }
  } catch (error) {
    const err = new Error(
      `Error while updating application status. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.ScheduleInterview = async (req, res, next) => {
  try {
    const { documentId, interviewDateSlot, currentStatus } = req.body;
    const updatedApplication = await ScheduleUpdateApplicationStatus(
      documentId,
      interviewDateSlot,
      currentStatus
    );
    if (updatedApplication) {
      console.log(
        "Interview scheduled and application status updated successfully"
      );
      console.log(updatedApplication);

      return res.status(200).json({
        status: "SUCCESS",
        message: "Interview scheduled and application status updated.",
        updatedApplication: updatedApplication,
      });
    } else {
      return res.status(500).json({
        status: "FAIL",
        message: "Failed to schedule interview and update application status",
      });
    }
  } catch (error) {
    const err = new Error(
      `Error while scheduling interview and updating application status. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};
