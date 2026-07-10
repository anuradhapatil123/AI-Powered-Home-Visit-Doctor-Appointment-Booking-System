// import express from 'express';
// import { loginDoctor, appointmentsDoctor, appointmentCancel, doctorList, changeAvailablity, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js';
// import authDoctor from '../middleware/authDoctor.js';
// const doctorRouter = express.Router();

// doctorRouter.post("/login", loginDoctor)
// doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
// doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
// doctorRouter.get("/list", doctorList)
// doctorRouter.post("/change-availability", authDoctor, changeAvailablity)
// doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
// doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
// doctorRouter.get("/profile", authDoctor, doctorProfile)
// doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)

// export default doctorRouter;

import express from "express";
import {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  changeAvailablity,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

// --- AUTH ---
doctorRouter.post("/login", loginDoctor);

// --- APPOINTMENTS ---
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);

// --- DOCTOR PROFILE ---
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

// --- DASHBOARD / LIST / AVAILABILITY ---
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/list", doctorList);
doctorRouter.post("/change-availability", authDoctor, changeAvailablity);

export default doctorRouter;
