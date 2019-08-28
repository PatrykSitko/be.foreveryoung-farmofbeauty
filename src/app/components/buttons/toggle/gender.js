import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import setGenderPicked from "../../../../redux/actions/button/gender";
import "./gender.css";

const mapStateToProps = ({ state: { user } }) => {
  return { user };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleGender: user =>
      dispatch(
        setGenderPicked(user, user.gender !== "female" ? "female" : "male")
      )
  };
};
export function GenderToggleButton({
  user,
  toggleGender,
  displayGenderButtons,
  setDisplayGenderButtons,
  ...props
}) {
  const { gender } = user;
  const [hidingGenderButtons, setHidingGenderButtons] = useState(false);
  useEffect(() => {
    if (gender !== null && displayGenderButtons && !hidingGenderButtons) {
      setHidingGenderButtons(true);
      setTimeout(() => {
        setDisplayGenderButtons(!displayGenderButtons);
        setHidingGenderButtons(false);
      }, 650);
    }
  }, [
    gender,
    hidingGenderButtons,
    setHidingGenderButtons,
    displayGenderButtons,
    setDisplayGenderButtons
  ]);
  return (
    <div
      {...props}
      className={`gender-button${
        user.gender === null
          ? " gender-button-initial"
          : user.gender !== "female"
          ? " gender-button-female"
          : " gender-button-male"
      }`}
      onClick={() => {
        if (user.gender === null && !hidingGenderButtons) {
          setDisplayGenderButtons(!displayGenderButtons);
        } else toggleGender(user);
      }}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenderToggleButton);
