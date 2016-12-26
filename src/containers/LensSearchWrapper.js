import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export const LensSearchWrapper = (props) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search lens..."
        value={this.props.filtertext}
        ref={(input) => this.filtertextInput = input}
        onChange={this.handleChange}
      />
    </form>
  );
};

LensSearchWrapper.propsTypes={
  actions: PropTypes.object.isRequried
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LensSearchWrapper);
