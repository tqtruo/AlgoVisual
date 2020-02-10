export const selectionSort = arr => {
	let compareArr = [];
	for (let i = 0; i < arr.length; i++) {
		let min = arr[i];
		let minIndex = i;
		for (let j = i + 1; j < arr.length; j++) {
			compareArr.push([i, minIndex, j]);
			if (arr[j] < min) {
				min = arr[j];
				minIndex = j;
				compareArr.push([i, minIndex, j]);
			} else {
				compareArr.push([i, minIndex, j]);
			}
		}
		arr[minIndex] = arr[i];
		arr[i] = min;
	}
	console.log(arr);
	return compareArr;
};
