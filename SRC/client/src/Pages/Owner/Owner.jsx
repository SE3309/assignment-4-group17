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

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [isModal4Open, setIsModal4Open] = useState(false);
  const [isModal5Open, setIsModal5Open] = useState(false);
  const [isModal6Open, setIsModal6Open] = useState(false);

  const openModal1 = () => {
    setIsModal1Open(true);
  };

  const closeModal1 = () => {
    setIsModal1Open(false);
  };

  const openModal2 = () => {
    setIsModal2Open(true);
  };

  const closeModal2 = () => {
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

  const [user, setUser] = useState({});
  const [farms, setFarms] = useState([1, 2]);
  const [farmData, setFarmData] = useState({});
  const [panelData, setPanelData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.type !== "owner") {
      return navigate("/");
    }
    setUser(user);
    axios
      .get(`/api/owner/farm/${user.id}`)
      .then((res) => {
        // setFarms(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div className="owner page">
      <Container>
        <h1>Owner</h1>
        <button onClick={openModal1}>
          Compare Energy Produced For All Farms
        </button>
        <div>
          <h1>Your Farms</h1>
          <div className="">
            {farms.map((farm) => (
              <div className="farm" key={farm}>
                <h2>Farm {farm}</h2>
                <button onClick={openModal2}>View Energy Produced</button>
                <button onClick={openModal3}>View Money Earned</button>
                <button onClick={openModal4}>View Panels</button>
              </div>
            ))}
          </div>
        </div>
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
      </Container>
    </div>
  );
}

export default Owner;
