import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Row, Col, Button } from "react-bootstrap";

import ColorPanel from "./color_panel";

class Header extends Component {
	render() {
		return (
			<Row className="header">
				<Col sm={6}>
					<span className="title">Color Flooder</span>
				</Col>
				<Col sm={6}>
					<span className="move-number">
						Moves: {this.props.moves}
					</span>
				</Col>
				<br />
				<br />
				<ColorPanel />
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return { moves: state.color.moves };
}

export default connect(mapStateToProps, actions)(Header);
