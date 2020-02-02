import React from "react";
import { connect } from "react-redux";
import {
	BrowserRouter as Router,
	withRouter,
	Route,
	Switch
} from "react-router-dom";
import Home from "./Components/Home";
import Searching from "./Components/Searching";
import Sorting from "./Components/Sorting";
import Tree from "./Components/Tree";
import About from "./Components/About";

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/sorting" component={Sorting}></Route>
				<Route path="/searching" component={Searching}></Route>
				<Route path="/trees" component={Tree}></Route>
				<Route path="/about" component={About}></Route>
			</Switch>
		);
	}
}

export default Routes;
