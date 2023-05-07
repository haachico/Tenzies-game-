const Die = ({ number, isHeld, id, handleHold }) => {
  return (
    <div
      className="die"
      style={{ backgroundColor: isHeld === true ? "lightgreen" : "white" }}
      onClick={handleHold}
    >
      <p>{number}</p>
    </div>
  );
};
export default Die;
