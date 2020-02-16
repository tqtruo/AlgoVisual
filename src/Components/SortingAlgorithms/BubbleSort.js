export const bubbleSort = arr => {
	let compareArr = [];
	for (let i = arr.length; i > 0; i--) {
		for (let j = 1; j < i; j++) {
			compareArr.push([j, j - 1]);
			if (arr[j] < arr[j - 1]) {
				let temp = arr[j];
				arr[j] = arr[j - 1];
				arr[j - 1] = temp;
				compareArr.push([j - 1, j]);
			} else {
				compareArr.push([j, j - 1]);
			}
		}
	}

	/* 	console.log("after sort: " + testArr); */
	return compareArr;
};
