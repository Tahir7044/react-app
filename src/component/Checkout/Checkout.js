import React, { useState, useEffect } from 'react';
import MyCart from './MyCart';
import PriceSummary from './PriceSummary';
import PickupAddress from './PickupAddress';
import DeliverAddress from './DeliverAddress';
import { useHistory, Redirect } from 'react-router-dom';
import { Error } from '../../Contexts/ErrorContext/ErrorContext';
import $ from 'jquery';
function Checkout() {
	let history = useHistory();
	const [mycart, setMycart] = useState(
		JSON.parse(localStorage.getItem('myCart')) || []
	);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [pickDrop, setPickDrop] = useState(true);
	const [pickUpAddress, setPickUpAddress] = useState({});
	const [deliverAddres, setDeliverAddress] = useState({});
	const [deliverDrop, setDeliverDrop] = useState(true);

	const pickUpaddressHandler = (item, index) => {
		// console.log(item);
		let obj = {};
		obj[index] = item;
		setPickUpAddress(obj);
		console.log(Object.values(obj));
	};
	const deliveraddressHandler = (item, index) => {
		let obj = {};
		obj[index] = item;
		setDeliverAddress(obj);
	};
	const pickDropHanlder = value => {
		setPickDrop(value);
	};
	const deliverPickHanlder = value => {
		setDeliverDrop(value);
	};
	const onsubmitHandler = checked => {
		if (!checked) {
			Error('info', 'please select the check box');
		} else if (pickDrop && $.isEmptyObject(pickUpAddress)) {
			Error('info', 'please select the pick up address');
		} else if (deliverDrop && $.isEmptyObject(deliverAddres)) {
			Error('info', 'please select the delivery address');
		} else {
			let appointments = localStorage.getItem('appointments');
			if (appointments) appointments = JSON.parse(appointments);
			let pickUpaddress = !pickDrop
				? 'shop'
				: Object.values(pickUpAddress)[0];
			let deliveryAddress = !deliverDrop
				? 'shop'
				: Object.values(deliverAddres)[0];
			let appointment = {
				pickUpaddress: pickUpaddress,
				deliveryAddress: deliveryAddress,
				mobiles: mycart,
			};
			if (appointments) {
				appointments.push(appointment);
				localStorage.setItem(
					'appointments',
					JSON.stringify(appointments)
				);
			} else {
				localStorage.setItem(
					'appointments',
					JSON.stringify([appointment])
				);
			}
			localStorage.removeItem('myCart');
			history.push('/checkout/thankyou');
		}
	};
	if (!mycart.length) {
		return <Redirect to="/mycart" />;
	}
	return (
		<section className="checkoutWrapper profileWrapper">
			<div className="sectionWrapper">
				<div className="row justify-content-center">
					<div className="col-12 col-lg-8">
						<MyCart mycart={mycart} />
						<PickupAddress
							pickUpaddressHandler={pickUpaddressHandler}
							pickUpAddress={pickUpAddress}
							pickDropHanlder={pickDropHanlder}
						/>
						<DeliverAddress
							deliveraddressHandler={deliveraddressHandler}
							deliverAddres={deliverAddres}
							deliverPickHanlder={deliverPickHanlder}
						/>
					</div>

					<PriceSummary
						pickUp={pickDrop}
						onsubmitHandler={onsubmitHandler}
					/>
				</div>
			</div>
		</section>
	);
}

export default Checkout;
