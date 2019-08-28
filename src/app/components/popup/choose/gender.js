import React from "react";
import { connect } from "react-redux";
import setGenderPicked from "../../../../redux/actions/button/gender";
import "./gender.css";

const mapStateToProps = ({ state: { user } }) => {
  return { user };
};
const mapDispatchToProps = dispatch => {
  return {
    setGender: (user, gender) => dispatch(setGenderPicked(user, gender))
  };
};
function PopupGenderChooser({ user, setGender }) {
  return <div className="gender-picker-popup"></div>;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupGenderChooser);
