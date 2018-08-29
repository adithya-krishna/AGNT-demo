// there are at least 5 ways to convert string to number.
// the methods below are chosen becuase of performance and most edge cases handled.
// ref: https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
// parseFloat is chosen because it, along with isNaN and isFinite
// handle the most edge cases when tested with typical
// javascript datatypes and values.
export const toNumber = value => {
	const number = parseFloat(value);
	if (!isNaN(number) && isFinite(value)) {
		return number;
	} else {
		return 0;
	}
};

export const isNumeric = value => {
	return !isNaN(parseFloat(value)) && isFinite(value);
};
