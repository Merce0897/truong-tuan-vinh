export const addCommas = num => {
    const [integerPart, decimalPart] = num.split(".");
    const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/^0+/, "");
    return decimalPart || num[num.length - 1] === '.' ? `${withCommas || 0}.${decimalPart}` : withCommas;
};

export const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");