/* 

THIS IMPLEMENTATION OF MERGESORT DOESN'T WORK FOR THE VISUALIZING ASPECT

export const mergeSort = arr => {
	if (arr.length < 2) {
		return arr;
	}
	let mid = Math.floor(arr.length / 2);
	let left = arr.slice(0, mid);
	let right = arr.slice(mid, arr.length);
	return mergeSortHelper(mergeSort(left), mergeSort(right));
	// Recursively split array into left and right portions until the resulting arrays holds single values
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

	// Compare the passed in arrays and sort them. Return the sorted array
};
 */

export const mergeSort = arr => {
	let compareArr = [];
	if (arr.length <= 1) {
		return arr;
	}

	let arrayCopy = arr.slice();
	mergeSortHelper(arr, 0, arr.length - 1, arrayCopy);
	return arr;
};

const mergeSortHelper = (mainArray, start, end, copyArray) => {
	if (start == end) {
		return;
	}
	let mid = Math.floor((start + end) / 2);

	/* Calling in mergeSortHelper twice passing in start, mid and mid +1, end is effectively splitting the array */
	mergeSortHelper(copyArray, start, mid, mainArray);
	mergeSortHelper(copyArray, mid + 1, end, mainArray);
	merging(mainArray, start, mid, end, copyArray);
};

const merging = (mainArray, start, mid, end, copyArray) => {
	//Left and right are for keeping track of the subarrays being sorted
	let left = start;
	let right = mid + 1;

	//mainArrayIndex for keeping track of index of main array for replacing values
	let mainArrayIndex = start;

	while (left <= mid && right <= end) {
		if (copyArray[left] <= copyArray[right]) {
			mainArray[mainArrayIndex] = copyArray[left];
			left++;
		} else {
			mainArray[mainArrayIndex] = copyArray[right];
			right++;
		}
		mainArrayIndex++;
	}
	while (left <= mid) {
		mainArray[mainArrayIndex] = copyArray[left];
		mainArrayIndex++;
		left++;
	}
	while (right <= end) {
		mainArray[mainArrayIndex] = copyArray[right];
		mainArrayIndex++;
		right++;
	}
};
