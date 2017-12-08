import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Row, Col, Button, DropdownButton, MenuItem } from "react-bootstrap";

class Options extends Component {
	clearRecords() {
		localStorage.removeItem('record');
	}

	render() {
		return (
			<Row className="text-center">
			<Col sm={6}>
				<Button className="options-button" onClick={() => this.props.initColors()}>
					New Game
				</Button>
				<br />
				<Button className="options-button" onClick={() => this.clearRecords()}>
					Clear Records
				</Button>
			</Col>
			<Col sm={6}>
				<DropdownButton
					title="Colors"
					id="colors"
					className="options-button"
				>
					<ul className="options-list">
						<li
							onClick={() => this.props.changeColors(3)}
							className="options"
						>
							3 colors
						</li>
						<li
							onClick={() => this.props.changeColors(4)}
							className="options"
						>
							4 colors
						</li>
						<li
							onClick={() => this.props.changeColors(5)}
							className="options"
						>
							5 colors
						</li>
						<li
							onClick={() => this.props.changeColors(6)}
							className="options"
						>
							6 colors
						</li>
						<li
							onClick={() => this.props.changeColors(7)}
							className="options"
						>
							7 colors
						</li>
						<li
							onClick={() => this.props.changeColors(8)}
							className="options"
						>
							8 colors
						</li>
					</ul>
				</DropdownButton>
				</Col>
			</Row>
		);
	}
}

export default connect(null, actions)(Options);

{
	/*<DropdownButton title="Size" id="size" className="options-button text-center">
	<ul className="options-list">
		<li onClick={() => this.props.changeSize(10)} className="options">10x10</li>
		<li onClick={() => this.props.changeSize(11)} className="options">11x11</li>
		<li onClick={() => this.props.changeSize(12)} className="options">12x12</li>
		<li onClick={() => this.props.changeSize(13)} className="options">13x13</li>
	</ul>
</DropdownButton><br />*/
}
