import React, { Component } from 'react';
import AppActions from '../actions/app-actions'
import Catalog from './app-catalog'
import Cart from './app-cart'

class App extends Component {

	render() {
		return (
			<div className="container">
				<Catalog />
				<Cart />
			</div>
			)
	}
}

export default App