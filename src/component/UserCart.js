import React, { useEffect, useState } from 'react';
import EmptyCart from './Checkout/EmptyCart';
import MyCartUtil from './Checkout/MyCartUtil';
import { Link } from 'react-router-dom';
function UserCart() {
	const [myCart, setmyCart] = useState(
		JSON.parse(localStorage.getItem('myCart')) || []
	);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const cartHandler = item => {
		const filteredcart = myCart.filter(doc => doc !== item);
		if (filteredcart.length)
			localStorage.setItem('myCart', JSON.stringify(filteredcart));
		else localStorage.removeItem('myCart');
		setmyCart(filteredcart);
	};
	return (
		<section className="checkoutWrapper profileWrapper">
			<div className="sectionWrapper">
				<div className="row justify-content-center">
					<div className="col-12 col-lg-8">
						<div className="userWrapper">
							<div className="userHeader">
								<h2>My Cart</h2>
								{myCart.length ? (
									<Link
										to="/checkout"
										style={{ cursor: 'pointer' }}
										className="text-center buttons"
									>
										CHECKOUT NOW
									</Link>
								) : (
									<></>
								)}
							</div>

							{/* empty cart */}

							<div className="userDetails">
								<div className="orderBlock">
									{myCart.length ? (
										<MyCartUtil
											myCart={myCart}
											cartHandler={cartHandler}
											callingFromCart={true}
										/>
									) : (
										<EmptyCart />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default UserCart;
