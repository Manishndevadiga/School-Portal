import React, { useEffect, useState } from "react";

const CourseMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedTiming, setSelectedTiming] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("http://localhost:10000/enrollments");
      const data = await response.json();
      setEnrollments(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchMentorsByCourse = async (course) => {
    try {
      const response = await fetch(
        `http://localhost:10000/mentors-by-course/${course}`
      );
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    fetchMentorsByCourse(e.target.value);
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:10000/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: selectedCourse,
          student: studentName,
          mentor: selectedMentor,
          timing: selectedTiming,
          email: studentEmail,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Enrollment successful!");
        fetchEnrollments();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="course-mentor">
      <h1>Course Enrollment</h1>

      <form onSubmit={handleEnroll}>
        <select value={selectedCourse} onChange={handleCourseChange} required>
          <option value="">Select a course</option>
          {/* Add your course options here */}
        </select>

        <select
          value={selectedMentor}
          onChange={(e) => setSelectedMentor(e.target.value)}
          required
        >
          <option value="">Select a mentor</option>
          {mentors.map((mentor) => (
            <option key={mentor.id} value={mentor.name}>
              {mentor.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={selectedTiming}
          onChange={(e) => setSelectedTiming(e.target.value)}
          placeholder="Enter preferred timing"
          required
        />

        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <input
          type="email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <button type="submit">Enroll</button>
      </form>

      <h2>Enrollment Information</h2>
      {loading && <p>Loading enrollments...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && (
        <>
          {enrollments.length > 0 ? (
            <ul className="enrollment-list">
              {enrollments.map((enrollment, index) => (
                <li key={index} className="enrollment-item">
                  <strong>Course:</strong> {enrollment.course} <br />
                  <strong>Student:</strong> {enrollment.student} <br />
                  <strong>Mentor:</strong> {enrollment.mentor} <br />
                  <strong>Timing:</strong> {enrollment.timing} <br />
                  <strong>Email:</strong> {enrollment.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrollments found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CourseMentor;
