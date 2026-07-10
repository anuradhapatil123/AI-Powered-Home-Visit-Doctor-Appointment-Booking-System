// import React, { useEffect, useState, useContext } from "react";
// import { DoctorContext } from "../context/DoctorContext";

// const PrescriptionGenerator = () => {
//   const { doctorData, dToken } = useContext(DoctorContext);

//   const [appointments, setAppointments] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const [patientDetails, setPatientDetails] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     weight: ""
//   });

//   const [diagnosis, setDiagnosis] = useState("");
//   const [notes, setNotes] = useState("");
//   const [medications, setMedications] = useState([]);

//   const [newMed, setNewMed] = useState({
//     name: "",
//     dose: "",
//     frequency: "",
//     duration: "",
//     instructions: ""
//   });

//   // ---------------------------------------------------------
//   // FETCH DOCTOR APPOINTMENTS
//   // ---------------------------------------------------------
//   useEffect(() => {
//     if (!dToken) return;

//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/doctor/appointments/${doctorData._id}`
//         );
//         const data = await res.json();
//         setAppointments(data?.appointments || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchAppointments();
//   }, [doctorData, dToken]);

//   // ---------------------------------------------------------
//   // WHEN APPOINTMENT SELECTED → AUTO FILL PATIENT DETAILS
//   // ---------------------------------------------------------
//   const handleAppointmentSelect = (id) => {
//     const appt = appointments.find((item) => item._id === id);
//     setSelectedAppointment(appt);

//     if (appt?.patient) {
//       setPatientDetails({
//         name: appt.patient.name,
//         age: appt.patient.age || "",
//         gender: appt.patient.gender || "",
//         weight: appt.patient.weight || ""
//       });
//     }
//   };

//   // ---------------------------------------------------------
//   // ADD MEDICATION
//   // ---------------------------------------------------------
//   const addMedication = () => {
//     if (!newMed.name) return alert("Medicine name is required");

//     setMedications([...medications, newMed]);
//     setNewMed({ name: "", dose: "", frequency: "", duration: "", instructions: "" });
//   };

//   // ---------------------------------------------------------
//   // SAVE PRESCRIPTION TO MONGODB (BACKEND)
//   // ---------------------------------------------------------
//   const savePrescription = async () => {
//     if (!selectedAppointment) {
//       alert("Select an appointment first");
//       return;
//     }

//     const payload = {
//       appointmentId: selectedAppointment._id,
//       doctorId: doctorData._id,
//       patientId: selectedAppointment.patient._id,

//       doctorDetails: {
//         name: doctorData.name,
//         qual: doctorData.qualifications,
//         clinic: doctorData.clinicName,
//         contact: doctorData.phone
//       },

//       patientDetails,
//       diagnosis,
//       medications,
//       notes
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/prescription/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Prescription Saved Successfully!");
//       } else {
//         alert("Saving failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="generator-container">

//       <h1 className="text-2xl font-bold">Prescription Generator</h1>
//       <p className="text-gray-600 mb-4">Create professional prescriptions in minutes</p>

//       {/* ------------------ LEFT: FORM ------------------ */}
//       <div className="content-area">

//         <div>
//           {/* STEP 1 - Choose Appointment */}
//           <div className="form-step">
//             <h2 className="step-title">Select Appointment</h2>

//             <select
//               className="form-input"
//               onChange={(e) => handleAppointmentSelect(e.target.value)}
//             >
//               <option value="">Select patient appointment</option>
//               {appointments.map((a) => (
//                 <option key={a._id} value={a._id}>
//                   {a.patient.name} — {a.date}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* STEP 2 - Patient Details */}
//           <div className="form-step mt-4">
//             <h2 className="step-title">Patient Details</h2>

//             <div className="form-grid">
//               <div>
//                 <label>Name</label>
//                 <input
//                   className="form-input"
//                   value={patientDetails.name}
//                   onChange={(e) =>
//                     setPatientDetails({ ...patientDetails, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label>Age</label>
//                 <input
//                   className="form-input"
//                   value={patientDetails.age}
//                   onChange={(e) =>
//                     setPatientDetails({ ...patientDetails, age: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label>Gender</label>
//                 <input
//                   className="form-input"
//                   value={patientDetails.gender}
//                   onChange={(e) =>
//                     setPatientDetails({ ...patientDetails, gender: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label>Weight</label>
//                 <input
//                   className="form-input"
//                   value={patientDetails.weight}
//                   onChange={(e) =>
//                     setPatientDetails({ ...patientDetails, weight: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           {/* STEP 3 - Diagnosis */}
//           <div className="form-step mt-4">
//             <h2 className="step-title">Diagnosis</h2>

