import "./ViewPanels.css";
import PropTypes from "prop-types";

import axios from "axios";
import { useState, useEffect } from "react";

function ViewPanels({
  farmData,
  setPanelData,
  openStatusModal,
  openEnergyModal,
}) {
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3000/api/panels/${farmData.id}`)
    //   .then((res) => {
    //     setPanels(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [farmData]);

  return (
    <div>
      <h1>ViewPanels</h1>
      <button onClick={openStatusModal}>View Panel Status</button>
      <button onClick={openEnergyModal}>View Panel Energy Produced</button>
    </div>
  );
}

ViewPanels.propTypes = {
  farmData: PropTypes.object.isRequired,
  setPanelData: PropTypes.func.isRequired,
  openStatusModal: PropTypes.func.isRequired,
  openEnergyModal: PropTypes.func.isRequired,
};

export default ViewPanels;
