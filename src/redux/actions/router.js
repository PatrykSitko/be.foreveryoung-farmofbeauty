export function changePath(pathname) {
  return {
    type: "ROUTER/LOCATION_CHANGE",
    payload: { pathname: pathname }
  };
}