//             <textarea
//               className="form-input"
//               rows={3}
//               value={diagnosis}
//               onChange={(e) => setDiagnosis(e.target.value)}
//             ></textarea>
//           </div>

//           {/* STEP 4 - Medications */}
//           <div className="form-step mt-4">
//             <h2 className="step-title">Medications</h2>

//             <div className="form-grid">
//               <input
//                 placeholder="Medicine Name"
//                 className="form-input"
//                 value={newMed.name}
//                 onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
//               />
//               <input
//                 placeholder="Dose"
//                 className="form-input"
//                 value={newMed.dose}
//                 onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
//               />
//               <input
//                 placeholder="Frequency"
//                 className="form-input"
//                 value={newMed.frequency}
//                 onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
//               />
//               <input
//                 placeholder="Duration"
//                 className="form-input"
//                 value={newMed.duration}
//                 onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
//               />
//             </div>

//             <textarea
//               className="form-input mt-3"
//               placeholder="Instructions"
//               value={newMed.instructions}
//               onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
//             ></textarea>

//             <button onClick={addMedication} className="btn-primary mt-3">
//               Add Medication
//             </button>

//             {medications.length > 0 && (
//               <ul className="mt-4 medication-list">
//                 {medications.map((m, index) => (
//                   <li className="medication-item" key={index}>
//                     <b>{m.name}</b> — {m.dose}, {m.frequency}, {m.duration}
//                     <br />
//                     <i>{m.instructions}</i>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* STEP 5 - Notes */}
//           <div className="form-step mt-4">
//             <h2 className="step-title">Additional Notes</h2>
//             <textarea
//               className="form-input"
//               rows={3}
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//             ></textarea>
//           </div>

//           <button onClick={savePrescription} className="btn-save w-full mt-4">
//             Save Prescription
//           </button>
//         </div>

//         {/* ------------------ RIGHT: PREVIEW ------------------ */}
//         <div className="preview-panel">
//           <h3>Preview</h3>

//           <div className="preview-box">
//             <div className="header-section">
//               <p className="clinic-name">
//                 {doctorData?.clinicName || "Clinic Name"}
//               </p>
//               <p className="doctor-info">
//                 Dr. {doctorData?.name} ({doctorData?.qualifications})
//               </p>
//               <p className="doctor-contact">{doctorData?.phone}</p>
//             </div>

//             <hr className="divider" />

//             <h3>Patient Info</h3>
//             <p>Name: {patientDetails.name}</p>
//             <p>Age: {patientDetails.age}</p>
//             <p>Gender: {patientDetails.gender}</p>

//             <h3>Diagnosis</h3>
//             <p>{diagnosis}</p>

//             <h3>Medications</h3>
//             {medications.map((m, index) => (
//               <div className="med-item" key={index}>
//                 <b>{m.name}</b>
//                 <ul className="med-details">
//                   <li>Dose: {m.dose}</li>
//                   <li>Frequency: {m.frequency}</li>
//                   <li>Duration: {m.duration}</li>
//                   <li>Instructions: {m.instructions}</li>
//                 </ul>
//               </div>
//             ))}

//             <h3>Notes</h3>
//             <p>{notes}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionGenerator;




// import React, { useEffect, useState, useContext } from "react";
// import { DoctorContext } from "../../context/DoctorContext.jsx";

// const PrescriptionGenerator = () => {
//   const { profileData, dToken, getProfileData } = useContext(DoctorContext);

//   // 🔥 Load doctor profile automatically
//   useEffect(() => {
//     if (dToken) {
//       getProfileData();
//     }
//   }, [dToken]);

//   const [dynamicFields, setDynamicFields] = useState([]);
//   const [prescription, setPrescription] = useState({
//     patientName: "",
//     condition: "",
//     medication: "",
//     email: "",
//     phone: "",
//     additionalNote: "",
//   });

//   const conditionTemplates = {
//     Diabetes: "Metformin 500mg twice daily",
//     Cold: "Cetirizine 10mg once daily",
//     Fever: "Paracetamol 650mg thrice daily",
//     "Blood Pressure": "Amlodipine 5mg once daily",
//   };

//   const enableDynamicFields = (condition) => {
//     setDynamicFields([
//       { label: "Dosage", value: "" },
//       { label: "Duration (Days)", value: "" },
//       { label: "Symptoms", value: "" },
//       { label: "Tests Required", value: "" },
//     ]);

//     if (conditionTemplates[condition]) {
//       setPrescription((prev) => ({
//         ...prev,
//         medication: conditionTemplates[condition],
//       }));
//     }
//   };

