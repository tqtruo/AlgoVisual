import React from "react";
import { mergeSort } from "./SortingAlgorithms/MergeSort";
import { bubbleSort } from "./SortingAlgorithms/BubbleSort";

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

	async bubble() {
		let compareArr = bubbleSort(this.state.numArr);
		let bars = document.getElementsByClassName("bars");
		/* let count = 0;
		let length = this.state.numArr.length - 1; */

		for (let i = 0; i < compareArr.length; i++) {
			if (i % 2 !== 0) {
				/* setTimeout(() => { */

				await this.delay(500);
				bars[compareArr[i][0]].style.backgroundColor = "red";
				bars[compareArr[i][1]].style.backgroundColor = "red";

				setTimeout(() => {
					if (compareArr[i][1] > compareArr[i][0]) {
						let tempHeight1 = bars[compareArr[i][0]].style.height;
						let tempHeight2 = bars[compareArr[i][1]].style.height;

						bars[compareArr[i][0]].style.height = tempHeight2;
						bars[compareArr[i][1]].style.height = tempHeight1;
					}
				}, 500);

				await this.delay(1000);
				bars[compareArr[i][0]].style.backgroundColor = "Blue";
				bars[compareArr[i][1]].style.backgroundColor = "Blue";

				/* setTimeout(() => { */

				/* }, i * 50); */

				/* if (
						bars[length - count].style.height ==
						`${this.state.numArr.length - count}px`
					) {
						bars[length - count].style.backgroundColor = "green";
						count++;
					} */
				/* }, i * 100); */
			}
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
			</div>
		);
	}
}

export default Sorting;
