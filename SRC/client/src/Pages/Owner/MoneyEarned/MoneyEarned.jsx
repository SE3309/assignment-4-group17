import "./MoneyEarned.css";
import PropTypes from "prop-types";

function MoneyEarned({ farmData }) {
  return (
    <div>
      <h1>MoneyEarned</h1>
    </div>
  );
}

MoneyEarned.propTypes = {
  farmData: PropTypes.object.isRequired,
};

export default MoneyEarned;
