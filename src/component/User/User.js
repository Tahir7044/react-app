import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function User({ Active }) {
	const [choose, setChoose] = useState(Active);
	const onClickHandler = value => {
		setChoose(value);
	};
	return (
		<div className="col-lg-3 col-12 d-none d-lg-block">
			<div className="sideBarWrapper">
				<Link
					to="/profile"
					className={
						choose === 'profile'
							? 'sideBarBlock active'
							: 'sideBarBlock'
					}
					onClick={() => onClickHandler('profile')}
				>
					<h3>My Profile</h3>
					<p>Your Name, Phone Number, Password, Gender,</p>
				</Link>
				<Link
					to="/address"
					className={
						choose === 'address'
							? 'sideBarBlock active'
							: 'sideBarBlock'
					}
					onClick={() => onClickHandler('address')}
				>
					<h3>My Address</h3>
					<p>Add, Edit Addresses</p>
				</Link>
				<Link
					to="/appointments/all"
					className={
						choose === 'appointments'
							? 'sideBarBlock active'
							: 'sideBarBlock'
					}
					onClick={() => onClickHandler('appointments')}
				>
					<h3>My Repairs</h3>
					<p>Status of Repair Appointments, Past Repairs</p>
				</Link>
				<Link to="/" className="sideBarBlock">
					<h3>Logout</h3>
					<p>Logout of your account</p>
				</Link>
			</div>
		</div>
	);
}

export default User;
