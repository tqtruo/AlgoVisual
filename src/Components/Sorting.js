import React from "react";
import { mergeSort } from "./SortingAlgorithms/MergeSort";
import { bubbleSort } from "./SortingAlgorithms/BubbleSort";
import { insertionSort } from "./SortingAlgorithms/InsertionSort";

class Sorting extends React.Component {
	constructor() {
		super();
		this.state = {
			numArr: []
		};
	}

	componentDidMount() {
		this.fillArray();
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
		for (let i = 1; i <= 50; i++) {
			newArray.push(i);
		}

		const shuffledArr = this.shuffle(newArray);

		this.setState({
			numArr: shuffledArr
		});
	}

	merge() {
		this.setState({
			numArr: mergeSort(this.state.numArr)
		});
	}

	delay(timeDelay) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(1);
			}, timeDelay);
		});
	}

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
	}

	async bubble() {
		let compareArr = bubbleSort(this.state.numArr);
		let bars = document.getElementsByClassName("bars");
		let count = 0;
		let length = this.state.numArr.length - 1;

		console.log("compare array length: " + compareArr.length);

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
			}

			/* await this.delay(100);
			if (
				bars[bars.length - 1 - count].style.height ==
				`${this.state.numArr[length - count] * 5}px`
			) {
				bars[bars.length - 1 - count].style.backgroundColor = "green";
				count++;
			} */
		}
	}

	render() {
		//console.log("the state: " + this.state.numArr);
		return (
			<div className="sorting">
				{this.state.numArr.map((num, index) => (
					<div
						className="bars"
						key={index}
						style={{ height: `${num * 5}px`, color: "blue" }}
					></div>
				))}
				{/* <button onClick={() => this.mergeSort()}>MergeSort</button> */}
				<button onClick={() => this.bubble()}>BubbleSort</button>
				<button onClick={() => this.insertion()}>InsertionSort</button>
			</div>
		);
	}
}

export default Sorting;
