const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const {
  AddNewStudent,
  ListAllStudentsForUser,
  UploadProfilePhoto,
  UpdateExistingStudent,
  ListAllDocument,
  AddNewDocument,
  UpdateDocument,
  UpdateMultipleDocuments,
} = require("../helper/appWrite");
const { ExcludeMetaData, CatchAsyncException } = require("../utils/utils");
const { Query } = require("node-appwrite");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

module.exports.ListStudents = async (req, res, next) => {
  try {
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION
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

module.exports.AddStudent = async (req, res, next) => {
  try {
    const {
      id,
      user,
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
    } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const newItem = {
      id,
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
      updated_on,
      updated_by,
    };
    const newStudent = await AddNewDocument(
      newItem,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION
    );
    if (newStudent) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New entry added",
        result: newStudent,
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

module.exports.UpdateStudent = async (req, res, next) => {
  try {
    const {
      id,
      user,
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
    } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const updatedItem = {
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
      updated_on,
      updated_by,
    };
    const updatedStudent = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION,
      id,
      updatedItem
    );
    if (updatedStudent) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "Entry updated",
        result: updatedStudent,
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

module.exports.ListAcademicRecords = async (req, res, next) => {
  try {
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_ACADEMIC_RECORDS
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

module.exports.ListAcademicRecordStudent = async (req, res, next) => {
  try {
    const { student_id } = req.body;
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_ACADEMIC_RECORDS,
      [Query.equal("student_id", [student_id])]
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

module.exports.ListAcademicRecordClassSection = async (req, res, next) => {
  try {
    const { class_id, section_id } = req.body;
    const itemList = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_ACADEMIC_RECORDS,
      [
        Query.equal("class_id", [class_id]),
        Query.equal("section_id", [section_id]),
      ]
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

module.exports.AddNewAcademicRecord = async (req, res, next) => {
  try {
    const {
      id,
      user,
      academic_record_id,
      student_id,
      name,
      academic_year,
      class_id,
      class_name,
      section_id,
      section,
      roll_number,
      performance,
      remarks,
    } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const newItem = {
      id,
      academic_record_id,
      student_id,
      name,
      academic_year,
      class_id,
      class_name,
      section_id,
      section,
      roll_number,
      performance,
      remarks,
      updated_on,
      updated_by,
    };
    const newRecord = await AddNewDocument(
      newItem,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_ACADEMIC_RECORDS
    );
    if (newRecord) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "New entry added",
        result: newRecord,
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

module.exports.UpdateAcademicRecord = async (req, res, next) => {
  try {
    const {
      id,
      user,
      academic_record_id,
      student_id,
      name,
      academic_year,
      class_id,
      class_name,
      section_id,
      section,
      roll_number,
      performance,
      remarks,
    } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";
    const updatedItem = {
      id,
      academic_record_id,
      student_id,
      name,
      academic_year,
      class_id,
      class_name,
      section_id,
      section,
      roll_number,
      performance,
      remarks,
      updated_on,
      updated_by,
    };
    const updatedRecord = await UpdateDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_ACADEMIC_RECORDS,
      id,
      updatedItem
    );
    if (updatedRecord) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "Entry updated",
        result: updatedRecord,
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

module.exports.UpdateMultipleAcademicRecords = async (req, res, next) => {
  try {
    const { user, arrayOfItems } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";

    const updatedItems = await UpdateMultipleDocuments(
      arrayOfItems,
      updated_on,
      updated_by,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_ACADEMIC_RECORDS
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
    const err = new Error(
      `Exception. Entry not updated. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.GetClassWiseStudentCount = async (req, res, next) => {
  try {
    let allStudents = [];
    let offset = 0;
    const limit = 25; // Max limit per request

    while (true) {
      const response = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_ACADEMIC_RECORDS,
        [Query.limit(limit), Query.offset(offset)]
      );

      allStudents = allStudents.concat(response.documents);

      if (response.documents.length < limit) break; // Stop when fewer results are returned

      offset += limit; // Move to the next batch
    }

    // Aggregate class-wise counts
    const studentCount = allStudents.reduce((acc, student) => {
      acc[student.class_name] = (acc[student.class_name] || 0) + 1;
      return acc;
    }, {});

    if (studentCount) {
      return res.status(200).json({
        status: "SUCCESS",
        result: studentCount,
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

module.exports.GetStopWiseStudentCount = async (req, res, next) => {
  try {
    let allStudents = [];
    let offset = 0;
    const limit = 25; // Max limit per request

    while (true) {
      const response = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_STUDENTS_COLLECTION,
        [Query.limit(limit), Query.offset(offset)]
      );

      allStudents = allStudents.concat(response.documents);

      if (response.documents.length < limit) break; // Stop when fewer results are returned

      offset += limit; // Move to the next batch
    }

    // Aggregate stop-wise student count using reduce()
    const stopWiseCount = allStudents.reduce((acc, student) => {
      if (student.transport_details) {
        const transportDetails = JSON.parse(student.transport_details);
        const stopName = transportDetails.stop_name;

        if (stopName) {
          acc[stopName] = (acc[stopName] || 0) + 1;
        }
      }
      return acc;
    }, {});

    if (stopWiseCount) {
      return res.status(200).json({
        status: "SUCCESS",
        result: stopWiseCount,
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

module.exports.GetFeeStatusSummary = async (req, res, next) => {
  try {
    let allStudents = [];
    let allFees = [];
    let offset = 0;
    const limit = 100; // AppWrite limit per request

    // Fetch all student records
    while (true) {
      const response = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_STUDENTS_COLLECTION,
        [Query.limit(limit), Query.offset(offset)]
      );

      allStudents = allStudents.concat(response.documents);
      if (response.documents.length < limit) break;
      offset += limit;
    }

    // Fetch all student fee records
    offset = 0;
    while (true) {
      const response = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_FEE_COLLECTION_RECORDS,
        [Query.limit(limit), Query.offset(offset)]
      );

      allFees = allFees.concat(response.documents);
      if (response.documents.length < limit) break;
      offset += limit;
    }

    //CHECKING IF ANY FEE HEADSS ARE PENDING THROUGH PREVIOUS MONTHS
    const hasPendingFees = allFees.some((student) => {
      const monthlyPayments = JSON.parse(student.monthly_payments);
      const paymentsByMonth = {};

      // Group payments by month
      monthlyPayments.forEach((payment) => {
        const key = `${payment.month}-${payment.year}`;
        if (!paymentsByMonth[key]) {
          paymentsByMonth[key] = [];
        }
        paymentsByMonth[key].push(payment);
      });

      // Check if any month's last payment still has pending fees
      return Object.values(paymentsByMonth).some((payments) => {
        // Sort payments by payment_date to get the latest one
        payments.sort(
          (a, b) => new Date(a.payment_date) - new Date(b.payment_date)
        );
        const latestPayment = payments[payments.length - 1];

        // If the latest payment still has pending fees, return true
        return Object.keys(latestPayment.pending_fees).length > 0;
      });
    });

    console.log("************ hasPendingFees *********************");
    console.log(hasPendingFees);

    // Create a lookup table for student fee records
    const feeRecordsMap = allFees.reduce((acc, feeRecord) => {
      acc[feeRecord.student_id] = {
        monthly_payments: feeRecord.monthly_payments || [],
        last_payment_date: feeRecord.last_payment_date || "",
      };
      return acc;
    }, {});

    // Get current month and today's date
    const currentDate = new Date(); //SAMPLE: Mon Mar 10 2025 19:01:02 GMT+0530 (India Standard Time)
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    }); //SAMPLE: 'March'
    const today = currentDate.getDate();

    // Define default payment deadline
    const paymentDeadline = process.env.FEE_PAYMENT_DEADLINE;

    // Merge student data with fee records
    const studentFeeSummary = allStudents.map((student) => {
      const studentId = student.student_id;
      const feeRecord = feeRecordsMap[studentId] || null;

      // Parse `personal_details` and `father_details`
      let studentName = "N/A";
      let contact = "N/A";

      try {
        if (student.personal_details) {
          const parsedDetails = JSON.parse(student.personal_details);
          studentName = parsedDetails.name || "N/A";
        }
        if (student.father_details) {
          const parsedFatherDetails = JSON.parse(student.father_details);
          contact = parsedFatherDetails.contact || "N/A";
        }
      } catch (error) {
        console.error(`Error parsing details for student ${studentId}:`, error);
      }

      // Extract last payment date & determine status
      const lastPaid = feeRecord ? feeRecord.last_payment_date || "" : "";

      const pendingMonths = CheckPendingPayment(lastPaid, paymentDeadline);
      let status =
        pendingMonths.length === 0
          ? !hasPendingFees
            ? "Paid"
            : "Partial"
          : "Pending";

      return {
        student_id: studentId,
        admission_id: student.admission_id,
        name: studentName,
        class_name: student.class_name,
        section_name: student.section_name,
        roll_number: student.roll_number || "NA",
        contact: contact,
        last_paid: lastPaid,
        status: status,
      };
    });

    if (studentFeeSummary) {
      return res.status(200).json({
        status: "SUCCESS",
        result: studentFeeSummary,
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

module.exports.GetPendingFeeParticulars = async (req, res, next) => {
  try {
    const { student_id } = req.body;
    let student_fee_collection_records = [];
    let student_transport_collection = [];
    let offset = 0;
    const limit = 25;
    const previous_pending_heads = [];
    const paymentsByMonth = {};

    // Fetch all student class fee records
    offset = 0;
    while (true) {
      const response = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_FEE_COLLECTION_RECORDS,
        [
          Query.equal("student_id", [student_id]),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );

      student_fee_collection_records = student_fee_collection_records.concat(
        response.documents
      );
      if (response.documents.length < limit) break;
      offset += limit;
    }

    const hasRecord =
      student_fee_collection_records &&
      student_fee_collection_records.length > 0;

    if (hasRecord) {
      const monthly_payments_str =
        student_fee_collection_records[0].monthly_payments;
      const monthly_payments_JSON = JSON.parse(monthly_payments_str);

      monthly_payments_JSON.forEach((payment) => {
        const key = `${payment.month}-${payment.year}`;
        if (!paymentsByMonth[key]) {
          paymentsByMonth[key] = [];
        }
        paymentsByMonth[key].push(payment);
      });

      console.log("****** paymentsByMonth *******");
      console.log(paymentsByMonth);

      Object.values(paymentsByMonth).forEach((payments) => {
        // Sort payments by date to get the latest one
        payments.sort(
          (a, b) => new Date(a.payment_date) - new Date(b.payment_date)
        );
        const latestPayment = payments[payments.length - 1];

        // Only add to pending heads if pending_fees is not empty
        if (Object.keys(latestPayment.pending_fees).length > 0) {
          const { month, year, pending_fees } = latestPayment;
          const schoolFees = { ...pending_fees };
          const transportFees = {};

          // If transport fee is in pending_fees, move it to transportFees
          if (schoolFees.transport) {
            transportFees.transport = schoolFees.transport;
            delete schoolFees.transport;
          }

          const totalSchoolFees = Object.values(schoolFees).reduce(
            (sum, val) => sum + val,
            0
          );
          const totalTransportFees = Object.values(transportFees).reduce(
            (sum, val) => sum + val,
            0
          );

          previous_pending_heads.push({
            month,
            year,
            school_fee: {
              month,
              fees_particulars: schoolFees,
              total_fees: totalSchoolFees,
              year,
            },
            transport_fee: {
              month,
              fees_particulars: transportFees,
              total_fees: totalTransportFees,
              year,
            },
          });
        }
      });

      console.log("****** previous_pending_heads *******");
      console.log(previous_pending_heads);
    }

    const studentObj = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION,
      [Query.equal("student_id", [student_id])]
    );

    const _student_id = studentObj.documents[0].student_id;
    // const _class_id = studentObj.documents[0].class_id;
    const _class_name = studentObj.documents[0].class_name;
    const _stop_name = JSON.parse(
      studentObj.documents[0].transport_details
    ).stop_name;

    // GET FEE STRUCTURE FOR A CLASS
    const fees_structure_records = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_CLASS_FEE_STRUCTURE,
      [Query.equal("class", [_class_name])]
    );

    // GET FEE STRUCTURE FOR A STOP NAME
    const transport_fees_structure = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE,
      [Query.equal("stop_name", [_stop_name])]
    );

    //GET FEE COLLECTION DETAILS FOR GIVEN STUDENT. NEW STUDENT OR FEE NOT COLLECTED YET, RETURN []. REPEATED AND CAN BE REMOVED
    const student_fee_collection_record =
      student_fee_collection_records.length > 0
        ? student_fee_collection_records[0]
        : {};

    const last_payment_Date =
      Object.entries(student_fee_collection_record).length > 0
        ? student_fee_collection_record.last_payment_date
        : "";

    let monthlist = CheckPendingPayment(last_payment_Date, 10);

    // //HARDCODED FOR TESTING PURPOSE ONLY
    // let monthlist = CheckPendingPayment("17/09/2024", 10);

    let _monthListSorted = monthlist.sort((a, b) => a.localeCompare(b));

    //Below will give data as
    //[ "January - 2025","February - 2025",]
    const pending_month_array = GetFeeCardMonthHeading(_monthListSorted);
    const monthly_fee = fees_structure_records.documents[0].monthly_fees;

    const pending_particulars = ExtractPendingFeeParticularsWithMonth(
      pending_month_array,
      JSON.parse(monthly_fee)
    );

    const monthly_fee_transport =
      transport_fees_structure.documents[0].monthly_fees;

    const pending_particulars_transport = ExtractPendingFeeParticularsWithMonth(
      pending_month_array,
      JSON.parse(monthly_fee_transport)
    );

    const mergedMap = new Map();

    pending_particulars.forEach((item) => {
      const key = `${item.month}-${item.year}`;
      mergedMap.set(key, {
        month: item.month,
        year: item.year,
        school_fee: { ...item },
      });
    });

    pending_particulars_transport.forEach((item) => {
      const key = `${item.month}-${item.year}`;
      if (mergedMap.has(key)) {
        mergedMap.get(key).transport_fee = { ...item };
      } else {
        mergedMap.set(key, {
          month: item.month,
          year: item.year,
          transport_fee: { ...item },
        });
      }
    });

    const _pendingMonthFee_trans = Array.from(mergedMap.values());

    const pending_heads = [
      ...(previous_pending_heads.length ? previous_pending_heads : []),
      ...(_pendingMonthFee_trans.length ? _pendingMonthFee_trans : []),
    ];

    if (pending_heads) {
      return res.status(200).json({
        status: "SUCCESS",
        result: pending_heads,
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

module.exports.UpdateFeePayment = async (req, res, next) => {
  try {
    const { student_id, payment_records_schoolFee, user } = req.body;
    let student_fee_collection_records = [];
    let offset = 0;
    const limit = 25; // AppWrite limit per request
    const todayDate = moment().format("DD/MM/YYYY");
    const updated_on = moment().format("DD/MM/YYYY");
    const updated_by = user || "";

    const studentObj = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_STUDENTS_COLLECTION,
      [Query.equal("student_id", [student_id])]
    );

    const _student_id = studentObj.documents[0].student_id;
    const _class_name = studentObj.documents[0].class_name;
    // const _stop_name = JSON.parse(
    //   studentObj.documents[0].transport_details
    // ).stop_name;

    if (payment_records_schoolFee && payment_records_schoolFee.length > 0) {
      // Fetch all student class fee records
      offset = 0;
      while (true) {
        const response = await ListAllDocument(
          process.env.APPWRITE_DB_ID,
          process.env.APPWRITE_FEE_COLLECTION_RECORDS,
          [
            Query.equal("student_id", [student_id]),
            Query.limit(limit),
            Query.offset(offset),
          ]
        );

        student_fee_collection_records = student_fee_collection_records.concat(
          response.documents
        );
        if (response.documents.length < limit) break;
        offset += limit;
      }

      const fees_structure_records = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_CLASS_FEE_STRUCTURE,
        [Query.equal("class", [_class_name])]
      );

      //GET FEE STRUCTURE/PARTICULARS FOR GIVEN STUDENT BASED ON CLASS
      const defaultFeeStructure_response =
        fees_structure_records.documents.find(
          (fee_structure) => fee_structure.class === _class_name
        );

      const defaultFeeStructure = {
        fees_structure_id: defaultFeeStructure_response?.fees_structure_id,
        fee_collection_cycle:
          defaultFeeStructure_response?.fee_collection_cycle,
        class: defaultFeeStructure_response?.class,
        academic_year: defaultFeeStructure_response.academic_year,
        monthly_fees: defaultFeeStructure_response.monthly_fees,
        updated_on: defaultFeeStructure_response.updated_on,
        updated_by: defaultFeeStructure_response.updated_by,
      };

      if (
        student_fee_collection_records &&
        student_fee_collection_records.length > 0
      ) {
        // console.log("***** School Fee Record present. Need to update ****");
        // console.log(student_fee_collection_records);

        const previous_monthly_payments_str =
          student_fee_collection_records[0].monthly_payments;
        const previous_monthly_payments_json = JSON.parse(
          previous_monthly_payments_str
        );
        const updated_monthly_payments = [
          ...previous_monthly_payments_json,
          ...payment_records_schoolFee,
        ];
        console.log("******* updated_monthly_payments *******");
        console.log(updated_monthly_payments);

        const id = student_fee_collection_records[0].student_fees_id;
        const updated_record = {
          // ...student_fee_collection_records.result,
          fees_structure_id: defaultFeeStructure?.fees_structure_id || null,
          monthly_payments: JSON.stringify(updated_monthly_payments),
          last_payment_date: todayDate,
          // fees_particulars: JSON.stringify(defaultFeeStructure) || null,
          updated_on,
          updated_by,
        };

        const updated_class_fee_record = await UpdateDocument(
          process.env.APPWRITE_DB_ID,
          process.env.APPWRITE_FEE_COLLECTION_RECORDS,
          id,
          updated_record
        );
        if (updated_class_fee_record) {
          return res.status(200).json({
            status: "SUCCESS",
            message: "Entry updated",
            result: updated_class_fee_record,
          });
        } else {
          return res
            .status(500)
            .json({ status: "FAIL", message: "Entry not updated" });
        }
      } else if (
        student_fee_collection_records &&
        student_fee_collection_records.length === 0
      ) {
        console.log(
          "******* School Fee Record Not present.Create new record *******"
        );
        const _id = uuidv4().slice(0, 6);
        const newRecord = {
          id: _id,
          student_fees_id: _id,
          student_id: _student_id,
          academic_year: `${moment().year()}-${moment().year() + 1}`,
          class: _class_name,
          fees_structure_id: defaultFeeStructure?.fees_structure_id || null,
          monthly_payments: JSON.stringify(payment_records_schoolFee),
          last_payment_date: todayDate,
          // fees_particulars: JSON.stringify(defaultFeeStructure) || null,
          updated_on,
          updated_by,
        };

        const newRecord_response = await AddNewDocument(
          newRecord,
          process.env.APPWRITE_DB_ID,
          process.env.APPWRITE_FEE_COLLECTION_RECORDS
        );

        if (newRecord_response) {
          return res.status(200).json({
            status: "SUCCESS",
            message: "New entry added",
            result: newRecord_response,
          });
        } else {
          return res
            .status(500)
            .json({ status: "FAIL", message: "Entry not added" });
        }
      } else {
        console.log("Error while fetching student_fee_collection_records");
        return res.status(500).json({
          status: "FAIL",
          message: "student_fee_collection_records is Null",
          result: null,
        });
      }
    }

    // if (
    //   payment_records_transportFee &&
    //   payment_records_transportFee.length > 0
    // ) {
    //   // Fetch all student Transport fee records
    //   offset = 0;
    //   while (true) {
    //     const response = await ListAllDocument(
    //       process.env.APPWRITE_DB_ID,
    //       process.env.APPWRITE_TRANS_FEE_COLLECTION_RECORDS,
    //       [
    //         Query.equal("student_id", [student_id]),
    //         Query.limit(limit),
    //         Query.offset(offset),
    //       ]
    //     );

    //     student_transport_collection = student_transport_collection.concat(
    //       response.documents
    //     );
    //     if (response.documents.length < limit) break;
    //     offset += limit;
    //   }

    //   // GET FEE STRUCTURE FOR A STOP NAME
    //   const transport_fees_structure = await ListAllDocument(
    //     process.env.APPWRITE_DB_ID,
    //     process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE,
    //     [Query.equal("stop_name", [_stop_name])]
    //   );

    //   //GET FEE STRUCTURE/PARTICULARS FOR GIVEN STUDENT BASED ON CLASS
    //   const defaultFeeStructure_response =
    //     transport_fees_structure.documents.find(
    //       (fee_structure) => fee_structure.stop_name === _stop_name
    //     );

    //   const defaultFeeStructure = {
    //     transport_structure_id:
    //       defaultFeeStructure_response?.transport_structure_id,
    //     fee_collection_cycle:
    //       defaultFeeStructure_response?.fee_collection_cycle,
    //     stop_name: defaultFeeStructure_response?.stop_name,
    //     academic_year: defaultFeeStructure_response.academic_year,
    //     monthly_fees: defaultFeeStructure_response.monthly_fees,
    //     updated_on: defaultFeeStructure_response.updated_on,
    //     updated_by: defaultFeeStructure_response.updated_by,
    //   };

    //   if (
    //     student_transport_collection &&
    //     student_transport_collection.length > 0
    //   ) {
    //     console.log(
    //       "******* Transport Fee Record present. Need to update *******"
    //     );
    //     const updated_monthly_payments = [
    //       ...student_transport_collection.result.monthly_payments,
    //       ...payment_records_transportFee,
    //     ];
    //     const id = student_transport_collection.result.student_fees_id;
    //     const updated_record = {
    //       transport_structure_id:
    //         defaultFeeStructure?.transport_structure_id || null,
    //       monthly_payments: updated_monthly_payments,
    //       last_payment_date: todayDate,
    //       fees_particulars: defaultFeeStructure || null,
    //       updated_on,
    //       updated_by,
    //     };
    //     console.log("************** Updated Record *********************");
    //     console.log(updated_record);
    //     //CALL API TO UPDATE PAYMENT RECORD
    //     const updated_transp_fee_record = await UpdateDocument(
    //       process.env.APPWRITE_DB_ID,
    //       process.env.APPWRITE_TRANS_FEE_COLLECTION_RECORDS,
    //       id,
    //       updated_record
    //     );
    //     if (updated_transp_fee_record) {
    //       transportFeeUpdated = true;
    //     } else {
    //       transportFeeUpdated = false;
    //     }
    //   } else if (
    //     student_transport_collection &&
    //     student_transport_collection.length === 0
    //   ) {
    //     console.log(
    //       "******* Transport Fee Record Not present.Create new record *******"
    //     );
    //     const _id = uuidv4().slice(0, 6);
    //     const newRecord = {
    //       id: _id,
    //       student_fees_id: _id,
    //       student_id: _student_id,
    //       academic_year: `${moment().year()}-${moment().year() + 1}`,
    //       class: _class_name,
    //       transport_structure_id:
    //         defaultFeeStructure?.transport_structure_id || null,
    //       monthly_payments: payment_records_schoolFee,
    //       last_payment_date: todayDate,
    //       fees_particulars: defaultFeeStructure || null,
    //       updated_on,
    //       updated_by,
    //     };
    //     //CREATE NEW DOCUMENT UNDER student_fee_collection_records
    //     console.log("************** newRecord *********************");

    //     const newRecord_response = await AddNewDocument(
    //       newRecord,
    //       process.env.APPWRITE_DB_ID,
    //       process.env.APPWRITE_TRANS_FEE_COLLECTION_RECORDS
    //     );

    //     if (newRecord_response) {
    //       transportFeeUpdated = true;
    //     } else {
    //       transportFeeUpdated = false;
    //     }
    //   } else {
    //     console.log("Error while fetching student_fee_collection_records");
    //     transportFeeUpdated = false;
    //   }
    // }

    // if (schoolFeeUpdated && transportFeeUpdated) {
    //   return res.status(200).json({
    //     status: "SUCCESS",
    //     message: "New entry added",
    //   });
    // } else if (schoolFeeUpdated && !transportFeeUpdated) {
    //   return res.status(200).json({
    //     status: "PARTIAL",
    //     message: "Transport Fee Not Updated",
    //   });
    // } else if (!schoolFeeUpdated && transportFeeUpdated) {
    //   return res.status(200).json({
    //     status: "PARTIAL",
    //     message: "School Fee Not Updated",
    //   });
    // } else {
    //   return res
    //     .status(500)
    //     .json({ status: "FAIL", message: "Entry not added" });
    // }
  } catch (error) {
    const err = new Error(`Exception: ${error.message}`);
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.GetFeeCollectionReport = async (req, res, next) => {
  try {
    let student_fee_collection_records = [];

    const feeCollection = {};
    let offset = 0;
    const limit = 25;

    // Fetch all student class fee records
    offset = 0;
    while (true) {
      const response = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_FEE_COLLECTION_RECORDS,
        [Query.limit(limit), Query.offset(offset)]
      );

      student_fee_collection_records = student_fee_collection_records.concat(
        response.documents
      );
      if (response.documents.length < limit) break;
      offset += limit;
    }

    let student_monthly_payments = [];
    student_fee_collection_records.forEach((record) => {
      const monthly_payment_str = record.monthly_payments;
      const monthly_payment_json = JSON.parse(monthly_payment_str);

      console.log("monthly_payment_json", monthly_payment_json);

      student_monthly_payments = [
        ...student_monthly_payments,
        ...(Array.isArray(monthly_payment_json) &&
        monthly_payment_json.length > 0
          ? monthly_payment_json
          : []),
      ];
    });

    student_monthly_payments.forEach((payment) => {
      const key = `${payment.month}-${payment.year}`;

      if (!feeCollection[key]) {
        feeCollection[key] = {
          total_collection: 0,
          transport_collection: 0,
          class_fee_collection: 0,
          rebate_amount: 0,
        };
      }

      let transportAmount = payment.selected_fees["transport"] || 0;
      let classFeeAmount = Object.entries(payment.selected_fees)
        .filter(([key]) => key.toLowerCase() !== "transport")
        .reduce((sum, [, value]) => sum + value, 0);

      // Get rebate amount
      let rebateAmount = payment.rebate_amount || 0;

      // Reduce rebate from class fee collection
      let adjustedClassFee = Math.max(0, classFeeAmount - rebateAmount);

      // Total collection remains sum of class_fee_collection and transport_collection
      let totalAmount = adjustedClassFee + transportAmount;

      feeCollection[key].total_collection += totalAmount;
      feeCollection[key].transport_collection += transportAmount;
      feeCollection[key].class_fee_collection += adjustedClassFee;
      feeCollection[key].rebate_amount += rebateAmount;
    });

    if (feeCollection) {
      return res.status(200).json({
        status: "SUCCESS",
        result: feeCollection,
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

module.exports.GetFeeCollectionRecords = async (req, res, next) => {
  try {
    const { student_id } = req.body;
    let student_fee_collection_records = [];
    let offset = 0;
    const limit = 25;

    offset = 0;
    while (true) {
      const response = await ListAllDocument(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_FEE_COLLECTION_RECORDS,
        [
          Query.equal("student_id", [student_id]),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );

      student_fee_collection_records = student_fee_collection_records.concat(
        response.documents
      );
      if (response.documents.length < limit) break;
      offset += limit;
    }

    if (student_fee_collection_records) {
      return res.status(200).json({
        status: "SUCCESS",
        result: student_fee_collection_records,
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

const CheckPendingPayment = (lastPaymentDate, payment_cycle) => {
  let pendingDueDates = [];
  let _payementDueDate = moment().date(payment_cycle);

  if (lastPaymentDate) {
    console.log("Last Payment date: ", lastPaymentDate);
    let _lastPaymentDate = ChangeDateFormat(lastPaymentDate, "DD/MM/YYYY");
    const todayDate = moment().format("DD/MM/YYYY");
    let nextDueDate = moment(_lastPaymentDate, "DD/MM/YYYY")
      .date(10)
      .add(1, "month");

    const todayDateStr = moment(todayDate, "DD/MM/YYYY"); // Convert today’s date

    while (nextDueDate.isSameOrBefore(todayDateStr, "month")) {
      pendingDueDates.push(nextDueDate.format("DD/MM/YYYY"));
      nextDueDate.add(1, "month"); // Move to the next month's due date
    }

    return pendingDueDates;
  } else {
    pendingDueDates.push(_payementDueDate.format("DD/MM/YYYY"));
    return pendingDueDates;
  }
};

const ChangeDateFormat = (date, format) => {
  return date
    ? moment(date, ["YYYY-MM-DD", "DD/MM/YYYY", "DD/MM/YY"], true).format(
        format
      )
    : "";
};

const GetFeeCardMonthHeading = (dates) => {
  // console.log(`Dates Received as: ${dates}`);
  return dates.map((_date) => {
    let _monthIndex = moment(_date, "DD/MM/YYYY").format("MM");
    let _monthString = months[Number(_monthIndex) - 1];
    let _year = moment(_date, "DD/MM/YYYY").format("YYYY");
    // console.log(_monthIndex, _monthString, _year);
    return `${_monthString} - ${_year}`;
  });
};

const ExtractPendingFeeParticularsWithMonth = (
  pending_month_array,
  monthly_fee
) => {
  // console.log("*************** monthly_fee ********************");
  // console.log(typeof monthly_fee);
  const pending_particulars = pending_month_array
    .map((entry) => {
      const [month, year] = entry.split(" - ");
      const feeDetails = monthly_fee.find((fee) => fee.month === month);

      if (feeDetails) {
        return {
          ...feeDetails,
          year: year, // Adding year from pending_month_array
        };
      }
      return null;
    })
    .filter(Boolean); // Remove null values if no match found
  return pending_particulars;
};

// module.exports.GetPendingFeeParticulars = async (req, res, next) => {
//   try {
//     const { student_id } = req.body;
//     let student_fee_collection_records = [];
//     let student_transport_collection = [];
//     let offset = 0;
//     const limit = 25; // AppWrite limit per request

//     // Fetch all student class fee records
//     offset = 0;
//     while (true) {
//       const response = await ListAllDocument(
//         process.env.APPWRITE_DB_ID,
//         process.env.APPWRITE_FEE_COLLECTION_RECORDS,
//         [
//           Query.equal("student_id", [student_id]),
//           Query.limit(limit),
//           Query.offset(offset),
//         ]
//       );

//       student_fee_collection_records = student_fee_collection_records.concat(
//         response.documents
//       );
//       if (response.documents.length < limit) break;
//       offset += limit;
//     }

//     const result = [];

//     const monthly_payments_str =
//       student_fee_collection_records[0].monthly_payments;
//     const monthly_payments_JSON = JSON.parse(monthly_payments_str);
//     console.log(monthly_payments_JSON);

//     monthly_payments_JSON.forEach(
//       ({ month, year, selected_fees, pending_fees }) => {
//         if (
//           Object.keys(selected_fees).length > 0 ||
//           Object.keys(pending_fees).length > 0
//         ) {
//           const schoolFees = { ...pending_fees };
//           const transportFees = {};

//           // Separate transport fee
//           if (selected_fees.transport) {
//             transportFees.transport = selected_fees.transport;
//             delete selected_fees.transport;
//           }

//           const totalSchoolFees = Object.values(schoolFees).reduce(
//             (sum, val) => sum + val,
//             0
//           );
//           const totalTransportFees = Object.values(transportFees).reduce(
//             (sum, val) => sum + val,
//             0
//           );

//           result.push({
//             month,
//             year,
//             school_fee: {
//               month,
//               fees_particulars: schoolFees,
//               total_fees: totalSchoolFees,
//               year,
//             },
//             transport_fee: {
//               month,
//               fees_particulars: transportFees,
//               total_fees: totalTransportFees,
//               year,
//             },
//           });
//         }
//       }
//     );

//     console.log("************* result ****************************");
//     console.log(result);

//     // const monthly_payments_str =
//     //   student_fee_collection_records[0].monthly_payments;
//     // const monthly_payments_JSON = JSON.parse(monthly_payments_str);
//     // console.log(monthly_payments_JSON);

//     // const result = [];

//     // monthly_payments_JSON.forEach(({ month, year, pending_fees }) => {
//     //   if (Object.keys(pending_fees).length > 0) {
//     //     const total_fees = Object.values(pending_fees).reduce(
//     //       (sum, val) => sum + val,
//     //       0
//     //     );
//     //     result.push({
//     //       month,
//     //       fees_particulars: pending_fees,
//     //       total_fees,
//     //       year,
//     //     });
//     //   }
//     // });

//     // return res.status(200).json({
//     //   status: "SUCCESS",
//     //   result: result,
//     // });

//     // Fetch all student Transport fee records
//     offset = 0;
//     while (true) {
//       const response = await ListAllDocument(
//         process.env.APPWRITE_DB_ID,
//         process.env.APPWRITE_TRANS_FEE_COLLECTION_RECORDS,
//         [
//           Query.equal("student_id", [student_id]),
//           Query.limit(limit),
//           Query.offset(offset),
//         ]
//       );

//       student_transport_collection = student_transport_collection.concat(
//         response.documents
//       );
//       if (response.documents.length < limit) break;
//       offset += limit;
//     }

//     const studentObj = await ListAllDocument(
//       process.env.APPWRITE_DB_ID,
//       process.env.APPWRITE_STUDENTS_COLLECTION,
//       [Query.equal("student_id", [student_id])]
//     );

//     const _student_id = studentObj.documents[0].student_id;
//     // const _class_id = studentObj.documents[0].class_id;
//     const _class_name = studentObj.documents[0].class_name;
//     const _stop_name = JSON.parse(
//       studentObj.documents[0].transport_details
//     ).stop_name;

//     // GET FEE STRUCTURE FOR A CLASS
//     const fees_structure_records = await ListAllDocument(
//       process.env.APPWRITE_DB_ID,
//       process.env.APPWRITE_CLASS_FEE_STRUCTURE,
//       [Query.equal("class", [_class_name])]
//     );

//     // GET FEE STRUCTURE FOR A STOP NAME
//     const transport_fees_structure = await ListAllDocument(
//       process.env.APPWRITE_DB_ID,
//       process.env.APPWRITE_TRANSPORT_FEE_STRUCTURE,
//       [Query.equal("stop_name", [_stop_name])]
//     );

//     //GET FEE STRUCTURE/PARTICULARS FOR GIVEN STUDENT BASED ON CLASS. REPEATED AND CAN BE REMOVED
//     const defaultFeeStructure = fees_structure_records.documents.find(
//       (fee_structure) => fee_structure.class === _class_name
//     );

//     //GET TRANSPORT FEE STRUCTURE/PARTICULARS FOR GIVEN STUDENT BASED ON STOP NAME. REPEATED AND CAN BE REMOVED
//     const defaultFeeStructure_transport =
//       transport_fees_structure.documents.find(
//         (fee_structure) => fee_structure.stop_name === _stop_name
//       );

//     //GET FEE COLLECTION DETAILS FOR GIVEN STUDENT. NEW STUDENT OR FEE NOT COLLECTED YET, RETURN []. REPEATED AND CAN BE REMOVED
//     const student_fee_collection_record =
//       student_fee_collection_records.length > 0
//         ? student_fee_collection_records.find(
//             (record) => record.student_id === _student_id
//           )
//         : [];

//     //GET TRANSPORT FEE COLLECTION DETAILS FOR GIVEN STUDENT. NEW STUDENT OR FEE NOT COLLECTED YET, RETURN []. REPEATED AND CAN BE REMOVED
//     // const student_transport_fee_collection_record =
//     //   student_transport_collection.length > 0
//     //     ? student_transport_collection.documents.find(
//     //         (record) => record.student_id === _student_id
//     //       )
//     //     : [];

//     // const student_transport_fee_collection_record =
//     //   student_fee_collection_records.length > 0
//     //     ? student_fee_collection_records.documents.find(
//     //         (record) => record.student_id === _student_id
//     //       )
//     //     : [];

//     //MERGE FEE COLLECTION ALONG WITH FEE STRUCTURE/PARTICULARS

//     // const merged_fee_collection_structure =
//     //   student_fee_collection_record.length > 0
//     //     ? [
//     //         {
//     //           ...student_fee_collection_record,
//     //           fees_particulars: defaultFeeStructure || null,
//     //         },
//     //       ]
//     //     : [
//     //         {
//     //           student_fees_id: uuidv4().slice(0, 6), // Keep full UUID instead of slicing
//     //           student_id: _student_id,
//     //           academic_year: `${moment().year()}-${moment().year() + 1}`,
//     //           class: _class_name,
//     //           fees_structure_id: defaultFeeStructure?.fees_structure_id || null,
//     //           monthly_payments: [],
//     //           last_payment_date: "",
//     //           fees_particulars: defaultFeeStructure || null,
//     //         },
//     //       ];

//     //MERGE TRANSPORT FEE COLLECTION ALONG WITH FEE STRUCTURE/PARTICULARS
//     // const merged_transport_collection_structure =
//     //   student_transport_fee_collection_record.length > 0
//     //     ? [
//     //         {
//     //           ...student_transport_fee_collection_record,
//     //           fees_particulars: defaultFeeStructure_transport || null,
//     //         },
//     //       ]
//     //     : [
//     //         {
//     //           student_fees_id: uuidv4().slice(0, 6), // Keep full UUID instead of slicing
//     //           student_id: _student_id,
//     //           academic_year: `${moment().year()}-${moment().year() + 1}`,
//     //           class: _class_name,
//     //           transport_structure_id:
//     //             defaultFeeStructure_transport?.transport_structure_id || null,
//     //           monthly_payments: [],
//     //           last_payment_date: "",
//     //           fees_particulars: defaultFeeStructure_transport || null,
//     //         },
//     //       ];

//     // console.log(
//     //   "************** merged_fee_collection_structure *******************"
//     // );
//     // console.log(merged_fee_collection_structure);

//     // console.log(
//     //   "************** merged_transport_collection_structure *******************"
//     // );
//     // console.log(merged_transport_collection_structure);

//     // const merged_student_fee_collection = studentObj.documents.map(
//     //   (student) => {
//     //     const studentFeeCollectionReport = merged_fee_collection_structure
//     //       .filter((record) => record.student_id === student.student_id)
//     //       .sort((a, b) => b.academic_year.localeCompare(a.academic_year)); // Sort by academic_year in descending order

//     //     return {
//     //       ...student,
//     //       fee_collection_data: studentFeeCollectionReport,
//     //     };
//     //   }
//     // );

//     // const merged_student_fee_transport_collection =
//     //   merged_student_fee_collection.map((student) => {
//     //     const studentFeeCollectionReport = merged_transport_collection_structure
//     //       .filter((record) => record.student_id === student.student_id)
//     //       .sort((a, b) => b.academic_year.localeCompare(a.academic_year)); // Sort by academic_year in descending order

//     //     return {
//     //       ...student,
//     //       fee_collection_data_transport: studentFeeCollectionReport,
//     //     };
//     //   });

//     // const data = merged_student_fee_transport_collection[0];

//     // console.log("************** data *******************");
//     // console.log(JSON.stringify(data, null, 2));

//     // let monthlist = CheckPendingPayment(
//     //   data.fee_collection_data[0]?.last_payment_date || "",
//     //   10
//     // );

//     const last_payment_Date =
//       Object.entries(student_fee_collection_record).length > 0
//         ? student_fee_collection_record.last_payment_date
//         : "";

//     let monthlist = CheckPendingPayment(last_payment_Date, 10);

//     // //HARDCODED FOR TESTING PURPOSE ONLY
//     // let monthlist = CheckPendingPayment("17/09/2024", 10);

//     // let monthlist_transport = CheckPendingPayment(
//     //   data.fee_collection_data_transport[0]?.last_payment_date || "",
//     //   10
//     // );

//     let _monthListSorted = monthlist.sort((a, b) => a.localeCompare(b));

//     // let _monthListSorted_transport = monthlist_transport.sort((a, b) =>
//     //   a.localeCompare(b)
//     // );

//     //Below will give data as
//     //[ "January - 2025","February - 2025",]
//     const pending_month_array = GetFeeCardMonthHeading(_monthListSorted);
//     const monthly_fee = defaultFeeStructure.monthly_fees;
//     //data.fee_collection_data[0]?.fees_particulars.monthly_fees;

//     // console.log("*************** pending_month_array ********************");
//     // console.log(pending_month_array);

//     const pending_particulars = ExtractPendingFeeParticularsWithMonth(
//       pending_month_array,
//       JSON.parse(monthly_fee)
//     );

//     // const pending_month_array_transport = GetFeeCardMonthHeading(
//     //   _monthListSorted_transport
//     // );
//     const monthly_fee_transport = defaultFeeStructure_transport.monthly_fees;
//     //data.fee_collection_data_transport[0]?.fees_particulars.monthly_fees;

//     const pending_particulars_transport = ExtractPendingFeeParticularsWithMonth(
//       pending_month_array,
//       JSON.parse(monthly_fee_transport)
//     );

//     const mergedMap = new Map();

//     pending_particulars.forEach((item) => {
//       const key = `${item.month}-${item.year}`;
//       mergedMap.set(key, {
//         month: item.month,
//         year: item.year,
//         school_fee: { ...item },
//       });
//     });

//     pending_particulars_transport.forEach((item) => {
//       const key = `${item.month}-${item.year}`;
//       if (mergedMap.has(key)) {
//         mergedMap.get(key).transport_fee = { ...item };
//       } else {
//         mergedMap.set(key, {
//           month: item.month,
//           year: item.year,
//           transport_fee: { ...item },
//         });
//       }
//     });

//     const _pendingMonthFee_trans = Array.from(mergedMap.values());

//     if (_pendingMonthFee_trans) {
//       return res.status(200).json({
//         status: "SUCCESS",
//         result: _pendingMonthFee_trans,
//       });
//     } else {
//       return res
//         .status(500)
//         .json({ status: "FAIL", message: "Unable to fetch" });
//     }
//   } catch (error) {
//     const err = new Error(
//       `Exception. Unable to fetch. Error: ${error.message}`
//     );
//     err.status = "FAIL";
//     err.statusCode = 500;

//     next(err);
//   }
// };
