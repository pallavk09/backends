module.exports.ParseStringify = (value) => {
  return JSON.parse(JSON.stringify(value));
};

module.exports.ExcludeMetaData = (value) => {
  try {
    return Object.fromEntries(
      Object.entries(value).filter(([key]) => !key.startsWith("$"))
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.FormatListStudentReponse = async (students) => {
  try {
    const formattedResponse = students.map((student) =>
      this.ExcludeMetaData({
        ...student,
        personalDetails: JSON.parse(student.personalDetails),
        guardianDetails: JSON.parse(student.guardianDetails),
        academicsDetails: JSON.parse(student.academicsDetails),
      })
    );

    return formattedResponse;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.CatchAsyncException = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => next(error));
  };
};
