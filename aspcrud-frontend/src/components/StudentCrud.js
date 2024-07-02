import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentCrud() {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const response = await axios.get("https://localhost:44311/api/Student/GetStudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:44311/api/Student/AddStudent", {
        stname: stname,
        course: course,
      });
      alert("Student Registered Successfully");
      clearForm();
      loadStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to register student. Please try again.");
    }
  }

  async function editStudent(student) {
    setId(student.id);
    setName(student.stname);
    setCourse(student.course);
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(`https://localhost:44311/api/Student/UpdateStudent/${id}`, {
        id: id,
        stname: stname,
        course: course,
      });
      alert("Student Updated Successfully");
      clearForm();
      loadStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student. Please try again.");
    }
  }

  async function deleteStudent(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`https://localhost:44311/api/Student/DeleteStudent/${id}`);
        alert("Student Deleted Successfully");
        clearForm();
        loadStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setCourse("");
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <h5 className="card-header bg-success text-white">Student Details</h5>
        <div className="card-body">
          <form onSubmit={save}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="id"
                hidden
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stname">Student Name</label>
              <input
                type="text"
                className="form-control"
                id="stname"
                value={stname}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="course">Course</label>
              <input
                type="text"
                className="form-control"
                id="course"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                required
              />
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary m-3">
                Register
              </button>
              <button type="button" className="btn btn-secondary" onClick={update}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student Id</th>
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.stname}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary m-1"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentCrud;
