// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { MentorContext } from '../MentorContext';
// import './HomePage.css';
// import headerImage from '../assets/images/header-image.jpg';
// import image1 from '../assets/images/image1.jpg';
// import image2 from '../assets/images/image2.jpg';
// import image3 from '../assets/images/image3.jpg';

// const HomePage = () => {
//   const { mentor } = useContext(MentorContext);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedMentor, setSelectedMentor] = useState('');
//   const [selectedTiming, setSelectedTiming] = useState('');
//   const [mentors, setMentors] = useState([]);
//   const navigate = useNavigate();

//   const tutorialImages = [
//     { id: 1, src: image1, alt: 'Tutorial 1' },
//     { id: 2, src: image2, alt: 'Tutorial 2' },
//     { id: 3, src: image3, alt: 'Tutorial 3' },
//   ];

//   const courseContents = [
//     { id: 1, title: 'MERN Stack', description: 'The MERN stack is a JavaScript-based web development stack comprising MongoDB, Express.js, React, and Node.js. Its used for building full-stack web applications, where MongoDB handles the database, Express.js and Node.js manage the backend, and React powers the frontend.' },
//     { id: 2, title: 'Full Stack', description: 'Full Stack development refers to the practice of working on both the front end and back end of a web application. This includes everything from designing user interfaces to managing servers, databases, and application logic, enabling a developer to build a complete, functional web application from start to finish.' },
//     { id: 3, title: 'Python', description: 'Python is a high-level, interpreted programming language known for its simplicity and readability. Its widely used in web development, data science, automation, and artificial intelligence due to its extensive libraries and supportive community.' },
//   ];

//   const quizzes = [
//     { id: 1, title: 'Quiz 1', description: 'Description of Quiz 1' },
//     { id: 2, title: 'Quiz 2', description: 'Description of Quiz 2' },
//     { id: 3, title: 'Quiz 3', description: 'Description of Quiz 3' },
//   ];

//   const videos = [
//     { id: 1, title: 'MERN Stack', src: 'MERN Stack.mp4' },
//     { id: 2, title: 'Full Stack', src: 'Full Stack.mp4' },
//     { id: 3, title: 'Python', src: 'Python.mp4' },
//   ];

//   const timings = [
//     { id: 1, slot: '10:00 AM - 12:00 PM' },
//     { id: 2, slot: '2:00 PM - 4:00 PM' },
//     { id: 3, slot: '6:00 PM - 8:00 PM' },
//   ];

//   useEffect(() => {
//     const fetchMentors = async () => {
//       try {
//         const response = await fetch('http://localhost:10000/mentors');
//         const data = await response.json();
//         setMentors(data);
//       } catch (error) {
//         console.error('Error fetching mentors:', error);
//       }
//     };

//     fetchMentors();
//   }, []);

//   const handleCourseChange = (event) => {
//     setSelectedCourse(event.target.value);
//   };

//   const handleMentorChange = (event) => {
//     setSelectedMentor(event.target.value);
//   };

//   const handleTimingChange = (event) => {
//     setSelectedTiming(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(`Selected Course: ${selectedCourse}`);
//     console.log(`Selected Mentor: ${selectedMentor}`);
//     console.log(`Selected Timing: ${selectedTiming}`);
//     navigate('/course-mentor');
//   };

//   const handleLogout = () => {
//     // Perform logout logic (e.g., clearing authentication tokens)
//     navigate('/'); // Redirect to the login page or home page after logout
//   };

//   return (
//     <div className="home-page">
//       <header className="header">
//         <img src={headerImage} alt="Header" className="header-image" />
//         <h1>Welcome to the Learning Platform</h1>
//         <button onClick={handleLogout} className="logout-button">Logout</button>
//       </header>

//       <section className="tutorials">
//         <h2>Tutorial Images</h2>
//         <div className="tutorial-images">
//           {tutorialImages.map(image => (
//             <img key={image.id} src={image.src} alt={image.alt} className="tutorial-image" />
//           ))}
//         </div>
//       </section>

