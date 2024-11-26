import "./EnergyProduced.css";
import PropTypes from "prop-types";

function EnergyProduced({ farmData }) {
  return (
    <div>
      <h1>EnergyProduced</h1>
    </div>
  );
}

EnergyProduced.propTypes = {
  farmData: PropTypes.object.isRequired,
};

export default EnergyProduced;
