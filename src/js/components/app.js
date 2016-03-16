import React, { Component } from 'react';
import AppActions from '../actions/app-actions'
import Catalog from './catalog/app-catalog'
import Cart from './cart/app-cart'

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