//       <section className="courses">
//         <h2>Courses</h2>
//         <div className="course-list">
//           {courseContents.map(course => (
//             <div key={course.id} className="course-item">
//               <h3>{course.title}</h3>
//               <p>{course.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="quizzes">
//         <h2>Quizzes</h2>
//         <div className="quiz-list">
//           {quizzes.map(quiz => (
//             <div key={quiz.id} className="quiz-item">
//               <h3>{quiz.title}</h3>
//               <p>{quiz.description}</p>
//               <Link to={`/quiz/${quiz.id}`} className="quiz-link">Take Quiz</Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="videos">
//         <h2>Videos</h2>
//         <div className="video-list">
//           {videos.map(video => (
//             <div key={video.id} className="video-item">
//               <h3>{video.title}</h3>
//               <video controls className="video-player">
//                 <source src={video.src} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="course-form">
//         <h2>Enroll in a Course</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="course">Choose a Course:</label>
//             <select id="course" value={selectedCourse} onChange={handleCourseChange}>
//               <option value="">Select a Course</option>
//               {courseContents.map(course => (
//                 <option key={course.id} value={course.title}>{course.title}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="mentor">Choose a Mentor:</label>
//             <select id="mentor" value={selectedMentor} onChange={handleMentorChange}>
//               <option value="">Select a Mentor</option>
//               {mentors.map(mentor => (
//                 <option key={mentor.id} value={mentor.name}>{mentor.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="timing">Choose a Timing:</label>
//             <select id="timing" value={selectedTiming} onChange={handleTimingChange}>
//               <option value="">Select a Timing</option>
//               {timings.map(timing => (
//                 <option key={timing.id} value={timing.slot}>{timing.slot}</option>
//               ))}
//             </select>
//           </div>

//           <button type="submit">Enroll</button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { MentorContext } from '../MentorContext';
// import './HomePage.css';
// import headerImage from '../assets/images/header-image.jpg';
// import image1 from '../assets/images/image1.jpg';
// import image2 from '../assets/images/image2.jpg';
// import image3 from '../assets/images/image3.jpg';

// const HomePage = () => {
//   const { mentor } = useContext(MentorContext);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedMentor, setSelectedMentor] = useState('');
//   const [selectedTiming, setSelectedTiming] = useState('');
//   const [mentors, setMentors] = useState([]);
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [enrollmentMessage, setEnrollmentMessage] = useState('');
//   const navigate = useNavigate();

//   const tutorialImages = [
//     { id: 1, src: image1, alt: 'Tutorial 1' },
//     { id: 2, src: image2, alt: 'Tutorial 2' },
//     { id: 3, src: image3, alt: 'Tutorial 3' },
//   ];

//   const courseContents = [
//     { id: 1, title: 'MERN Stack', description: 'The MERN stack is a JavaScript-based web development stack comprising MongoDB, Express.js, React, and Node.js. Its used for building full-stack web applications, where MongoDB handles the database, Express.js and Node.js manage the backend, and React powers the frontend.' },
//     { id: 2, title: 'Full Stack', description: 'Full Stack development refers to the practice of working on both the front end and back end of a web application. This includes everything from designing user interfaces to managing servers, databases, and application logic, enabling a developer to build a complete, functional web application from start to finish.' },
//     { id: 3, title: 'Python', description: 'Python is a high-level, interpreted programming language known for its simplicity and readability. Its widely used in web development, data science, automation, and artificial intelligence due to its extensive libraries and supportive community.' },
//   ];

//   const quizzes = [
//     { id: 1, title: 'Quiz 1', description: 'Description of Quiz 1' },
//     { id: 2, title: 'Quiz 2', description: 'Description of Quiz 2' },
//     { id: 3, title: 'Quiz 3', description: 'Description of Quiz 3' },
//   ];

//   const videos = [
//     { id: 1, title: 'MERN Stack', src: 'MERN Stack.mp4' },
//     { id: 2, title: 'Full Stack', src: 'Full Stack.mp4' },
//     { id: 3, title: 'Python', src: 'Python.mp4' },
//   ];

//   const timings = [
//     { id: 1, slot: '10:00 AM - 12:00 PM' },
//     { id: 2, slot: '2:00 PM - 4:00 PM' },
//     { id: 3, slot: '6:00 PM - 8:00 PM' },
//   ];

//   useEffect(() => {
//     const fetchMentors = async () => {
//       try {
//         const response = await fetch('http://localhost:10000/mentors');
//         const data = await response.json();
//         setMentors(data);
//       } catch (error) {
//         console.error('Error fetching mentors:', error);
//       }
//     };

