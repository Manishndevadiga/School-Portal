import React, { useEffect, useState } from "react";
import "./CourseMentor.css";

const CourseMentor = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="course-mentor">
      <h1>Enrolled Students</h1>

      {loading && <p>Loading enrollments...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && (
        <>
          {enrollments.length > 0 ? (
            <table className="enrollment-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Student</th>
                  <th>Mentor</th>
                  <th>Timing</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment, index) => (
                  <tr key={index}>
                    <td>{enrollment.course}</td>
                    <td>{enrollment.student}</td>
                    <td>{enrollment.mentor}</td>
                    <td>{enrollment.timing}</td>
                    <td>{enrollment.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No enrollments found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CourseMentor;
