// import { components } from "react-select";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { reduxGetOrderStores,reduxSetOrderStores } from "../../redux/reducers/orderSlice";
import { ReactComponent as Arrow } from "../../images/arr-left.svg";

function CustomSelectCountries({
  array = [],
  currentValue = "",
  setValue,
  onBlur,
  trigger,
  isLoading = false,
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const inp = useRef(null);
    const dispatch = useDispatch()
  return (
    <div className="order-info-select-wrapper">
      <input
        ref={inp}
        readOnly
        type="text"
        className="order-info-input"
        placeholder="Country"
        onFocus={() => {
          setMenuIsOpen(true);
          inp.current.scrollIntoView();
        }}
        onBlur={() => {
          setMenuIsOpen(false);
          trigger("country");
        }}
        value={currentValue}
        name="country"
      />
      <Arrow
        className={classNames("select-arrow", {
          "select-arrow--active": menuIsOpen,
        })}
      />
      {isLoading && (
        <div className="select-loader">
          <div className="loader-small" />
        </div>
      )}

      {menuIsOpen && (
        <div className="options-menu">
          {array.map((item) => (
            <button
              key={item.value}
              className={classNames("options-menu__item", {
                "options-menu__item--active": currentValue === item.value,
              })}
              type="button"
              onMouseDown={() => {
                setValue("country", item.value);
                // clear stores
                setValue("storeAddress", "");
                dispatch(reduxSetOrderStores([]))
              }}
            >
              {item.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomSelectCities({
  array = [],
  currentValue = "",
  setValue,
  onBlur,
  country = "",
  setError,
  trigger,
  disabled = true,
  isLoading = false,
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const inp = useRef(null);

  const filteredArray = array.filter((item) => {
    if (currentValue !== "") {
      return item.value.toLowerCase().startsWith(currentValue.toLowerCase());
    }
    return item;
  });
  return (
    <div className="order-info-select-wrapper">
      <input
        disabled={disabled}
        autoComplete="off"
        ref={inp}
        type="text"
        className="order-info-input"
        placeholder="Store address"
        onFocus={() => {
          setMenuIsOpen(true);
          inp.current.scrollIntoView();
        }}
        onBlur={(e) => {
          const res = array.find((c) => c.value === inp.current.value);
          if (inp.current.value !== res?.value) {
            inp.current.value = null;
            setValue("storeAddress", "");
          }
          trigger("storeAddress");
          setMenuIsOpen(false);
        }}
        value={currentValue}
        name="storeAddress"
        onChange={(e) => {
          if (e.target.value.length === 3) {
            dispatch(reduxGetOrderStores({ city: e.target.value, country }));
          }
          setValue("storeAddress", e.target.value);
        }}
      />

      <Arrow
        className={classNames("select-arrow", {
          "select-arrow--active": menuIsOpen,
        })}
      />

      {isLoading && (
        <div className="select-loader">
          <div className="loader-small" />
        </div>
      )}

      {menuIsOpen && (
        <div className="options-menu">
          {filteredArray.length > 0 ? (
            filteredArray.map((item) => (
              <button
                className="options-menu__item"
                key={item.value}
                type="button"
                onMouseDown={() => {
                  setValue("storeAddress", item.value);
                }}
              >
                {item.value}
              </button>
            ))
          ) : (
            <div className="options-menu__item">Stores not found</div>
          )}
        </div>
      )}
    </div>
  );
}

export { CustomSelectCountries, CustomSelectCities };
