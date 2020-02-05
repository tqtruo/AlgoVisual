export const mergeSort = arr => {
	if (arr.length < 2) {
		return arr;
	}
	let mid = Math.floor(arr.length / 2);
	let left = arr.slice(0, mid);
	let right = arr.slice(mid, arr.length);
	return mergeSortHelper(mergeSort(left), mergeSort(right));
	/*  Recursively split array into left and right portions until the resulting arrays 
        hold single values
    */
};

const mergeSortHelper = (arr1, arr2) => {
	let left = 0;
	let right = 0;
	let sortedArr = [];

	while (left < arr1.length && right < arr2.length) {
		if (arr1[left] <= arr2[right]) {
			sortedArr.push(arr1[left]);
			left++;
		} else {
			sortedArr.push(arr2[right]);
			right++;
		}
	}
	if (left === arr1.length) {
		for (let i = right; i < arr2.length; i++) {
			sortedArr.push(arr2[i]);
		}
	} else {
		for (let i = left; i < arr1.length; i++) {
			sortedArr.push(arr1[i]);
		}
	}
	return sortedArr;

	/* Compare the passed in arrays and sort them. Return the sorted array */
};
