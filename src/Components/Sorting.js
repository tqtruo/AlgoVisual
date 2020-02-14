import React, { useEffect } from "react";
import { mergeSort } from "./SortingAlgorithms/MergeSort";
import { bubbleSort } from "./SortingAlgorithms/BubbleSort";
import { insertionSort } from "./SortingAlgorithms/InsertionSort";
import { selectionSort } from "./SortingAlgorithms/SelectionSort";
import { connect } from "react-redux";
import {
	setSpeed,
	setCustomArray,
	setDefaultArray,
	setSortStyle,
	resetAll
} from "../sortReducers";

export const Sorting = props => {
	const {
		speed,
		inputArray,
		numArr,
		sortStyle,
		setSpeed,
		setCustomArray,
		setDefaultArray,
		setSortStyle,
		resetAll
	} = props;

	/* 	let stateArr = [sortStyle]; */

	/* useEffect(() => {
		document.getElementById("sort-button").disabled = true;
		Array.from(
			document.getElementsByClassName("sorting")
		)[0].style.minWidth = `${numArr.length * 8}px`;
		Array.from(
			document.getElementsByClassName("sorting")
		)[0].style.maxWidth = `${numArr.length * 8}px`;
	}, stateArr); */

	const changeHandler = event => {
		event.preventDefault();
		document.getElementById("sort-button").disabled = false;
		setSortStyle(event.target.value);
	};

	const speedHandler = event => {
		event.preventDefault();
		setSpeed(event.target.value);
	};

	/* The shuffle function uses the Fisher-Yates shuffle method
		https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
	*/
	const shuffle = arr => {
		for (let i = arr.length - 1; i > 0; i--) {
			let randomIndex = Math.floor(Math.random() * (i + 1));

			let temp = arr[i];
			arr[i] = arr[randomIndex];
			arr[randomIndex] = temp;
		}
		return arr;
	};

	const fillArray = () => {
		const newArray = [];
		for (let i = 1; i <= 125; i++) {
			newArray.push(i);
		}

		const shuffledArr = shuffle(newArray);

		setDefaultArray(shuffledArr);

		Array.from(document.getElementsByClassName("bars")).forEach(bar => {
			bar.style.backgroundColor = "blue";
		});

		if (sortStyle !== "") {
			enableButtons();
		}

		/* Array.from(
			document.getElementsByClassName("sorting")
		)[0].style.minWidth = `${numArr.length * 8}px`;
		Array.from(
			document.getElementsByClassName("sorting")
		)[0].style.maxWidth = `${numArr.length * 8}px`; */
	};

	const enableButtons = () => {
		document.getElementById("sort-button").disabled = false;
		document.getElementById("sort").disabled = false;
		document.getElementById("new-array-button").disabled = false;
		document.getElementsByClassName("sort-slider")[0].disabled = false;
	};

	const disableButtons = () => {
		document.getElementById("sort-button").disabled = true;
		document.getElementById("sort").disabled = true;
		document.getElementById("new-array-button").disabled = true;
		document.getElementsByClassName("sort-slider")[0].disabled = true;
	};

	const delay = timeDelay => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(1);
			}, timeDelay);
		});
	};

	const sort = () => {
		disableButtons();
		switch (sortStyle) {
			case "bubble":
				bubble();
				break;
			case "selection":
				selection();
				break;
			case "insertion":
				insertion();
				break;
			case "merge":
				merge();
				break;
			default:
				enableButtons();
				break;
		}
	};

	const merge = async () => {
		let compareArr = mergeSort(numArr);
		let bars = document.getElementsByClassName("bars");

		for (let i = 0; i < compareArr.length; i++) {
			let leftBar = bars[compareArr[i][0]];
			let rightBar = bars[compareArr[i][1]];
			if (i % 3 === 1) {
				await delay(150 / speed);
				leftBar.style.backgroundColor = "blue";
				rightBar.style.backgroundColor = "blue";
			} else if (i % 3 === 2) {
				await delay(150 / speed);
				let mainBar = bars[compareArr[i][0]];
				let barHeight = compareArr[i][1];
				mainBar.style.height = `${barHeight * 5}px`;
			} else {
				await delay(150 / speed);
				leftBar.style.backgroundColor = "red";
				rightBar.style.backgroundColor = "red";
			}
		}

		Array.from(bars).forEach(bar => {
			bar.style.backgroundColor = "green";
		});
		document.getElementById("new-array-button").disabled = false;
	};

	/* INSERTION SORT */
	const insertion = async () => {
		let compareArr = insertionSort(numArr);
		let bars = document.getElementsByClassName("bars");

		for (let i = 0; i < compareArr.length; i++) {
			let leftBarStyle = bars[compareArr[i][0]].style;
			let rightBarStyle = bars[compareArr[i][1]].style;

			if (i % 2 !== 0) {
				await delay(150 / speed);
				leftBarStyle.backgroundColor = "red";
				rightBarStyle.backgroundColor = "red";

				setTimeout(() => {
					if (compareArr[i][1] > compareArr[i][0]) {
						let tempHeight1 = leftBarStyle.height;
						let tempHeight2 = rightBarStyle.height;

						leftBarStyle.height = tempHeight2;
						rightBarStyle.height = tempHeight1;
					}
				}, 200 / speed);

				await delay(350 / speed);
				leftBarStyle.backgroundColor = "Blue";
				rightBarStyle.backgroundColor = "Blue";
			}
		}

		Array.from(bars).forEach(bar => {
			bar.style.backgroundColor = "green";
		});
		document.getElementById("new-array-button").disabled = false;
	};
	/* BUBBLE SORT */
	const bubble = async () => {
		let compareArr = bubbleSort(numArr);
		let bars = document.getElementsByClassName("bars");
		let count = 0;

		for (let i = 0; i < compareArr.length; i++) {
			let leftBarStyle = bars[compareArr[i][0]].style;
			let rightBarStyle = bars[compareArr[i][1]].style;

			await delay(100 / speed);
			if (i % 2 !== 0) {
				await delay(100);
				leftBarStyle.backgroundColor = "red";
				rightBarStyle.backgroundColor = "red";

				setTimeout(() => {
					if (compareArr[i][1] > compareArr[i][0]) {
						let tempHeight1 = leftBarStyle.height;
						let tempHeight2 = rightBarStyle.height;

						leftBarStyle.height = tempHeight2;
						rightBarStyle.height = tempHeight1;
					}
				}, 150 / speed);

				await delay(350 / speed);
				leftBarStyle.backgroundColor = "Blue";
				rightBarStyle.backgroundColor = "Blue";

				if (compareArr[i + 1] && compareArr[i + 1][1] === 0) {
					bars[bars.length - 1 - count].style.backgroundColor = "green";
					count++;
				}
			}
		}
		//Loop will end without making the last two bars green, so these lines will do that
		bars[bars.length - 1 - count].style.backgroundColor = "green";
		bars[bars.length - 2 - count].style.backgroundColor = "green";
		document.getElementById("new-array-button").disabled = false;
	};
	/* SELECTION SORT */
	const selection = async () => {
		let compareArr = selectionSort(numArr);
		let bars = Array.from(document.getElementsByClassName("bars"));
		let called = false;
		let swapped = false;
		let previousMinBar;

		for (let i = 0; i < compareArr.length; i++) {
			let placeHolderStyle = bars[compareArr[i][0]].style;
			let minBarStyle = bars[compareArr[i][1]].style;
			let checkBarStyle = bars[compareArr[i][2]].style;

			await delay(75 / speed);
			if (i % 2 !== 0) {
				await delay(100 / speed);
				placeHolderStyle.backgroundColor = "orange";
				checkBarStyle.backgroundColor = "red";

				setTimeout(() => {
					if (
						//Sets the min bar to yellow if it's not the placeholder bar
						parseInt(minBarStyle.height) < parseInt(placeHolderStyle.height) &&
						!called
					) {
						previousMinBar = bars[compareArr[i][1]];
						minBarStyle.backgroundColor = "yellow";
						called = true;
						swapped = true;
					} else if (
						//swaps the color if another bar is smaller than the current minimum
						previousMinBar &&
						parseInt(checkBarStyle.height) <
							parseInt(previousMinBar.style.height) &&
						called
					) {
						//swaps the color if another bar is smaller than the current minimum
						checkBarStyle.backgroundColor = "yellow";
						previousMinBar.style.backgroundColor = "blue";
						previousMinBar = bars[compareArr[i][2]];
						swapped = true;
					} else if (
						//Swaps color of checker with min if the checker is less than the current min
						parseInt(checkBarStyle.height) < parseInt(minBarStyle.height) &&
						called
					) {
						checkBarStyle.backgroundColor = "yellow";
						swapped = true;
						if (compareArr[i][0] !== compareArr[i][1]) {
							minBarStyle.style.backgroundColor = "blue";
						}
					} else {
						swapped = false;
					}
				}, 75 / speed);

				await delay(100);
				if (!swapped) {
					checkBarStyle.backgroundColor = "blue";
				}
			}

			await delay(75 / speed);
			if (i % 2 === 1 && compareArr[i][2] === bars.length - 1) {
				called = false;
				let minBarHeight = minBarStyle.height;
				let placeHolderHeight = placeHolderStyle.height;

				minBarStyle.height = placeHolderHeight;

				placeHolderStyle.height = minBarHeight;

				minBarStyle.backgroundColor = "blue";
				placeHolderStyle.backgroundColor = "green";
				continue;
			}
		}

		await delay(150 / speed);
		bars[bars.length - 1].style.backgroundColor = "green";
		document.getElementById("new-array-button").disabled = false;
	};

	return (
		<div className="sorting">
			<div className="sorting-choice">
				<select id="sort" onChange={changeHandler}>
					<option value="none" disabled selected>
						Select a Sorting Type!
					</option>
					<option value="bubble">Bubble Sort</option>
					<option value="selection">Selection Sort</option>
					<option value="insertion">Insertion Sort</option>
					<option value="merge">Merge Sort</option>
				</select>
				<button id="sort-button" onClick={() => sort()}>
					Sort
				</button>
				<button id="new-array-button" onClick={() => fillArray()}>
					Generate New Array
				</button>
				<div className="sort-speed">
					<label htmlFor="speed">Animation Speed</label> <br />
					<input
						type="range"
						name="speed"
						className="sort-slider"
						defaultValue="1"
						min="1"
						max="10"
						onChange={speedHandler}
					></input>
				</div>
				<button id="reset-array" onClick={() => resetAll()}>
					Reset
				</button>
			</div>

			{numArr.map((num, index) => (
				<div
					className="bars"
					key={index}
					style={{ height: `${num * 5}px`, color: "blue" }}
				></div>
			))}
		</div>
	);
};

const mapState = state => {
	return {
		speed: state.animSpeed,
		inputArray: state.arrayBars,
		numArr: state.numArr,
		sortStyle: state.sortStyle
	};
};

const mapDispatch = dispatch => {
	return {
		setSpeed: animSpeed => dispatch(setSpeed(animSpeed)),
		setCustomArray: inputValues => dispatch(setCustomArray(inputValues)),
		setDefaultArray: defaultArr => dispatch(setDefaultArray(defaultArr)),
		setSortStyle: sortStyle => dispatch(setSortStyle(sortStyle)),
		resetAll: () => dispatch(resetAll())
	};
};

export default connect(mapState, mapDispatch)(Sorting);
