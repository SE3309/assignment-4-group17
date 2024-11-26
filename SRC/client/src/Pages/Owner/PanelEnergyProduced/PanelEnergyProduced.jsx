import "./PanelEnergyProduced.css";
import PropTypes from "prop-types";

function PanelEnergyProduced({ panelData }) {
  return (
    <div>
      <h1>PanelEnergyProduced</h1>
    </div>
  );
}

PanelEnergyProduced.propTypes = {
  panelData: PropTypes.object.isRequired,
};

export default PanelEnergyProduced;
