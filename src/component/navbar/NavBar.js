import React, { Fragment, useState } from 'react';
import WhatsApp from '../../component/WhatsApp.js';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import { menuName } from '../../data/HomeData';
import MenuMobile from '../MenuMobile';
function NavBar() {
	const [menu, setMenu] = useState(menuName);
	const [hanBurger, sethanBurger] = useState(false);
	const handleMobile = () => {
		if (!hanBurger) {
			window.$('.mobileMenuWrapperOuter').addClass('on');
			window.$('body').addClass('mobileMenuActive');
			sethanBurger(!hanBurger);
		} else {
			window.$('.mobileMenuWrapperOuter').removeClass('on');
			window.$('body').removeClass('mobileMenuActive');
			sethanBurger(!hanBurger);
		}
	};
	return (
		<Fragment>
			<header className="siteHeader">
				<div className="sectionWrapper">
					<div className="row align-items-center justify-content-between no-gutters">
						<div className="col-4 d-block d-lg-none">
							<Link
								to="javascript:void(0)"
								className="mobileMenuTrigger"
								onClick={handleMobile}
							>
								<button type="button" className="">
									<span className="icon-bar top-bar"></span>
									<span className="icon-bar middle-bar"></span>
									<span className="icon-bar bottom-bar m-0"></span>
								</button>
							</Link>
						</div>

						<div className="col-4 col-lg-2">
							<div className="logoWrapper">
								<Link to="index.html">
									<img
										src="assets/images/logo.png"
										width="120"
										alt=""
									/>
								</Link>
							</div>
						</div>
						<div className="col-0 col-lg-10 containsBottomBar d-lg-block text-right">
							<div className="menuWrapper d-none d-lg-inline-block">
								{menu.map(item => (
									<Menu key={item.key} item={item} />
								))}
							</div>
							<div className="iconsWrapper">
								<div className="iconsItem d-inline-block d-md-block d-lg-none">
									<Link to="index.html" className="active">
										<i className="glyph-icon flaticon-home-1"></i>
									</Link>
								</div>
								<div className="iconsItem d-inline-block d-md-block d-lg-none">
									<Link to="repair.html">
										<i className="glyph-icon flaticon-settings"></i>
									</Link>
								</div>
								<div className="iconsItem d-lg-inline-block d-md-block">
									<Link
										to="javascript:void(0)"
										data-toggle="modal"
										data-target="#loginModalCenter"
										className="logInBtn"
									>
										<i className="glyph-icon flaticon-user"></i>
									</Link>
									<ul className="subMenu">
										<li>
											<Link to="profile.html">
												My Profile
											</Link>
										</li>

										<li className="rule"></li>
										<li>
											<Link to="address.html">
												Saved Address
											</Link>
										</li>

										<li className="rule"></li>
										<li>
											<Link to="repair.html">
												Repair Appointments
											</Link>
										</li>

										<li className="rule"></li>

										<li>
											<Link to="javascript:void(0)">
												Log Out
											</Link>
										</li>
									</ul>
								</div>
								<div className="iconsItem d-none d-lg-inline-block">
									<Link to="faq.html">
										<i className="glyph-icon flaticon-headphones"></i>
									</Link>
								</div>
								<div className="iconsItem d-lg-inline-block d-md-block hasItems">
									<Link to="checkout.html">
										<i className="glyph-icon flaticon-note"></i>
										<div className="circleWrapper">
											<div className="circle"></div>
										</div>
									</Link>
									<ul className="subMenu">
										<li>
											<a className="d-flex justify-content-center product">
												<div className="imgWrap">
													<img
														src="assets/images/mobiles/oneplus/oneplussixt.png"
														height="60"
														alt=""
													/>
												</div>
												<div className="content">
													<h3>OnePlus 6T</h3>
													<p>
														Screen Repair, Mic
														Repair
													</p>
													<p>
														Total Price:{' '}
														<span>Rs 1399</span>
													</p>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<MenuMobile handleMobile={handleMobile} />
						<WhatsApp />
					</div>
				</div>
			</header>
		</Fragment>
	);
}

export default NavBar;
