import React, { Component } from 'react';
import Catalog from './catalog/app-catalog'
import CatalogDetail from './product/app-catalogdetail'
import Cart from './cart/app-cart'
import Template from './app-template'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

export default () => {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={Template}>
				<IndexRoute component={Catalog} />
				<Route path="cart" component={Cart} />
				<Route path="item/:item" component={CatalogDetail} />
			</Route>
		</Router>
		);
}