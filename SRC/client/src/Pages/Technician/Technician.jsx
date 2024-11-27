import "../Page.css";
import "./Technician.css";
import Container from "../Container";
import Modal from "../Core/Modal/Modal";
import CompletedMaintenance from "./CompletedMaintenance/CompletedMaintenance";
import ScheduledMaintenance from "./ScheduledMaintenance/ScheduledMaintenance";
import UpdateMaintenance from "./UpdateMaintenance/UpdateMaintenance";
import DeleteMaintenance from "./DeleteMaintenance/DeleteMaintenance";
import ScheduleMaintenance from "./ScheduleMaintenance/ScheduleMaintenance";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Technician() {
  const navigate = useNavigate();

  // Modal State
  const [isModal1Open, setIsModal1Open] = useState(false); // View Completed
  const [isModal2Open, setIsModal2Open] = useState(false); // View Scheduled
  const [isModal3Open, setIsModal3Open] = useState(false); // Update Scheduled
  const [isModal4Open, setIsModal4Open] = useState(false); // Delete Scheduled Confirmation
  const [isModal5Open, setIsModal5Open] = useState(false); // View Panels

  // Modal Functions
  const openModal1 = (farm) => {
    setFarmData(farm);
    setIsModal1Open(true);
  };

  const closeModal1 = () => {
    setFarmData({});
    setIsModal1Open(false);
  };

  const openModal2 = (farm) => {
    setFarmData(farm);
    setIsModal2Open(true);
  };

  const closeModal2 = () => {
    setFarmData({});
    setMaintenanceData({});
    setIsModal2Open(false);
  };

  const openModal3 = () => {
    setIsModal3Open(true);
  };

  const closeModal3 = () => {
    setIsModal3Open(false);
  };

  const openModal4 = () => {
    setIsModal4Open(true);
  };

  const closeModal4 = () => {
    setIsModal4Open(false);
  };

  const openModal5 = (farm) => {
    setFarmData(farm);
    setIsModal5Open(true);
  };

  const closeModal5 = () => {
    setFarmData({});
    setIsModal5Open(false);
  };

  // Data State
  const [technicianData, setTechnicianData] = useState({});
  const [farms, setFarms] = useState([]);
  const [farmData, setFarmData] = useState({});
  const [maintenanceData, setMaintenanceData] = useState({});

  // Fetch All Farms
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.type !== "technician") {
      return navigate("/");
    }
    setTechnicianData(user);
    axios
      .get(`/api/technician/farms`)
      .then((res) => {
        if (res.data) setFarms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div className="owner page">
      <Container>
        <div className="frame">
          <h1>All Farms</h1>
          {/* Map Over All Farms */}
          {farms.length !== 0 ? (
            <div className="farm-grid">
              {farms.map((farm) => (
                <div className="farm" key={farm.farmID}>
                  <h2>Farm {farm.farmID}</h2>
                  <button onClick={() => openModal1(farm)}>
                    View Completed Maintenance
                  </button>
                  <button onClick={() => openModal2(farm)}>
                    View Scheduled Maintenance
                  </button>
                  <button onClick={() => openModal5(farm)}>
                    Schedule Maintenance
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <h2>No Farms Found</h2>
          )}
        </div>
        {/* Modals */}
        <Modal open={isModal1Open} onClose={closeModal1}>
          <CompletedMaintenance
            technicianData={technicianData}
            farmData={farmData}
          />
        </Modal>
        <Modal open={isModal2Open} onClose={closeModal2}>
          <ScheduledMaintenance
            technicianData={technicianData}
            farmData={farmData}
            maintenanceData={maintenanceData}
            setMaintenanceData={setMaintenanceData}
            openUpdateModal={openModal3}
            openDeleteModal={openModal4}
          />
        </Modal>
        <Modal open={isModal3Open} onClose={closeModal3}>
          <UpdateMaintenance
            maintenanceData={maintenanceData}
            setMaintenanceData={setMaintenanceData}
          />
        </Modal>
        <Modal open={isModal4Open} onClose={closeModal4}>
          <DeleteMaintenance
            maintenanceData={maintenanceData}
            setMaintenanceData={setMaintenanceData}
          />
        </Modal>
        <Modal open={isModal5Open} onClose={closeModal5} zIndex={1100}>
          <ScheduleMaintenance
            technicianData={technicianData}
            farmData={farmData}
          />
        </Modal>
      </Container>
    </div>
  );
}

export default Technician;
