import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import setGender from "../../../../redux/actions/button/gender";
import "./gender.css";

const mapStateToProps = ({ state: { user } }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return { setGenderToFemale: user => dispatch(setGender(user, "female")) };
};

function FemaleGenderButton({ user, setGenderToFemale }) {
  const [extraClass, setExtraClass] = useState("");
  useEffect(() => {
    if (
      user.gender !== "null" &&
      user.gender === "male" &&
      extraClass !== " female-gender-button-blackout"
    ) {
      setExtraClass(" female-gender-button-blackout");
    }
  }, [user, extraClass]);
  useEffect(() => {
    setTimeout(() => setExtraClass(" female-gender-button-fill"), 1);
  }, []);
  return (
    <div
      className={`female-gender-button${extraClass}`}
      onClick={() => {
        setExtraClass("");
        setGenderToFemale(user);
      }}
    >
      Femme
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FemaleGenderButton);
