import React from 'react';
import Home from './component/Home';
import TopBar from './component/NavBar/TopBar';
import NavBar from './component/NavBar/NavBar';
import Footer from './component/Footer/Footer';
import About from './component/About/About';
import Repair from './component/Repair/Repair';
import Page404 from './component/Error404';
import Checkout from './component/Checkout/Checkout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Faq from './component/FAQ/Faq';
import ThankYou from './component/ThankYou';
import UserCart from './component/UserCart';
import Profile from './component/User/Profile/Profile';
import Address from './component/User/Address/Address';
import Appointments from './component/User/Appointments/Appointments';
import Modal from './component/Modal';
import EditProfile from './component/User/Profile/EditProfile';
import UserContextProvider from './Contexts/UserContext/UserContext';
import AddressContextProvider from './Contexts/AddressContext/AddressContext';
import AddAddress from './component/User/Address/AddAddress';
import EditAddress from './component/User/Address/EditAddress';
import PhoneContextProvider from './Contexts/PhoneContext/PhoneContext';

// Checkout.whyDidYouRender = true;
// Repair.whyDidYouRender = true;
// Profile.whyDidYouRender = true;
// Home.whyDidYouRender = true;

function App() {
	return (
		<PhoneContextProvider>
			<AddressContextProvider>
				<UserContextProvider>
					<Router>
						<div id="site-wrapper">
							<TopBar />
							<NavBar />
							<Switch>
								<Route path="/" component={Home} exact />
								<Route path="/faq" component={Faq} exact />
								<Route path="/about" component={About} exact />
								<Route
									path="/repair"
									component={Repair}
									exact
								/>
								<Route
									path="/checkout"
									component={Checkout}
									exact
								/>
								<Route
									path="/mycart"
									component={UserCart}
									exact
								/>
								<Route
									path="/checkout/thankyou"
									component={ThankYou}
									exact
								/>
								<Route
									path="/profile"
									exact
									component={Profile}
								/>
								<Route
									path="/addaddress"
									exact
									component={AddAddress}
								/>
								<Route
									path="/editaddress/:id"
									exact
									component={EditAddress}
								/>
								<Route
									path="/address"
									exact
									component={Address}
								/>
								<Route
									path="/appointments/:category"
									exact
									component={Appointments}
								/>
								<Route
									path="/editprofile"
									exact
									component={EditProfile}
								/>
								<Route path="*" component={Page404} />
							</Switch>
							<Modal />
							<Footer />
						</div>
					</Router>
				</UserContextProvider>
			</AddressContextProvider>
		</PhoneContextProvider>
	);
}

export default App;
