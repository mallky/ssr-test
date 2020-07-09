import './index.css';
import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux'
import { bindActionCreators } from "redux";
import { wrapper, initialCards, addItem } from "../store";
import Card from "./Card";

const Index = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(props.initialCards());
	}, []);
		return (<div className="App">
			<header className="App-header">
				<img src="/static/logo.png" className="static-logo" alt="logo"/>
			</header>
			<div className="Grid">
				{props.cards.map(card => <Card key={card.id}/>)}
			</div>
		</div>);
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
	store.dispatch(initialCards())
})

const mapDispatchToProps = (dispatch) => {
	return {
		initialCards: bindActionCreators(initialCards, dispatch),
		addItem: bindActionCreators(addItem, dispatch),
	}
}
const mapStateToProps = (state) => {
	return {
		cards: state.cards || [],
	}
}

export default wrapper.withRedux(connect(mapStateToProps, mapDispatchToProps)(Index));
