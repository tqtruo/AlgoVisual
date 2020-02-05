export const insertionSort = arr => {
	let compareArr = [];
	for (let i = 1; i < arr.length; i++) {
		for (let j = i; j > 0; j--) {
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
	return compareArr;
};
