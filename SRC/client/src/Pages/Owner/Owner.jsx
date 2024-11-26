import "../Page.css";
import "./Owner.css";
import Container from "../Container";
import Modal from "../Core/Modal/Modal";
import Compare from "./Compare/Compare";
import EnergyProduced from "./EnergyProduced/EnergyProduced";
import MoneyEarned from "./MoneyEarned/MoneyEarned";
import ViewPanels from "./ViewPanels/ViewPanels";
import PanelStatus from "./PanelStatus/PanelStatus";
import PanelEnergyProduced from "./PanelEnergyProduced/PanelEnergyProduced";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Owner() {
  const navigate = useNavigate();

  // Modal State
  const [isModal1Open, setIsModal1Open] = useState(false); // Compare
  const [isModal2Open, setIsModal2Open] = useState(false); // Energy Produced
  const [isModal3Open, setIsModal3Open] = useState(false); // Money Earned
  const [isModal4Open, setIsModal4Open] = useState(false); // View Panels
  const [isModal5Open, setIsModal5Open] = useState(false); // Panel Status
  const [isModal6Open, setIsModal6Open] = useState(false); // Panel Energy Produced

  // Modal Functions
  const openModal1 = () => {
    setIsModal1Open(true);
  };

  const closeModal1 = () => {
    setIsModal1Open(false);
  };

  const openModal2 = (farm) => {
    setFarmData(farm);
    setIsModal2Open(true);
  };

  const closeModal2 = () => {
    setFarmData({});
    setIsModal2Open(false);
  };

  const openModal3 = (farm) => {
    setFarmData(farm);
    setIsModal3Open(true);
  };

  const closeModal3 = () => {
    setFarmData({});
    setIsModal3Open(false);
  };

  const openModal4 = (farm) => {
    setFarmData(farm);
    setIsModal4Open(true);
  };

  const closeModal4 = () => {
    setFarmData({});
    setPanelData({});
    setIsModal4Open(false);
  };

  const openModal5 = () => {
    setIsModal5Open(true);
  };

  const closeModal5 = () => {
    setIsModal5Open(false);
  };

  const openModal6 = () => {
    setIsModal6Open(true);
  };

  const closeModal6 = () => {
    setIsModal6Open(false);
  };

  // Data State
  const [farms, setFarms] = useState([]);
  const [farmData, setFarmData] = useState({});
  const [panelData, setPanelData] = useState({});

  // Fetch Owner Farms
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.type !== "owner") {
      return navigate("/");
    }
    axios
      .get(`/api/owner/farms/${user.id}`)
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
          {/* Compare Energy Produced For All Farms */}
          <button onClick={openModal1}>
            Compare Energy Produced For All Farms
          </button>

          <h1>Your Farms</h1>
          {/* Map Over Each Owner Farm */}
          {farms.length !== 0 ? (
            <div className="farm-grid">
              {farms.map((farm) => (
                <div className="farm" key={farm.farmID}>
                  <h2>Farm {farm.farmID}</h2>
                  {/* View Energy Produced */}
                  <button onClick={() => openModal2(farm)}>
                    View Energy Produced
                  </button>
                  {/* View Money Earned */}
                  <button onClick={() => openModal3(farm)}>
                    View Money Earned
                  </button>
                  {/* View Panels */}
                  <button onClick={() => openModal4(farm)}>View Panels</button>
                </div>
              ))}
            </div>
          ) : (
            <h2>No Farms Found</h2>
          )}

          {/* Modals */}
          <Modal open={isModal1Open} onClose={closeModal1}>
            <Compare />
          </Modal>
          <Modal open={isModal2Open} onClose={closeModal2}>
            <EnergyProduced farmData={farmData} />
          </Modal>
          <Modal open={isModal3Open} onClose={closeModal3}>
            <MoneyEarned farmData={farmData} />
          </Modal>
          <Modal open={isModal4Open} onClose={closeModal4}>
            <ViewPanels
              farmData={farmData}
              panelData={panelData}
              setPanelData={setPanelData}
              openStatusModal={openModal5}
              openEnergyModal={openModal6}
            />
          </Modal>
          <Modal open={isModal5Open} onClose={closeModal5} zIndex={1100}>
            <PanelStatus panelData={panelData} />
          </Modal>
          <Modal open={isModal6Open} onClose={closeModal6} zIndex={1100}>
            <PanelEnergyProduced panelData={panelData} />
          </Modal>
        </div>
      </Container>
    </div>
  );
}

export default Owner;