//   const generatePrescription = async () => {
//     if (!prescription.patientName || !prescription.condition || !prescription.medication) {
//       alert("Please fill all mandatory fields!");
//       return;
//     }

//     const finalPrescription = {
//       patientName: prescription.patientName,
//       condition: prescription.condition,
//       medication: prescription.medication,
//       email: prescription.email,
//       phone: prescription.phone,
//       additionalNote: prescription.additionalNote,
//       dynamicFields: dynamicFields,

//       doctorId: profileData?._id,
//       doctorDetails: {
//         name: profileData?.name,
//         qual: profileData?.qualifications,
//         clinic: profileData?.clinicName,
//         contact: profileData?.phone,
//       },
//     };

//     console.log("Generated Prescription:", finalPrescription);
//     alert("Prescription Successfully Generated!");
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>🩺 Prescription Generator</h2>

//       <div style={styles.form}>
//         <label>Patient Name:</label>
//         <input
//           style={styles.input}
//           value={prescription.patientName}
//           onChange={(e) =>
//             setPrescription({ ...prescription, patientName: e.target.value })
//           }
//         />

//         <label>Condition:</label>
//         <select
//           style={styles.input}
//           onChange={(e) => {
//             setPrescription({ ...prescription, condition: e.target.value });
//             enableDynamicFields(e.target.value);
//           }}
//         >
//           <option value="">Select Condition</option>
//           <option>Diabetes</option>
//           <option>Fever</option>
//           <option>Cold</option>
//           <option>Blood Pressure</option>
//         </select>

//         <label>Medication:</label>
//         <input
//           style={styles.input}
//           value={prescription.medication}
//           onChange={(e) =>
//             setPrescription({ ...prescription, medication: e.target.value })
//           }
//         />

//         <label>Email:</label>
//         <input
//           style={styles.input}
//           value={prescription.email}
//           onChange={(e) =>
//             setPrescription({ ...prescription, email: e.target.value })
//           }
//         />

//         <label>Phone:</label>
//         <input
//           style={styles.input}
//           value={prescription.phone}
//           onChange={(e) =>
//             setPrescription({ ...prescription, phone: e.target.value })
//           }
//         />

//         <label>Additional Note:</label>
//         <textarea
//           style={styles.textarea}
//           value={prescription.additionalNote}
//           onChange={(e) =>
//             setPrescription({
//               ...prescription,
//               additionalNote: e.target.value,
//             })
//           }
//         ></textarea>

//         {dynamicFields.map((field, index) => (
//           <div key={index}>
//             <label>{field.label}:</label>
//             <input
//               style={styles.input}
//               value={field.value}
//               onChange={(e) => {
//                 let updated = [...dynamicFields];
//                 updated[index].value = e.target.value;
//                 setDynamicFields(updated);
//               }}
//             />
//           </div>
//         ))}

//         <button style={styles.button} onClick={generatePrescription}>
//           Generate Prescription
//         </button>
//       </div>

//       {/* Live Preview */}
//       <div style={styles.preview}>
//         <h3 style={styles.previewTitle}>📄 Live Prescription Preview</h3>

//         <p><strong>Clinic:</strong> {profileData?.clinicName || "—"}</p>
//         <p><strong>Doctor:</strong> Dr. {profileData?.name || "—"}</p>
//         <p><strong>Contact:</strong> {profileData?.phone || "—"}</p>

//         <hr />

//         <p><strong>Patient:</strong> {prescription.patientName}</p>
//         <p><strong>Condition:</strong> {prescription.condition}</p>
//         <p><strong>Medication:</strong> {prescription.medication}</p>
//         <p><strong>Email:</strong> {prescription.email}</p>
//         <p><strong>Phone:</strong> {prescription.phone}</p>
//         <p><strong>Notes:</strong> {prescription.additionalNote}</p>

//         {dynamicFields.map((field, index) => (
//           <p key={index}>
//             <strong>{field.label}:</strong> {field.value}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };


// // Styling
// const styles = {
//   container: {
//     display: "flex",
//     gap: "30px",
//     padding: "20px",
//   },
//   title: {
//     fontSize: "24px",
//     marginBottom: "10px",
//     fontWeight: "bold",
//   },
//   form: {
//     width: "45%",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//   },
//   input: {
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid gray",
//   },
//   textarea: {
//     height: "80px",
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid gray",
//   },
//   button: {
//     background: "#007bff",
//     color: "white",
//     padding: "10px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   preview: {
//     width: "45%",
//     padding: "20px",
//     border: "1px solid #007bff",
//     borderRadius: "10px",
//     background: "#f0f8ff",
//   },
//   previewTitle: {
//     fontSize: "20px",
//     marginBottom: "10px",
//     fontWeight: "bold",
//   },
// };

