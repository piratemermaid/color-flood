import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import { Col, Row, Table } from "react-bootstrap";
import Header from "./header";
import Square from "./square";
import Options from "./options";

class App extends Component {
	renderSquares() {
		let squareArr = [];
		for (let i = 0; i < this.props.colors.length; i++) {
			let squareClass = `square ${this.props.colors[i]}`;
			squareArr.push(<div className={squareClass} key={i} id={i} />);
		}

		return squareArr;
	}

	renderWinMessage() {
		const winClass = `text-center ${this.props.winColor}-text`;
		let recordText = "";

		if (this.props.setRecord === true) {
			recordText = "New record!";
		} else {
			if (localStorage.getItem("record")) {
				const records = JSON.parse(localStorage.getItem("record"));
				const curRecord = records[this.props.numColors];
				recordText = `Your record for ${
					this.props.numColors
				} colors is ${curRecord}`;
			}
		}

		if (this.props.won === true) {
			return (
				<div className={winClass}>
					<p className="win-text">YOU WON!</p>
					<p className="win-moves">Moves: {this.props.moves}</p>
					<p>{recordText}</p>
				</div>
			);
		}
	}

	componentWillMount() {
		this.props.initColors();
	}

	render() {
		return (
			<Col sm={4} smOffset={4}>
				<div className="panel panel-default">
					<div className="panel-heading">
						<Header />
					</div>
					<div className="panel-body">
						<div className="square-container">
							{this.renderSquares()}
						</div>
					</div>
					<div className="panel-footer">
						{this.renderWinMessage()}
						<Options />
					</div>
				</div>
			</Col>
		);
	}
}

function mapStateToProps(state) {
	return {
		colors: state.color.colors,
		numColors: state.color.numColors,
		size: state.color.size,
		currentColor: state.color.currentColor,
		won: state.color.won,
		winColor: state.color.winColor,
		moves: state.color.moves,
		record: state.color.record,
		setRecord: state.color.setRecord
	};
}

export default connect(mapStateToProps, actions)(App);
