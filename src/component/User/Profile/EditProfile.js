import React, { useContext, useState } from 'react';
import User from '../User';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../Contexts/UserContext/UserContext';
import { useHistory } from 'react-router-dom';
import { Error } from '../../../Contexts/ErrorContext/ErrorContext';
function EditProfile() {
	let history = useHistory();
	const { user, SubmitHandler } = useContext(UserContext);
	const [tempUser, setTempUser] = useState(user);
	const { userName, email, phoneNumber, gender } = tempUser;
	const editProfilehandler = e => {
		const { name, value } = e.target;
		setTempUser(prevState => ({
			...prevState,
			[name]: value,
		}));
	};
	const onSubmitHandler = e => {
		e.preventDefault();
		for (let [key, value] of Object.entries(tempUser)) {
			if (!value) {
				return Error('warn', 'please fill all the section');
			}
		}
		SubmitHandler(tempUser);
		history.push('/profile');
	};
	return (
		<section className="profileWrapper">
			<div className="sectionWrapper">
				<div className="row justify-content-center">
					<User Active="profile" />
					<div className="col-lg-9 col-12">
						<div className="userWrapper phoneFixed">
							<div className="userHeader justify-content-start">
								<Link
									to="/profile"
									className="d-block d-lg-none"
								>
									<img
										src="/assets/images/icons/lessthan.png"
										width="22"
										className="mr-2"
									/>
								</Link>
								<h2>Profile Information</h2>
							</div>
							<div className="userDetails">
								<form onSubmit={onSubmitHandler}>
									<div className="formGroup align-items-center row no-gutters justify-content-between">
										<div className="col-12 col-md-4">
											<h3>User Name</h3>
										</div>
										<div className="col-12 col-md-8">
											<input
												type="text"
												className="editProfileDetails"
												value={userName}
												name="userName"
												onChange={editProfilehandler}
											/>
										</div>
									</div>
									<div className="formGroup align-items-center row no-gutters justify-content-between">
										<div className="col-12 col-md-4">
											<h3>Gender</h3>
										</div>
										<div className="col-12 col-md-8">
											<select
												name="gender"
												id=""
												className="editProfileDetails"
												value={
													gender
														? gender
														: 'Not Selected'
												}
												onChange={editProfilehandler}
											>
												<option value="Not Selected">
													Select Gender
												</option>
												<option value="Male">
													Male
												</option>
												<option value="Female">
													Female
												</option>
												<option value="Others">
													Others
												</option>
											</select>
										</div>
									</div>
									<div className="formGroup align-items-center row no-gutters justify-content-between">
										<div className="col-12 col-md-4">
											<h3>Email</h3>
										</div>
										<div className="col-12 col-md-8">
											<input
												type="email"
												className="editProfileDetails"
												readOnly
												value={email}
											/>
										</div>
									</div>
									<div className="formGroup align-items-center row no-gutters justify-content-between">
										<div className="col-12 col-md-4 d-flex d-md-block">
											<h3>Phone Number</h3>
											<a
												href="javascript:void(0)"
												className="changePassword"
											>
												(Send OTP)
											</a>
										</div>
										<div className="col-12 col-md-8">
											<input
												type="text"
												id="phonenumber"
												className="editProfileDetails"
												value={phoneNumber}
												pattern="[1-9]{1}[0-9]{9}"
												maxLength="10"
												name="phoneNumber"
												onChange={editProfilehandler}
											/>
										</div>
									</div>
									<div className="formGroup align-items-center row no-gutters justify-content-between">
										<div className="col-12 col-md-4 d-flex d-md-block">
											<h3>Enter OTP</h3>
											<a
												href="javascript:void(0)"
												className="changePassword"
											>
												(Resend OTP)
											</a>
										</div>
										<div className="col-12 col-md-8">
											<input
												type="text"
												className="editProfileDetails"
												defaultValue=""
												pattern="[0-9]{1}[0-9]{9}"
												maxLength="4"
											/>
										</div>
									</div>
									<div className="formGroup align-items-center row no-gutters justify-content-between">
										<div className="col-12">
											<input
												type="submit"
												name=""
												className=""
												id=""
												value="Save Changes"
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default EditProfile;
