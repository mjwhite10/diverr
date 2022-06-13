import { useEffect } from 'react';

const MyDiverrsPage = ({ hideItems }) => {
  useEffect(() => {
    hideItems(true);
  });
  return (
    <div className="mydiverrs-container">
      <div className="mydiverrs-container-slider">
        <img src="https://via.placeholder.com/210?text=1" alt="" />
        <img src="https://via.placeholder.com/220?text=2" alt="" />
        <img src="https://via.placeholder.com/230?text=3" alt="" />
        <img src="https://via.placeholder.com/240?text=4" alt="" />
        <img src="https://via.placeholder.com/250?text=5" alt="" />
        <img src="https://via.placeholder.com/260?text=6" alt="" />
        <img src="https://via.placeholder.com/270?text=7" alt="" />
        <img src="https://via.placeholder.com/280?text=8" alt="" />
        <img src="https://via.placeholder.com/290?text=9" alt="" />
      </div>
    </div>
  );
};
export default MyDiverrsPage;
