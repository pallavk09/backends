module.exports.ParseStringify = (value) => {
  return JSON.parse(JSON.stringify(value));
};

module.exports.ExcludeMetaData = (value) => {
  return Object.fromEntries(
    Object.entries(value).filter(([key]) => !key.startsWith("$"))
  );
};

module.exports.FormatListStudentReponse = async (students) => {
  const formattedResponse = students.map((student) =>
    this.ExcludeMetaData({
      ...student,
      personalDetails: JSON.parse(student.personalDetails),
      guardianDetails: JSON.parse(student.guardianDetails),
      academicsDetails: JSON.parse(student.academicsDetails),
    })
  );

  return formattedResponse;
};
