// Images
import Cover from "../../images/ServiceCentersCover.png";

// Styles
import "../../styles/sCentersInfoImage.scss";

const infoImage = () => {
  return (
    <div className="imageContainer">
      <img src={Cover} alt="" />
    </div>
  );
};

export default infoImage;
