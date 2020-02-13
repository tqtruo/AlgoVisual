import React from "react";
import { mergeSort } from "./SortingAlgorithms/MergeSort";
import { bubbleSort } from "./SortingAlgorithms/BubbleSort";
import { insertionSort } from "./SortingAlgorithms/InsertionSort";
import { selectionSort } from "./SortingAlgorithms/SelectionSort";

class Sorting extends React.Component {
	constructor() {
		super();
		this.state = {
			numArr: [],
			sortStyle: ""
		};
		this.changeHandler = this.changeHandler.bind(this);
	}

	async componentDidMount() {
		await this.fillArray();
		document.getElementById("sort-button").disabled = true;
		Array.from(
			document.getElementsByClassName("sorting")
		)[0].style.minWidth = `${this.state.numArr.length * 8}px`;
		Array.from(
			document.getElementsByClassName("sorting")
		)[0].style.maxWidth = `${this.state.numArr.length * 8}px`;
	}

	changeHandler(event) {
		event.preventDefault();
		document.getElementById("sort-button").disabled = false;
		console.log("change: " + event.target.value);
		this.setState({
			sortStyle: event.target.value
		});
	}

	/* The shuffle function uses the Fisher-Yates shuffle method
		https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
	*/
	shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			let randomIndex = Math.floor(Math.random() * (i + 1));

			let temp = arr[i];
			arr[i] = arr[randomIndex];
			arr[randomIndex] = temp;
		}
		return arr;
	}

	fillArray() {
		const newArray = [];
		for (let i = 1; i <= 125; i++) {
			newArray.push(i);
		}

		const shuffledArr = this.shuffle(newArray);

		this.setState({
			numArr: shuffledArr
		});

		Array.from(document.getElementsByClassName("bars")).forEach(bar => {
			bar.style.backgroundColor = "blue";
		});

		if (this.state.sortStyle !== "") {
			this.enableButtons();
		}
	}

	enableButtons() {
		document.getElementById("sort-button").disabled = false;
		document.getElementById("sort").disabled = false;
		document.getElementById("new-array-button").disabled = false;
	}

	disableButtons() {
		document.getElementById("sort-button").disabled = true;
		document.getElementById("sort").disabled = true;
		document.getElementById("new-array-button").disabled = true;
	}

	delay(timeDelay) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(1);
			}, timeDelay);
		});
	}

	sort() {
		this.disableButtons();
		switch (this.state.sortStyle) {
			case "bubble":
				this.bubble();
				break;
			case "selection":
				this.selection();
				break;
			case "insertion":
				this.insertion();
				break;
			case "merge":
				this.merge();
				break;
			default:
				break;
		}
	}

	async merge() {
		let compareArr = mergeSort(this.state.numArr);
		let bars = document.getElementsByClassName("bars");

		for (let i = 0; i < compareArr.length; i++) {
			let leftBar = bars[compareArr[i][0]];
			let rightBar = bars[compareArr[i][1]];
			if (i % 3 === 1) {
				await this.delay(15);
				leftBar.style.backgroundColor = "blue";
				rightBar.style.backgroundColor = "blue";
			} else if (i % 3 === 2) {
				await this.delay(15);
				let mainBar = bars[compareArr[i][0]];
				let barHeight = compareArr[i][1];
				mainBar.style.height = `${barHeight * 5}px`;
			} else {
				await this.delay(15);
				leftBar.style.backgroundColor = "red";
				rightBar.style.backgroundColor = "red";
			}
		}
		Array.from(bars).forEach(bar => {
			bar.style.backgroundColor = "green";
		});
		document.getElementById("new-array-button").disabled = false;
	}

	/* INSERTION SORT */
	async insertion() {
		let compareArr = insertionSort(this.state.numArr);
		let bars = document.getElementsByClassName("bars");

		for (let i = 0; i < compareArr.length; i++) {
			let leftBarStyle = bars[compareArr[i][0]].style;
			let rightBarStyle = bars[compareArr[i][1]].style;

			if (i % 2 !== 0) {
				await this.delay(100);
				leftBarStyle.backgroundColor = "red";
				rightBarStyle.backgroundColor = "red";

				setTimeout(() => {
					if (compareArr[i][1] > compareArr[i][0]) {
						let tempHeight1 = leftBarStyle.height;
						let tempHeight2 = rightBarStyle.height;

						leftBarStyle.height = tempHeight2;
						rightBarStyle.height = tempHeight1;
					}
				}, 150);

				await this.delay(350);
				leftBarStyle.backgroundColor = "Blue";
				rightBarStyle.backgroundColor = "Blue";
			}
		}

		Array.from(bars).forEach(bar => {
			bar.style.backgroundColor = "green";
		});
		document.getElementById("new-array-button").disabled = false;
	}
	/* BUBBLE SORT */
	async bubble() {
		let compareArr = bubbleSort(this.state.numArr);
		let bars = document.getElementsByClassName("bars");
		let count = 0;

		for (let i = 0; i < compareArr.length; i++) {
			let leftBarStyle = bars[compareArr[i][0]].style;
			let rightBarStyle = bars[compareArr[i][1]].style;

			await this.delay(100);
			if (i % 2 !== 0) {
				await this.delay(100);
				leftBarStyle.backgroundColor = "red";
				rightBarStyle.backgroundColor = "red";

				setTimeout(() => {
					if (compareArr[i][1] > compareArr[i][0]) {
						let tempHeight1 = leftBarStyle.height;
						let tempHeight2 = rightBarStyle.height;

						leftBarStyle.height = tempHeight2;
						rightBarStyle.height = tempHeight1;
					}
				}, 150);

				await this.delay(350);
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
	}
	/* SELECTION SORT */
	async selection() {
		let compareArr = selectionSort(this.state.numArr);
		let bars = Array.from(document.getElementsByClassName("bars"));
		let called = false;
		let swapped = false;
		let previousMinBar;

		for (let i = 0; i < compareArr.length; i++) {
			let placeHolderStyle = bars[compareArr[i][0]].style;
			let minBarStyle = bars[compareArr[i][1]].style;
			let checkBarStyle = bars[compareArr[i][2]].style;

			await this.delay(50);
			if (i % 2 !== 0) {
				await this.delay(50);
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
				}, 75);

				await this.delay(75);
				if (!swapped) {
					checkBarStyle.backgroundColor = "blue";
				}
			}

			await this.delay(50);
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

		await this.delay(150);
		bars[bars.length - 1].style.backgroundColor = "green";
		document.getElementById("new-array-button").disabled = false;
	}

	render() {
		return (
			<div className="sorting">
				<div className="sorting-choice">
					<select id="sort" onChange={this.changeHandler}>
						<option value="none" disabled selected>
							Select a Sorting Type!
						</option>
						<option value="bubble">Bubble Sort</option>
						<option value="selection">Selection Sort</option>
						<option value="insertion">Insertion Sort</option>
						<option value="merge">Merge Sort</option>
					</select>
					<button id="sort-button" onClick={() => this.sort()}>
						Sort
					</button>
					<button id="new-array-button" onClick={() => this.fillArray()}>
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
							max="5"
						></input>
					</div>
				</div>

				{this.state.numArr.map((num, index) => (
					<div
						className="bars"
						key={index}
						style={{ height: `${num * 5}px`, color: "blue" }}
					></div>
				))}
			</div>
		);
	}
}

export default Sorting;
