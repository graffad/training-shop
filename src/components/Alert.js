import { useDispatch } from "react-redux";
import { reduxHideAlert } from "../redux/reducers/productsSlice";

export default function Alert({ errorMessage, isProfile=false }) {
  const dispatch = useDispatch();
  return (
    <div className="alert" data-test-id="error" >
      <div className="container">
        <div className="alert-text">
          <span>{errorMessage}</span>
          <button
            type="button"
            className="alert-close-btn"
            onClick={() => {
              dispatch(reduxHideAlert(isProfile));
            }}
          >
            &#10006;
          </button>
        </div>
      </div>
    </div>
  );
}