// export default PrescriptionGenerator;


// import React, { useState, useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";

// const PrescriptionGenerator = () => {
//   const { profileData, getProfileData, dToken } = useContext(DoctorContext);

//   useEffect(() => {
//     if (dToken) getProfileData();
//   }, [dToken]);

//   // Steps
//   const [step, setStep] = useState(1);

//   // Patient Info
//   const [patient, setPatient] = useState({ name: "", age: "", gender: "", symptoms: "" });

//   // Condition Info
//   const [condition, setCondition] = useState({ issue: "", diagnosis: "", bp: "", sugar: "" });

//   // Medications
//   const [medications, setMedications] = useState([]);
//   const [medInput, setMedInput] = useState({ name: "", dosage: "", frequency: "", duration: "" });

//   const addMedicine = () => {
//     if (!medInput.name) return;
//     setMedications([...medications, medInput]);
//     setMedInput({ name: "", dosage: "", frequency: "", duration: "" });
//   };

//   const removeMedicine = (index) => {
//     setMedications(medications.filter((_, i) => i !== index));
//   };

//   if (!profileData) return <div className="p-6 text-center">Loading doctor profile...</div>;

//   return (
//     <div className="p-6 w-full">
//       <h2 className="text-3xl font-bold text-blue-700 mb-4">Multi‑Step Prescription Generator</h2>

//       {/* Steps Indicator */}
//       <div className="flex gap-4 mb-6">
//         {[1, 2, 3, 4, 5].map((s) => (
//           <div
//             key={s}
//             className={`px-4 py-2 rounded-xl text-white font-semibold ${step === s ? "bg-blue-600" : "bg-blue-300"}`}
//           >
//             Step {s}
//           </div>
//         ))}
//       </div>

//       {/* Step 1: Patient Details */}
//       {step === 1 && (
//         <div className="bg-white p-6 shadow rounded-2xl">
//           <h3 className="text-xl font-semibold mb-4">Patient Details</h3>

//           <div className="grid grid-cols-2 gap-4">
//             <input className="input" placeholder="Patient Name" value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} />
//             <input className="input" placeholder="Age" value={patient.age} onChange={(e) => setPatient({ ...patient, age: e.target.value })} />
//             <input className="input" placeholder="Gender" value={patient.gender} onChange={(e) => setPatient({ ...patient, gender: e.target.value })} />
//             <input className="input" placeholder="Symptoms" value={patient.symptoms} onChange={(e) => setPatient({ ...patient, symptoms: e.target.value })} />
//           </div>

//           <button className="btn-primary mt-4" onClick={() => setStep(2)}>Next</button>
//         </div>
//       )}

//       {/* Step 2: Condition */}
//       {step === 2 && (
//         <div className="bg-white p-6 shadow rounded-2xl">
//           <h3 className="text-xl font-semibold mb-4">Condition & Diagnosis</h3>

//           <div className="grid grid-cols-2 gap-4">
//             <input className="input" placeholder="Condition / Issue" value={condition.issue} onChange={(e) => setCondition({ ...condition, issue: e.target.value })} />
//             <input className="input" placeholder="Diagnosis" value={condition.diagnosis} onChange={(e) => setCondition({ ...condition, diagnosis: e.target.value })} />
//             <input className="input" placeholder="Blood Pressure (BP)" value={condition.bp} onChange={(e) => setCondition({ ...condition, bp: e.target.value })} />
//             <input className="input" placeholder="Sugar Level" value={condition.sugar} onChange={(e) => setCondition({ ...condition, sugar: e.target.value })} />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
//             <button className="btn-primary" onClick={() => setStep(3)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 3: Medications */}
//       {step === 3 && (
//         <div className="bg-white p-6 shadow rounded-2xl">
//           <h3 className="text-xl font-semibold mb-4">Medications</h3>

//           <div className="grid grid-cols-4 gap-4">
//             <input className="input" placeholder="Medicine Name" value={medInput.name} onChange={(e) => setMedInput({ ...medInput, name: e.target.value })} />
//             <input className="input" placeholder="Dosage" value={medInput.dosage} onChange={(e) => setMedInput({ ...medInput, dosage: e.target.value })} />
//             <input className="input" placeholder="Frequency" value={medInput.frequency} onChange={(e) => setMedInput({ ...medInput, frequency: e.target.value })} />
//             <input className="input" placeholder="Duration" value={medInput.duration} onChange={(e) => setMedInput({ ...medInput, duration: e.target.value })} />
//           </div>