//     fetchMentors();
//   }, []);

//   const handleCourseChange = (event) => {
//     setSelectedCourse(event.target.value);
//   };

//   const handleMentorChange = (event) => {
//     setSelectedMentor(event.target.value);
//   };

//   const handleTimingChange = (event) => {
//     setSelectedTiming(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//     setEmailError(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Check email validity
//     if (email.trim() === '') {
//       setEmailError(true);
//       setEnrollmentMessage('Please provide a valid email address.');
//     } else {
//       setEmailError(false);
//       setEnrollmentMessage('Enrolled successfully! Please wait for a mentor to contact you. If your email is incorrect, please update it.');
//     }

//     // Optionally, you can send enrollment data to a server here
//     // Example: fetch('http://localhost:10000/enroll', { method: 'POST', body: JSON.stringify({ course: selectedCourse, mentor: selectedMentor, timing: selectedTiming, email }) })
//   };

//   const handleLogout = () => {
//     // Perform logout logic (e.g., clearing authentication tokens)
//     navigate('/'); // Redirect to the login page or home page after logout
//   };

//   return (
//     <div className="home-page">
//       <header className="header">
//         <img src={headerImage} alt="Header" className="header-image" />
//         <h1>Welcome to the Learning Platform</h1>
//         <button onClick={handleLogout} className="logout-button">Logout</button>
//       </header>

//       <section className="tutorials">
//         <h2>Tutorial Images</h2>
//         <div className="tutorial-images">
//           {tutorialImages.map(image => (
//             <img key={image.id} src={image.src} alt={image.alt} className="tutorial-image" />
//           ))}
//         </div>
//       </section>

//       <section className="courses">
//         <h2>Courses</h2>
//         <div className="course-list">
//           {courseContents.map(course => (
//             <div key={course.id} className="course-item">
//               <h3>{course.title}</h3>
//               <p>{course.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="quizzes">
//         <h2>Quizzes</h2>
//         <div className="quiz-list">
//           {quizzes.map(quiz => (
//             <div key={quiz.id} className="quiz-item">
//               <h3>{quiz.title}</h3>
//               <p>{quiz.description}</p>
//               <Link to={`/quiz/${quiz.id}`} className="quiz-link">Take Quiz</Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="videos">
//         <h2>Videos</h2>
//         <div className="video-list">
//           {videos.map(video => (
//             <div key={video.id} className="video-item">
//               <h3>{video.title}</h3>
//               <video controls className="video-player">
//                 <source src={video.src} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="course-form">
//         <h2>Enroll in a Course</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="course">Choose a Course:</label>
//             <select id="course" value={selectedCourse} onChange={handleCourseChange}>
//               <option value="">Select a Course</option>
//               {courseContents.map(course => (
//                 <option key={course.id} value={course.title}>{course.title}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="mentor">Choose a Mentor:</label>
//             <select id="mentor" value={selectedMentor} onChange={handleMentorChange}>
//               <option value="">Select a Mentor</option>
//               {mentors.map(mentor => (
//                 <option key={mentor.id} value={mentor.name}>{mentor.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="timing">Choose a Timing:</label>
//             <select id="timing" value={selectedTiming} onChange={handleTimingChange}>
//               <option value="">Select a Timing</option>
//               {timings.map(timing => (
//                 <option key={timing.id} value={timing.slot}>{timing.slot}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email Address:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={handleEmailChange}
//               className={emailError ? 'input-error' : ''}
//             />
//             {emailError && <p className="error-message">Please provide a valid email address.</p>}
//           </div>

//           <button type="submit">Enroll</button>
//         </form>

//         {enrollmentMessage && (
//           <div className="enrollment-message">
//             <p>{enrollmentMessage}</p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MentorContext } from "../MentorContext";
import "./HomePage.css";
import headerImage from "../assets/images/header-image.jpg";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";

