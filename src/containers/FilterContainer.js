import React from 'react';
import Filter from '../components/Filter';
import {connect} from '../myRedux';
import {onSetFilterAction} from "../actions";

const mapStateToProps = state => ({
    activeFilter: state.filters
});

const mapDispatchToProps = dispatch => ({
    onSetFilter: filterValue => dispatch(onSetFilterAction({filterValue}))
});

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default FilterContainer;