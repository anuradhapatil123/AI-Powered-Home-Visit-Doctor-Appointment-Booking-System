import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorHealthInfo = () => {
  const { backendUrl } = useContext(AppContext);
  const { dToken } = useContext(DoctorContext);
  const { appointmentId } = useParams();

  const [healthData, setHealthData] = useState(null);

  const getHealthInfo = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/health-info/${appointmentId}`,
        { headers: { token: dToken } }
      );

      console.log("API response:", data);
      console.log("Health Info Object:", data.healthInfo);

      setHealthData(data.healthInfo);
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getHealthInfo();
  }, []);

  return healthData ? (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Patient Health Information</h2>

      <p><strong>Weight:</strong> {healthData.weight}</p>
      <p><strong>Blood Pressure:</strong> {healthData.bp}</p>
      <p><strong>Sugar Level:</strong> {healthData.sugar}</p>
      <p><strong>Notes:</strong> {healthData.notes}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default DoctorHealthInfo;