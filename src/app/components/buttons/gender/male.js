import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import setGender from "../../../../redux/actions/button/gender";
import "./gender.css";

const mapStateToProps = ({ state: { user } }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return { setGenderToMale: user => dispatch(setGender(user, "male")) };
};

function MaleGenderButton({ user, setGenderToMale }) {
  const [extraClass, setExtraClass] = useState("");
  useEffect(() => {
    if (
      user.gender !== "null" &&
      user.gender === "female" &&
      extraClass !== " male-gender-button-blackout"
    ) {
      setExtraClass(" male-gender-button-blackout");
    }
  }, [user, extraClass]);
  useEffect(() => {
    setTimeout(() => setExtraClass(" male-gender-button-fill"), 1);
  }, []);
  return (
    <div
      className={`male-gender-button${extraClass}`}
      onClick={() => {
        setGenderToMale(user);
        setExtraClass("");
      }}
    >
      Homme
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaleGenderButton);
