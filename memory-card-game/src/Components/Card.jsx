// src/Card.js
import PropTypes from 'prop-types';

function Card({ item, handleSelectedCards, toggled, stopflip }) {
  return (
    <div className="item">
      <div className={toggled ? "toggled" : ""}>
        <img className="face" src={item.img} alt="face" />
        <div
          className="back"
          onClick={() => !stopflip && handleSelectedCards(item)}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string.isRequired,
  }).isRequired,
  handleSelectedCards: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  stopflip: PropTypes.bool.isRequired,
};

export default Card;
