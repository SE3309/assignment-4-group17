import "./PanelStatus.css";
import PropTypes from "prop-types";

function PanelStatus({ panelData }) {
  return (
    <div>
      <h1>PanelStatus</h1>
    </div>
  );
}

PanelStatus.propTypes = {
  panelData: PropTypes.object.isRequired,
};

export default PanelStatus;