//           <button className="btn-primary mt-3" onClick={addMedicine}>Add Medicine</button>

//           <ul className="mt-4">
//             {medications.map((m, i) => (
//               <li key={i} className="flex justify-between bg-gray-100 p-2 rounded mb-2">
//                 {m.name} — {m.dosage} — {m.frequency} — {m.duration}
//                 <button className="text-red-600" onClick={() => removeMedicine(i)}>Remove</button>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between mt-4">
//             <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
//             <button className="btn-primary" onClick={() => setStep(4)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 4: Doctor Details Auto‑Filled */}
//       {step === 4 && (
//         <div className="bg-white p-6 shadow rounded-2xl">
//           <h3 className="text-xl font-semibold mb-4">Doctor Details (Auto‑Filled)</h3>

//           <div className="grid grid-cols-2 gap-4">
//             <input className="input" value={profileData.name} readOnly />
//             <input className="input" value={profileData.degree} readOnly />
//             <input className="input" value={profileData.speciality} readOnly />
//             <input className="input" value={profileData.experience} readOnly />
//             <input className="input col-span-2" value={`${profileData.address.line1}, ${profileData.address.line2}`} readOnly />
//             <input className="input col-span-2" value={profileData.email} readOnly />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button className="btn-secondary" onClick={() => setStep(3)}>Back</button>
//             <button className="btn-primary" onClick={() => setStep(5)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 5: Final Review */}
//       {step === 5 && (
//         <div className="bg-white p-6 shadow rounded-2xl">
//           <h3 className="text-xl font-semibold mb-4">Review & Print</h3>

//           <div className="border p-4 rounded-xl bg-blue-50">
//             <h2 className="text-2xl font-bold text-blue-700">Prescription</h2>
//             <p className="mt-2"><strong>Doctor:</strong> {profileData.name} ({profileData.degree})</p>
//             <p><strong>Speciality:</strong> {profileData.speciality}</p>
//             <p><strong>Address:</strong> {profileData.address.line1}, {profileData.address.line2}</p>
//             <p><strong>Email:</strong> {profileData.email}</p>

//             <hr className="my-4" />

//             <p><strong>Patient:</strong> {patient.name} ({patient.age}, {patient.gender})</p>
//             <p><strong>Symptoms:</strong> {patient.symptoms}</p>

//             <p className="mt-2"><strong>Diagnosis:</strong> {condition.diagnosis}</p>
//             <p><strong>BP:</strong> {condition.bp} — <strong>Sugar:</strong> {condition.sugar}</p>

//             <h3 className="text-lg font-semibold mt-4">Medications:</h3>
//             <ul className="list-disc ml-6">
//               {medications.map((m, i) => (
//                 <li key={i}>{m.name} — {m.dosage} — {m.frequency} — {m.duration}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex justify-between mt-6">
//             <button className="btn-secondary" onClick={() => setStep(4)}>Back</button>
//             <button className="btn-primary" onClick={() => window.print()}>Print Prescription</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrescriptionGenerator;


// Tailwind utility classes
// Add these to your global CSS if needed:
// .input { @apply p-2 border rounded-lg w-full; }
// .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded-lg; }
// .btn-secondary { @apply bg-gray-300 text-black px-4 py-2 rounded-lg; }











import React, { useState, useRef } from "react";
// Import the custom CSS file
import './Prescription.css'; 
// NOTE: We keep this import commented out as the data is defined below
// import { CONDITIONS, defaultDoctor, getCurrentDate } from './constants'; 




const CONDITION_TEMPLATES = [
  { id: 'custom', title: 'Custom Prescription', category: 'General', meds: [] },

  // ⭐ NEW — Common Cold
  { 
    id: 'cold', 
    title: 'Cold', 
    category: 'Respiratory', 
    meds: [
      { name: 'Cetirizine', dose: '10 mg', frequency: 'Once daily (HS)', duration: '5 days', instructions: 'Take at night; may cause drowsiness.' },
      { name: 'Paracetamol', dose: '500 mg', frequency: 'Every 6 hours if needed', duration: '3 days', instructions: 'Only for fever/body pain.' }
    ] 
  },

  // ⭐ NEW — Fever
  { 
    id: 'fever', 
    title: 'Fever', 
    category: 'General', 
    meds: [
      { name: 'Paracetamol', dose: '650 mg', frequency: '3 times daily (TDS)', duration: '3–5 days', instructions: 'Take after food.' },
      { name: 'ORS Solution', dose: '200 ml', frequency: 'As needed', duration: '2 days', instructions: 'Maintain hydration.' }
    ] 
  },

  // ⭐ UPDATED — Skin Infection (Keep as it is)
  { 
    id: 'skin_infection', 
    title: 'Skin Infection', 
    category: 'Infection', 
    meds: [
      { name: 'Cephalexin', dose: '500 mg', frequency: 'Four times daily', duration: '7–10 days', instructions: 'Complete full course.' },
      { name: 'Topical Antibiotic Ointment', dose: 'Apply thin layer', frequency: 'Twice daily', duration: '7 days', instructions: 'Apply locally on affected area.' }
    ] 
  }
];



