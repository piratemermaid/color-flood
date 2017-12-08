import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const colorOptions = ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'aqua', 'pink'];

class ColorPanel extends Component {
	renderColorPicker() {
		let currentColors = colorOptions.slice(0, this.props.numColors);

		return currentColors.map((color) => {
				let colorClass = `picker ${color}`;
				return(
					<div
						className={colorClass}
						onClick={() => this.props.pickColor(color)}
						key={color}
					/>
				);
		});
	}

	render() {
		return (
			<div className="pickers">
				{this.renderColorPicker()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { numColors: state.color.numColors };
}

export default connect(mapStateToProps, actions)(ColorPanel);