const HomePage = () => {
  const { mentor } = useContext(MentorContext);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedTiming, setSelectedTiming] = useState("");
  const [mentors, setMentors] = useState([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [enrollmentMessage, setEnrollmentMessage] = useState("");
  const navigate = useNavigate();

  const tutorialImages = [
    { id: 1, src: image1, alt: "Tutorial 1" },
    { id: 2, src: image2, alt: "Tutorial 2" },
    { id: 3, src: image3, alt: "Tutorial 3" },
  ];

  const courseContents = [
    {
      id: 1,
      title: "MERN Stack",
      description:
        "The MERN stack is a JavaScript-based web development stack comprising MongoDB, Express.js, React, and Node.js. Its used for building full-stack web applications, where MongoDB handles the database, Express.js and Node.js manage the backend, and React powers the frontend.",
    },
    {
      id: 2,
      title: "Full Stack",
      description:
        "Full Stack development refers to the practice of working on both the front end and back end of a web application. This includes everything from designing user interfaces to managing servers, databases, and application logic, enabling a developer to build a complete, functional web application from start to finish.",
    },
    {
      id: 3,
      title: "Python",
      description:
        "Python is a high-level, interpreted programming language known for its simplicity and readability. Its widely used in web development, data science, automation, and artificial intelligence due to its extensive libraries and supportive community.",
    },
  ];

  const quizzes = [
    { id: 1, title: "Quiz 1", description: "Description of Quiz 1" },
    { id: 2, title: "Quiz 2", description: "Description of Quiz 2" },
    { id: 3, title: "Quiz 3", description: "Description of Quiz 3" },
  ];

  const videos = [
    { id: 1, title: "MERN Stack", src: "MERN Stack.mp4" },
    { id: 2, title: "Full Stack", src: "Full Stack.mp4" },
    { id: 3, title: "Python", src: "Python.mp4" },
  ];

  const timings = [
    { id: 1, slot: "10:00 AM - 12:00 PM" },
    { id: 2, slot: "2:00 PM - 4:00 PM" },
    { id: 3, slot: "6:00 PM - 8:00 PM" },
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:10000/mentors");
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleMentorChange = (event) => {
    setSelectedMentor(event.target.value);
  };

  const handleTimingChange = (event) => {
    setSelectedTiming(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      setEmailError(true);
      setEnrollmentMessage("Please provide a valid email address.");
      return;
    }

    setEmailError(false);

    const enrollmentData = {
      course: selectedCourse,
      mentor: selectedMentor,
      timing: selectedTiming,
      email,
    };

    try {
      const response = await fetch("http://localhost:10000/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
      });
      const data = await response.json();
      setEnrollmentMessage(
        data.message ||
          "Enrolled successfully! Please wait for a mentor to contact you. If your email is incorrect, please update it."
      );
    } catch (error) {
      console.error("Error enrolling student:", error);
      setEnrollmentMessage("There was an error enrolling. Please try again.");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="home-page">
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
        <h1>Welcome to the Learning Platform</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <section className="tutorials">
        <h2>Tutorial Images</h2>
        <div className="tutorial-images">
          {tutorialImages.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="tutorial-image"
            />
          ))}
        </div>
      </section>

      <section className="courses">
        <h2>Courses</h2>
        <div className="course-list">
          {courseContents.map((course) => (
            <div key={course.id} className="course-item">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="quizzes">
        <h2>Quizzes</h2>
        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <Link to={`/quiz/${quiz.id}`} className="quiz-link">
                Take Quiz
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="videos">
        <h2>Videos</h2>
        <div className="video-list">
          {videos.map((video) => (
            <div key={video.id} className="video-item">
              <h3>{video.title}</h3>
              <video controls className="video-player">
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </section>

      <section className="course-form">
        <h2>Enroll in a Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="course">Choose a Course:</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">Select a Course</option>
              {courseContents.map((course) => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mentor">Choose a Mentor:</label>
            <select
              id="mentor"
              value={selectedMentor}
              onChange={handleMentorChange}
            >
              <option value="">Select a Mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.name}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timing">Choose a Timing:</label>
            <select
              id="timing"
              value={selectedTiming}
              onChange={handleTimingChange}
            >
              <option value="">Select a Timing</option>
              {timings.map((timing) => (
                <option key={timing.id} value={timing.slot}>
                  {timing.slot}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={emailError ? "input-error" : ""}
            />
            {emailError && (
              <p className="error-message">
                Please provide a valid email address.
              </p>
            )}
          </div>

          <button type="submit">Enroll</button>
        </form>

        {enrollmentMessage && (
          <div className="enrollment-message">
            <p>{enrollmentMessage}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
