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
		console.log("random array: " + arr);

		return arr;
	}

	fillArray() {
		const newArray = [];
		for (let i = 1; i <= 100; i++) {
			newArray.push(i);
		}

		const shuffledArr = this.shuffle(newArray);

		this.setState({
			numArr: shuffledArr
		});
	}

	mergeSort() {
		this.setState({
			numArr: mergeSort(this.state.numArr)
		});
	}

	bubbleSort() {
		let compareArr = bubbleSort(this.state.numArr);
		let bars = document.getElementsByClassName("bars");
		console.log("the bars: " + bars[0].style.height);
		for (let i = 0; i < compareArr.length; i++) {
			setTimeout(() => {
				/* bars[compareArr[i][0]].style.backgroundColor = "red";
				bars[compareArr[i][1]].style.backgroundColor = "red"; */

				if (compareArr[i][1] > compareArr[i][0]) {
					let tempHeight1 = bars[compareArr[i][0]].style.height;
					let tempHeight2 = bars[compareArr[i][1]].style.height;
					bars[compareArr[i][0]].style.height = tempHeight2;
					bars[compareArr[i][1]].style.height = tempHeight1;
				}
			}, i * 5);
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
				<button onClick={() => this.bubbleSort()}>BubbleSort</button>
			</div>
		);
	}
}

export default Sorting;
