// src/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({});

  useEffect(() => {
    const fetchTables = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:10000/admin-dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTables(response.data);
    };

    fetchTables();
  }, []);

  const fetchRecords = async (tableName) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:10000/admin-dashboard/${tableName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSelectedTable(tableName);
    setRecords(response.data);
  };

  const handleInputChange = (e, field) => {
    setNewRecord({ ...newRecord, [field]: e.target.value });
  };

  const handleAddRecord = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:10000/admin-dashboard/${selectedTable}`,
      newRecord,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchRecords(selectedTable);
  };

  const handleUpdateRecord = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:10000/admin-dashboard/${selectedTable}/${id}`,
      newRecord,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchRecords(selectedTable);
  };

  const handleDeleteRecord = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `http://localhost:10000/admin-dashboard/${selectedTable}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchRecords(selectedTable);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="tables-list">
        <h3>Tables</h3>
        <ul>
          {tables.map((table, index) => (
            <li key={index} onClick={() => fetchRecords(table.name)}>
              {table.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="records-section">
        <h3>{selectedTable} Records</h3>
        <table>
          <thead>
            <tr>
              {records.length > 0 &&
                Object.keys(records[0]).map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {Object.keys(record).map((field, subIndex) => (
                  <td key={subIndex}>
                    <input
                      type="text"
                      value={newRecord[field] || record[field]}
                      onChange={(e) => handleInputChange(e, field)}
                    />
                  </td>
                ))}
                <td>
                  <button onClick={() => handleUpdateRecord(record.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteRecord(record.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedTable && (
          <div className="add-record">
            <h3>Add New Record</h3>
            {records.length > 0 &&
              Object.keys(records[0]).map((field, index) => (
                <div key={index}>
                  <label>{field}</label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, field)}
                  />
                </div>
              ))}
            <button onClick={handleAddRecord}>Add Record</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//     const [selectedTable, setSelectedTable] = useState('students'); // Default to students
//     const [records, setRecords] = useState([]);
//     const [newRecord, setNewRecord] = useState({});
//     const [editingRecord, setEditingRecord] = useState({});

//     useEffect(() => {
//         fetchRecords('students'); // Fetch students data initially
//     }, []);

//     const fetchRecords = async (tableName) => {
//         const token = localStorage.getItem('token');
//         try {
//             const response = await axios.get(`http://localhost:10000/admin-dashboard/${tableName}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setSelectedTable(tableName);
//             setRecords(response.data);
//             setNewRecord({});
//             setEditingRecord({});
//         } catch (error) {
//             console.error(`Error fetching ${tableName} records:`, error);
//         }
//     };

//     const handleInputChange = (e, field, isEditing = false) => {
//         if (isEditing) {
//             setEditingRecord({ ...editingRecord, [field]: e.target.value });
//         } else {
//             setNewRecord({ ...newRecord, [field]: e.target.value });
//         }
//     };

//     const handleAddRecord = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.post(`http://localhost:10000/admin-dashboard/${selectedTable}`, newRecord, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             fetchRecords(selectedTable);
//         } catch (error) {
//             console.error('Error adding record:', error);
//         }
//     };

//     const handleUpdateRecord = async (id) => {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.put(`http://localhost:10000/admin-dashboard/${selectedTable}/${id}`, editingRecord, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             fetchRecords(selectedTable);
//         } catch (error) {
//             console.error('Error updating record:', error);
//         }
//     };

//     const handleDeleteRecord = async (id) => {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.delete(`http://localhost:10000/admin-dashboard/${selectedTable}/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             fetchRecords(selectedTable);
//         } catch (error) {
//             console.error('Error deleting record:', error);
//         }
//     };

//     return (
//         <div className="admin-dashboard">
//             <h2>Admin Dashboard</h2>
//             <div className="tables-list">
//                 <h3>Tables</h3>
//                 <ul>
//                     <li onClick={() => fetchRecords('students')}>Students</li>
//                     <li onClick={() => fetchRecords('mentors')}>Mentors</li>
//                 </ul>
//             </div>
//             <div className="records-section">
//                 <h3>{selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)} Records</h3>
//                 <table>
//                     <thead>
//                         <tr>
//                             {records.length > 0 && Object.keys(records[0]).map((field, index) => (
//                                 <th key={index}>{field}</th>
//                             ))}
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {records.map((record, index) => (
//                             <tr key={index}>
//                                 {Object.keys(record).map((field, subIndex) => (
//                                     <td key={subIndex}>
//                                         <input
//                                             type="text"
//                                             value={editingRecord.id === record.id ? editingRecord[field] || record[field] : record[field]}
//                                             onChange={(e) => handleInputChange(e, field, editingRecord.id === record.id)}
//                                             disabled={editingRecord.id !== record.id}
//                                         />
//                                     </td>
//                                 ))}
//                                 <td>
//                                     {editingRecord.id === record.id ? (
//                                         <>
//                                             <button onClick={() => handleUpdateRecord(record.id)}>Save</button>
//                                             <button onClick={() => setEditingRecord({})}>Cancel</button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button onClick={() => setEditingRecord(record)}>Edit</button>
//                                             <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
//                                         </>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {selectedTable && records.length > 0 && (
//                     <div className="add-record">
//                         <h3>Add New Record</h3>
//                         {Object.keys(records[0]).map((field, index) => (
//                             <div key={index}>
//                                 <label>{field}</label>
//                                 <input
//                                     type="text"
//                                     value={newRecord[field] || ''}
//                                     onChange={(e) => handleInputChange(e, field)}
//                                 />
//                             </div>
//                         ))}
//                         <button onClick={handleAddRecord}>Add Record</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;
