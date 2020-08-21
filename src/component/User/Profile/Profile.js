import React, { useContext } from 'react';
import User from '../User';
import { UserContext } from '../../../Contexts/UserContext/UserContext';
import { Link } from 'react-router-dom';
function Profile() {
	const { user } = useContext(UserContext);
	const { userName, email, phoneNumber, password, gender } = user;
	return (
		<section className="profileWrapper">
			<div className="sectionWrapper">
				<div className="row justify-content-center">
					<User Active="profile" />
					<div className="col-lg-9 col-12">
						<div className="userWrapper">
							<div className="userHeader">
								<h2>Profile Information</h2>
								<Link to="/editprofile">Edit Info</Link>
							</div>
							<div className="userDetails">
								<form>
									<div className="formGroup row no-gutters justify-content-between">
										<div className="col-5 col-lg-4">
											<h3>User Name</h3>
										</div>
										<div className="col-7 col-lg-8">
											<input
												type="text"
												className="plainText"
												readOnly
												value={userName}
											/>
										</div>
									</div>
									<div className="formGroup row no-gutters justify-content-between">
										<div className="col-5 col-lg-4">
											<h3>Gender</h3>
										</div>
										<div className="col-7 col-lg-8">
											<input
												type="text"
												className="plainText"
												readOnly
												value={gender}
											/>
										</div>
									</div>
									<div className="formGroup row no-gutters justify-content-between">
										<div className="col-5 col-lg-4">
											<h3>Email</h3>
										</div>
										<div className="col-7 col-lg-8">
											<input
												type="email"
												className="plainText"
												readOnly
												value={email}
											/>
										</div>
									</div>
									<div className="formGroup row no-gutters justify-content-between">
										<div className="col-5 col-lg-4">
											<h3>Phone Number</h3>
										</div>
										<div className="col-7 col-lg-8">
											<input
												type="text"
												className="plainText"
												readOnly
												value={phoneNumber}
											/>
										</div>
									</div>
									<div className="formGroup row no-gutters justify-content-between">
										<div className="col-5 col-lg-4">
											<h3>Password</h3>
											<a
												href="javascript:void(0)"
												className="changePassword"
											>
												(Change Password)
											</a>
										</div>
										<div className="col-7 col-lg-8">
											<input
												type="password"
												className="plainText"
												readOnly
												value={password}
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

export default Profile;
