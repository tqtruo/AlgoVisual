import React from "react";
import { mergeSort } from "./SortingAlgorithms";

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
		for (let i = 1; i <= 100; i++) {
			newArray.push(i);
		}

		const shuffledArr = this.shuffle(newArray);

		this.setState({
			numArr: shuffledArr
		});
	}

	sort(arr, type) {
		if (type == "merge") {
			this.setState({
				numArr: mergeSort(arr)
			});
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
				<button onClick={() => this.sort(this.state.numArr, "merge")}>
					Sort
				</button>
			</div>
		);
	}
}

export default Sorting;
