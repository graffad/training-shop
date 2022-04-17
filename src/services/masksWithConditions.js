import InputMask from "react-input-mask";

function MaskCardDate({ onChange, inpValue, onBlur }) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const yearLastChar = year[3];
  const yearFirstChar = year[2];

  const mask = "mM/yY";
  const formatChars = {
    // cant be less current
    y: `[${yearFirstChar}-9]`,
    Y: `[0-9]`,
    m: `[0-1]`,
    M: `[0-9]`,
  };

  const beforeMaskedValueChange = (newState) => {
    const { value } = newState;

    // Condition for the 2nd digit of month based on the first digit
    if (value[0] === "1") formatChars.M = "[0-2]";
    // To block 13, 15
    else formatChars.M = "[1-9]"; // To allow 05, 08 - but blocking 00.

    // Condition for year based on first digit of current year
    // for 30 31 32
    if (value[3] > yearFirstChar) {
      formatChars.Y = "[0-9]";
    } else {
      // block 20 21
      formatChars.Y = `[${yearLastChar}-9]`;
    }

    return { value, selection: newState.selection };
  };
  return (
    <InputMask
      name="cardDate"
      mask={mask}
      value={inpValue}
      onChange={onChange}
      onBlur={onBlur}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
      className="order-info-input"
      placeholder="MM/YY"
    />
  );
}

function MaskPhone({ onChange, inpValue, onBlur }) {
  const mask = "+375(cC)ddddddd";
  const formatChars = {
    d: "[0-9]",
    c: "(2|3|4)",
    C: "[0-9]",
  };

  const beforeMaskedValueChange = (newState) => {
    const { value } = newState;

    switch (value[5]) {
      case "2":
        formatChars.C = "(5|9)";
        break;
      case "3":
        formatChars.C = "(3)";
        break;
      case "4":
        formatChars.C = "(4)";
        break;
      default:
        break;
    }

    return { value, selection: newState.selection };
  };

  return (
    <InputMask
      name="phone"
      mask={mask}
      value={inpValue}
      onChange={onChange}
      onBlur={onBlur}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
      className="order-info-input"
      placeholder="+375()"
    />
  );
}
export { MaskCardDate, MaskPhone };
