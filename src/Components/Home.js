import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="home">
			<h1>Welcome to Algo Visual</h1>
			<div className="container">
				<Link to="/sorting">
					<button className="link-button">Sorting Algorithms</button>
				</Link>
				<Link to="/searching">
					<button className="link-button">Searching Algorithms</button>
				</Link>
				<Link to="/trees">
					<button className="link-button">Tree Algorithms</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
