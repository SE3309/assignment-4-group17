import "./Container.css";
import PropTypes from "prop-types";

function Container({ children }) {
  return (
    <div className="container">
      <div className="container-left"></div>
      <div className="container-center">{children}</div>
      <div className="container-right"></div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is passed and is a valid React node
};

export default Container;
