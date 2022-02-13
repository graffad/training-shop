import { ReactComponent as FilterSvg } from "./icons/filter.svg";
import { ReactComponent as DspLine } from "./icons/dsp-line.svg";
import { ReactComponent as DspSquare } from "./icons/dsp-square.svg";

export default function ProductsFilters(props) {
  return (
    <div className="products-controls-wrapper">
      <button type="button" className="products-controls-button filters-control">
        <span>
          <FilterSvg />
        </span>
        FILTER
      </button>

      <label className="products-controls-button display-switcher">
          <input
              className="products-controls-input"
              type="radio"
              name="display"
              id="dsp-line"
          />
        <DspLine />
      </label>

      <label className="products-controls-button display-switcher">
          <input
              className="products-controls-input"
              type="radio"
              name="display"
              id="dsp-square"
              defaultChecked
          />
        <DspSquare />
      </label>
    </div>
  );
}
