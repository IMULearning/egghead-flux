import { dispatch, register } from '../dispatchers/app-dispatcher'
import AppConstants from '../constants/app-constants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

var _catalog = [];

for (let i = 1; i < 9; i++) {
	_catalog.push({
		'id': 'Widget' + i,
		'title': 'Widget #' + i,
		'summary': 'A great widget',
		'description': 'Lorem ipsum dolor sit amet.',
		'cost': i
	})
}

var cartItems = [];

function _removeItem(item) {
	cartItems.splice(cartItems.findIndex( i => i === item ), 1)
}

function _findCartItem(item) {
	return cartItems.find(cartItem => cartItem.id === item.id)
}

function _increaseItem(item) {
	item.qty++
}

function _decreaseItem(item) {
	item.qty--
	if (item.qty === 0) {
		_removeItem(item)
	}
}

function _addItem(item) {
	const cartItem = _findCartItem(item)
	if (!cartItem) {
		cartItems.push(Object.assign({qty: 1}, item))
	} else {
		_increaseItem(cartItem)
	}
}

function _cartTotals(initialQty = 0, initialTotal = 0) {
	const qty = cartItems.reduce(
		(prev, current) => prev + current.qty, 
		initialQty);
	const total = cartItems.reduce(
		(prev, current) => prev + current.qty * current.cost, 
		initialTotal);
	return {qty, total}
}

const AppStore = Object.assign(EventEmitter.prototype, {
	emitChange() {
		this.emit(CHANGE_EVENT)
	},

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback)
	},

	getCart() {
		return cartItems;
	},

	getCatalog() {
		return _catalog.map(item => {
			return Object.assign({}, item, cartItems.find( cItem => cItem.id === item.id ))
		})
	},

	getCartTotals() {
		return _cartTotals()
	},

	dispatcherIndex: register(function(action){
		switch(action.actionType) {
			case AppConstants.ADD_ITEM:
				_addItem(action.item);
				break;
			case AppConstants.REMOVE_ITEM:
				_removeItem(action.item);
				break;
			case AppConstants.INCREASE_ITEM:
				_increaseItem(action.item);
				break;
			case AppConstants.DECREASE_ITEM:
				_decreaseItem(action.item);
				break;
		}

		AppStore.emitChange();
	})
})

export default AppStore