function defaultDoctorData() {
  return {
    name: 'Dr. Richard James',
    qual: 'General physician',
    clinic: 'Wellness Medical Center, #56, Bhagya Nagar Main Road, Belagavi',
    contact: '9876785412 | dr.Richard@clinic.com'
  };
}

function escapeHtml(s) { if (!s) return ''; return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

const PrescriptionGenerator = ({ appointmentId, patientDetails = {} }) => {
  const [step, setStep] = useState(0); // 0:Patient, 1:Condition, 2:Medications, 3:Doctor, 4:Review
  const [patient, setPatient] = useState({ 
    name: patientDetails.name || '', 
    age: patientDetails.age || '', 
    gender: patientDetails.gender || 'Female', 
    weight: patientDetails.weight || '' 
  });
  const [selectedCondition, setSelectedCondition] = useState('custom');
  const [medications, setMedications] = useState([]);
  const [doctor, setDoctor] = useState(defaultDoctorData());
  const [notes, setNotes] = useState('');
  const previewRef = useRef();

  // --- Core Logic ---
  const currentDiagnosisTitle = CONDITION_TEMPLATES.find(c => c.id === selectedCondition)?.title || 'N/A';

  function chooseCondition(id) {
    setSelectedCondition(id);
    const tmpl = CONDITION_TEMPLATES.find(c => c.id === id);
    if (tmpl && tmpl.meds && tmpl.meds.length) {
      setMedications(tmpl.meds.map(m => ({ ...m })));
    } else if (id === 'custom') {
      setMedications([]);
    }
  }

  function addMed() {
    setMedications(prev => [...prev, { name: '', dose: '', frequency: '', duration: '', instructions: '' }]);
  }
  function updateMed(idx, key, value) {
    setMedications(prev => prev.map((m, i) => i === idx ? { ...m, [key]: value } : m));
  }
  function removeMed(idx) {
    setMedications(prev => prev.filter((_, i) => i !== idx));
  }

  function next() { 
    if (step < 4) setStep(step + 1); 
  }
  function prev() { 
    if (step > 0) setStep(step - 1); 
  }

  // --- Output Handlers ---

  function renderPrintableHtml() {
    const patientHtml = `
      <div class="header-section">
        <h2 class="clinic-name">${escapeHtml(doctor.clinic)}</h2>
        <div class="doctor-info">${escapeHtml(doctor.name)} ${escapeHtml(doctor.qual)}</div>
        <div class="doctor-contact">${escapeHtml(doctor.contact)}</div>
      </div>
      <hr class="divider"/>
      <div class="patient-info">
        <h3>Patient Details</h3>
        <div><strong>Name:</strong> ${patient.name || '—'} | <strong>Age:</strong> ${patient.age || '—'} | <strong>Gender:</strong> ${patient.gender || '—'} ${patient.weight ? `| <strong>Weight:</strong> ${patient.weight} kg` : ''}</div>
        <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
      <div class="diagnosis-section">
        <h3>Diagnosis (ICD-10)</h3>
        <p>${escapeHtml(currentDiagnosisTitle)}</p>
      </div>
      <div class="prescription-list">
        <h3>℞ Prescription</h3>
        ${medications.map((m, i) => `
          <div class="med-item">
            <div class="med-name"><strong>${i + 1}. ${escapeHtml(m.name || '—')}</strong></div>
            <ul class="med-details">
              <li>Dosage: ${escapeHtml(m.dose || '—')}</li>
              <li>Frequency: ${escapeHtml(m.frequency || '—')}</li>
              <li>Duration: ${escapeHtml(m.duration || '—')}</li>
              <li>Instructions: ${escapeHtml(m.instructions || '—')}</li>
            </ul>
          </div>
        `).join('')}
      </div>
      <div class="general-notes">
        <h3>General Instructions / Notes</h3>
        <p>${escapeHtml(notes || 'No specific instructions provided.')}</p>
      </div>
      <div class="signature">
        <p>Doctor's Signature: _________________________</p>
      </div>
    `;
    return patientHtml;
  }

  function printPreview() {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    // START OF PRINT STYLE FIX
    const style = `
      <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 25px; 
            color: #000000; /* Ensure base body text is black */
        }
        .header-section { text-align: center; margin-bottom: 15px; }
        .clinic-name { font-size: 1.5em; font-weight: bold; color: #1f2937; margin-bottom: 5px;}
        .doctor-info, .doctor-contact { font-size: 0.9em; color: #4b5563; }
        .divider { border: 0; height: 1px; background-color: #e5e7eb; margin: 15px 0; }
        h3 { color: #10b981; border-bottom: 1px solid #d1fae5; padding-bottom: 5px; margin-top: 20px; font-size: 1.1em; }
        /* Fix for invisible text inside the medication list items */
        .med-item * { 
            color: #000000 !important; 
        }
        .patient-info div, .diagnosis-section p { margin-top: 5px; font-size: 0.95em; }
        .med-item { margin-bottom: 15px; padding: 10px; border-left: 3px solid #3b82f6; background: #f0f9ff; }
        .med-name { font-size: 1em; margin-bottom: 5px; }
        .med-details { list-style: none; padding-left: 15px; font-size: 0.9em; }
        .signature { margin-top: 40px; text-align: right; font-size: 0.9em; }
      </style>
    `;
    // END OF PRINT STYLE FIX
    
    const html = `<!doctype html><html><head><title>Prescription</title>${style}</head><body>${renderPrintableHtml()}</body></html>`;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    // Use a slight delay to ensure content loads before printing is triggered
    setTimeout(() => { printWindow.print(); }, 500);
  }

  function handleSave() {
    const finalPrescriptionData = {
      appointmentId: appointmentId || 'APPOINTMENT_ID_MISSING',
      date: new Date().toISOString(),
      patient: patient,
      doctor: doctor,
      diagnosis: currentDiagnosisTitle,
      medications: medications,
      notes: notes,
    };

    console.log("Saving Prescription Data to API:", finalPrescriptionData);

    // *** INTEGRATION POINT: Replace this alert with your actual API call ***
    
    alert('Prescription finalized and ready to be saved via API. Check console for data structure.');
  }

  // --- Render Steps (using CSS classes for layout) ---

  function renderPatientStep() {
    return (
      <div className="form-step">
        <h2 className="step-title">👤 Patient Information</h2>
        <div className="form-grid">
          <label>Name
            <input value={patient.name} onChange={e => setPatient({ ...patient, name: e.target.value })}
              className="form-input" placeholder="Patient's full name" required />
          </label>
          <label>Age (Years)
            <input type="number" value={patient.age} onChange={e => setPatient({ ...patient, age: e.target.value })}
              className="form-input" placeholder="e.g., 45" />
          </label>
          <label>Gender
            <select value={patient.gender} onChange={e => setPatient({ ...patient, gender: e.target.value })}
              className="form-input">
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </label>
          <label>Weight (kg)
            <input type="number" value={patient.weight} onChange={e => setPatient({ ...patient, weight: e.target.value })}
              className="form-input" placeholder="Optional" />
          </label>
        </div>
        {/* NOTE: No next/prev here, navigation is only in the footer */}
      </div>
    );
  }

  function renderConditionStep() {
    return (
      <div className="form-step">
        <h2 className="step-title">📋 Select Diagnosis Template</h2>
        <p className="step-description">Choosing a template automatically suggests relevant medications and instructions.</p>
        <div className="condition-grid">
          {CONDITION_TEMPLATES.map(c => (
            <button key={c.id} onClick={() => chooseCondition(c.id)}
              className={`condition-card ${selectedCondition === c.id ? 'active' : ''}`}>
              <div className="card-title">{c.title}</div>
              <div className="card-category">{c.category}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function renderMedicationsStep() {
    return (
      <div className="form-step">
        <div className="flex-header">
          <h2 className="step-title">💊 Prescribe Medications</h2>
          <button onClick={addMed} className="btn-primary">+ Add New Medication</button>
        </div>
        {medications.length === 0 && <div className="warning-box">No medications added. Click '+ Add New Medication' above.</div>}
        <div className="medication-list">
          {medications.map((m, idx) => (
            <div key={idx} className="medication-item">
              <div className="med-header">
                <div className="med-counter">{idx + 1}</div>
                <h3 className="med-title">Medication Details</h3>
                <button onClick={() => removeMed(idx)} className="btn-remove">Remove</button>
              </div>

              <div className="form-grid-med">
                <label className="span-2">Name
                  <input value={m.name} onChange={e => updateMed(idx, 'name', e.target.value)} className="form-input" placeholder="e.g., Amoxicillin 500mg" />
                </label>
                <label>Dosage
                  <input value={m.dose} onChange={e => updateMed(idx, 'dose', e.target.value)} className="form-input" placeholder="e.g., 500 mg" />
                </label>
                <label>Frequency
                  <input value={m.frequency} onChange={e => updateMed(idx, 'frequency', e.target.value)} className="form-input" placeholder="e.g., Twice daily (BD)" />
                </label>
                <label>Duration
                  <input value={m.duration} onChange={e => updateMed(idx, 'duration', e.target.value)} className="form-input" placeholder="e.g., 7 days" />
                </label>
                <label className="span-4">Instructions / Notes (Take after food, etc.)
                  <textarea value={m.instructions} onChange={e => updateMed(idx, 'instructions', e.target.value)} className="form-input" rows={2} />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderDoctorStep() {
    return (
      <div className="form-step">
        <h2 className="step-title">👨‍⚕️ Doctor / Clinic Information</h2>
        <p className="step-description">This information will appear on the final prescription header.</p>
        <div className="form-grid">
          <label>Doctor Name
            <input value={doctor.name} onChange={e => setDoctor({ ...doctor, name: e.target.value })} className="form-input" />
          </label>
          <label>Qualifications
            <input value={doctor.qual} onChange={e => setDoctor({ ...doctor, qual: e.target.value })} className="form-input" />
          </label>
          <label>Clinic / Hospital
            <input value={doctor.clinic} onChange={e => setDoctor({ ...doctor, clinic: e.target.value })} className="form-input" />
          </label>
          <label>Contact Info
            <input value={doctor.contact} onChange={e => setDoctor({ ...doctor, contact: e.target.value })} className="form-input" />
          </label>
        </div>
        <div className="mt-6">
          <label>Additional Notes (General Instructions for Patient)
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="form-input" rows={4} />
          </label>
        </div>
      </div>
    );
  }

  function renderReviewStep() {
    return (
      <div className="form-step">
        <h2 className="step-title">✅ Final Review & Save</h2>
        <p className="step-description">Verify the details below before finalizing the prescription.</p>
        
        <div className="review-box">
          <div className="review-section">
            <h3 className="review-title">Patient & Diagnosis</h3>
            <p><strong>Name:</strong> {patient.name || '—'} | <strong>Age:</strong> {patient.age || '—'} | <strong>Gender:</strong> {patient.gender || '—'}</p>
            <p><strong>Diagnosis:</strong> {currentDiagnosisTitle}</p>
          </div>
          <div className="review-section">
            <h3 className="review-title">Prescribed Medications ({medications.length})</h3>
            <ul className="med-review-list">
              {medications.map((m, i) => (
                <li key={i}>
                  <strong className="text-blue-600">{i + 1}. {m.name}</strong> 
                  <span className="text-gray-600"> ({m.dose} - {m.frequency} for {m.duration})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="review-section">
            <h3 className="review-title">Doctor Notes</h3>
            <p className="note-text">{notes || 'No general notes.'}</p>
          </div>
        </div>

        <div className="action-buttons-review">
          <button onClick={handleSave} className="btn-save">
            💾 Save & Finalize Prescription
          </button>
          <button onClick={printPreview} className="btn-print">
            🖨️ Print / Generate PDF
          </button>
        </div>
      </div>
    );
  }

  // --- Main Render ---

  const renderStepContent = () => {
    switch (step) {
      case 0: return renderPatientStep();
      case 1: return renderConditionStep();
      case 2: return renderMedicationsStep();
      case 3: return renderDoctorStep();
      case 4: return renderReviewStep();
      default: return null;
    }
  };

  return (
    <div className="generator-container">
      <div className="progress-bar">
        {['Patient', 'Diagnosis', 'Meds', 'Doctor', 'Review'].map((label, i) => (
          <div key={i} className={`progress-step ${i <= step ? 'active' : ''}`}>
            <div className="progress-icon">{i + 1}</div>
            <div className="progress-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="content-area">
        <div className="main-form">
          {renderStepContent()}
        </div>
        
        <div className="preview-panel">
          <h3>Quick Preview (Final Look)</h3>
          <div className="preview-box" ref={previewRef} dangerouslySetInnerHTML={{ __html: renderPrintableHtml() }}>
            {/* Content injected here via renderPrintableHtml */}
          </div>
        </div>
      </div>
      
      <div className="navigation-footer">
        <button onClick={prev} disabled={step === 0} className="btn-secondary">
          ← Previous
        </button>
        {/* FIX: Set the 'Next' button to be hidden only on the final step (4) */}
        <button 
          onClick={next} 
          className={`btn-primary ${step === 4 ? 'hidden' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PrescriptionGenerator;
