// // src/HomePage.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import './IndexPage.css';
// import Student from './Student';
// import Mentor from './Mentor';
// import Admin from './Admin';
// import StudentLogin from './StudentLogin';
// import MentorLogin from './MentorLogin';
// import AdminLogin from './AdminLogin';
// import StudentRegister from './StudentRegister'; // Add import for StudentRegister
// import MentorRegister from './MentorRegister'; // Add import for MentorRegister
// import HomePage from './HomePage';

// const IndexPage = () => {
//     return (
//         <Router>
//             <div className="home-container">
//                 <div className="navigation">
//                     <button><Link to="/student/login">Student</Link></button>
//                     <button><Link to="/mentor/login">Mentor</Link></button>
//                     <button><Link to="/admin/login">Admin</Link></button>
//                     {/* <button><Link to="/">Logout</Link></button> */}
//                 </div>
//                 <h1 className="title">Mentor Finding App</h1>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/student" element={<Student />} />
//                     <Route path="/student/login" element={<StudentLogin />} />
//                     <Route path="/student/register" element={<StudentRegister />} /> {/* Register Route for Student */}
//                     <Route path="/mentor" element={<Mentor />} />
//                     <Route path="/mentor/login" element={<MentorLogin />} />
//                     <Route path="/mentor/register" element={<MentorRegister />} /> {/* Register Route for Mentor */}
//                     <Route path="/admin" element={<Admin />} />
//                     <Route path="/admin/login" element={<AdminLogin />} />
//                     <Route path='/Homepage' element={<HomePage />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// const Home = () => (
//     <div>
//         <h2 color="black">Welcome to the Mentor Finding App </h2>
//         <p>Select a module to proceed.</p>
//     </div>
// );

// export default IndexPage;
// src/components/IndexPage.js

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import './IndexPage.css';
// import Student from './Student';
// import Mentor from './Mentor';
// import Admin from './Admin';
// import StudentLogin from './StudentLogin';
// import MentorLogin from './MentorLogin';
// import AdminLogin from './AdminLogin';
// import StudentRegister from './StudentRegister'; // Add import for StudentRegister
// import MentorRegister from './MentorRegister'; // Add import for MentorRegister
// import HomePage from './HomePage';

// const IndexPage = () => {
//   return (
//     <Router>
//       <div className="home-container">
//         <div className="navigation">
//           <button><Link to="/student/login">Student</Link></button>
//           <button><Link to="/mentor/login">Mentor</Link></button>
//           <button><Link to="/admin/login">Admin</Link></button>
//           {/* <button><Link to="/">Logout</Link></button> */}
//         </div>
//         <h1 className="title">Mentor Finding App</h1>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/student" element={<Student />} />
//           <Route path="/student/login" element={<StudentLogin />} />
//           <Route path="/student/register" element={<StudentRegister />} /> {/* Register Route for Student */}
//           <Route path="/mentor" element={<Mentor />} />
//           <Route path="/mentor/login" element={<MentorLogin />} />
//           <Route path="/mentor/register" element={<MentorRegister />} /> {/* Register Route for Mentor */}
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path='/Homepage' element={<HomePage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const Home = () => (
//   <div>
//     <h2 color="black">Welcome to the Mentor Finding App </h2>
//     <p>Select a module to proceed.</p>
//   </div>
// );

// export default IndexPage;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './IndexPage.css';
import HomePage from './HomePage';
import Student from './Student';
import StudentLogin from './StudentLogin';
import StudentRegister from './StudentRegister';
import Mentor from './Mentor';
import MentorLogin from './MentorLogin';
import MentorRegister from './MentorRegister';
import Admin from './Admin';
import AdminLogin from './AdminLogin';

const IndexPage = () => {
    
  return (
    <div className="home-container">
      <div className="navigation">
        <button><Link to="/student-login">Student</Link></button>
        <button><Link to="/mentor-login">Mentor</Link></button>
        <button><Link to="/admin-login">Admin</Link></button>
      </div>
      <h2 className="welcome-text">Welcome to the Mentor Finding App</h2>
      <p>Select a module to proceed.</p>
      <h1 className="title">Mentor Finding App</h1>
      {/* <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/mentor-login" element={<MentorLogin />} />
        <Route path="/mentor-register" element={<MentorRegister />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/Home" element={<HomePage />} />
      </Routes> */}
    </div>
  );
};

export default IndexPage;
