let students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
];

const getStudentById = (id) => {
    let num = parseInt(id);
    let student = students.find(data => data.id === num);
    return student;
}

const getStudents = () => students;

const addToStudents = (first, last) => {
    const largestId = students.reduce((prev, current) => {
        if(current.id>prev) {
            return current.id;
        }
        return prev;
    }, -1)

    const newStudent = {id: largestId + 1, first, last}
    students = [...students, newStudent];

    return students;
}

module.exports = {addToStudents, getStudentById, getStudents, students};