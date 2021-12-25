import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [showForm, setShowForm] = useState(false);
  const toggleShow = () => {
    setShowForm(!showForm);
  };
  useImperativeHandle(ref, () => ({
    toggleShow,
  }));
  return (
    <>
      {showForm ? (
        <>
          {props.children}
          <p>
            <button onClick={toggleShow}>cancel</button>
          </p>
        </>
      ) : (
        <button onClick={toggleShow}>{props.buttonLabel}</button>
      )}
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
