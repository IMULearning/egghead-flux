const CartAPI = {
	catalog: [],
	
	cartItems: [],
	
	init() {
		for (let i = 1; i < 9; i++) {
			this.catalog.push({
				'id': 'Widget' + i,
				'title': 'Widget #' + i,
				'summary': 'A great widget',
				'description': 'Lorem ipsum dolor sit amet.',
				'cost': i
			})
		}
	},

	removeItem(item) {
		this.cartItems.splice(this.cartItems.findIndex( i => i === item ), 1)
	},

	findCartItem(item) {
		return this.cartItems.find(cartItem => cartItem.id === item.id)
	},

	increaseItem(item) {
		item.qty++
	},

	decreaseItem(item) {
		item.qty--
		if (item.qty === 0) {
			this.removeItem(item)
		}
	},

	getCatalog() {
		return this.catalog.map(item => {
			return Object.assign({}, item, this.cartItems.find( cItem => cItem.id === item.id ))
		})
	},

	addItem(item) {
		const cartItem = this.findCartItem(item)
		if (!cartItem) {
			this.cartItems.push(Object.assign({qty: 1}, item))
		} else {
			this.increaseItem(cartItem)
		}
	},

	cartTotals(initialQty = 0, initialTotal = 0) {
		const qty = this.cartItems.reduce(
			(prev, current) => prev + current.qty, 
			initialQty);
		const total = this.cartItems.reduce(
			(prev, current) => prev + current.qty * current.cost, 
			initialTotal);
		return {qty, total}
	}
}

CartAPI.init()
export default CartAPI