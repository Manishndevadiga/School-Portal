// src/App.js
// import React from 'react';
// import IndexPage from './components/IndexPage';
// import HomePage from './components/HomePage';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// const App = () => {
//     return (
//         <div className="App">
//             <IndexPage />
//         </div>
//     );
    // return (
    //     <Router>
    //     <div>
    //       <Switch>
    //         <Route exact path="/IndexPage" component={IndexPage} />
    //         <Route path="/HomePage" component={HomePage} />
    //         {/* Add more routes as needed */}
    //       </Switch>
    //     </div>
    //     </Router>
    //   );
// };
//  export default App;

// import React from 'react';
// import Homepage from './components/HomePage';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import StudentRegister from './components/StudentRegister';
// import StudentLogin from './components/StudentLogin';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/Home"element={<Homepage/>}/>
//                 <Route path="/" element={<StudentRegister />} />
//                 <Route path="/register" element={<StudentRegister />} />
//                 <Route path="/login" element={<StudentLogin />} />
//                 {/* <Route path="/dashboard" element={<Dashboard />} /> Add your dashboard component here */}
//             </Routes>
//         </Router>
//     );
// }

// export default App;
// src/App.js

// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MentorProvider } from './MentorContext'; // Ensure this is correctly imported
import IndexPage from './components/IndexPage';
import HomePage from './components/HomePage';
import Student from './components/Student';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import Mentor from './components/Mentor';
import MentorLogin from './components/MentorLogin';
import MentorRegister from './components/MentorRegister';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Quiz from './components/Quiz';
import CourseMentor from './components/CourseMentor';

const App = () => {
    return (
        <MentorProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/Home" element={<HomePage />} />
                        <Route path="/student" element={<Student />} />
                        <Route path="/student-login" element={<StudentLogin />} />
                        <Route path="/student-register" element={<StudentRegister />} />
                        <Route path="/mentor" element={<Mentor />} />
                        <Route path="/mentor-login" element={<MentorLogin />} />
                        <Route path="/mentor-register" element={<MentorRegister />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/quiz/:id" element={<Quiz />} />
                        <Route path="/course-mentor" element={<CourseMentor />} />
                    </Routes>
                </div>
            </Router>
        </MentorProvider>
    );
};

export default App;
