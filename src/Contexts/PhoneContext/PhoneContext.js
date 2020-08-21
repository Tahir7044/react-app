import React, { createContext, useState, useEffect } from 'react';
import { brandsData } from '../../data/RepairData';
import axios from 'axios';
export const PhoneContext = createContext();
const PhoneContextProvider = props => {
	const [brands, setBrands] = useState([]);
	const [mobiles, setMobiles] = useState([]);
	const [issues, setIssues] = useState([]);
	const [isPreSelectedIssue, setIsPreSelectedIssue] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState({
		brand: '',
		brandID: '',
		active: false,
	});
	const [selectedMobile, setSelectedMobile] = useState({
		mobile: '',
		mobileID: '',
		active: false,
	});
	const [selectedIssues, setSelectedIssues] = useState({});
	const [totalPrice, setTotalPrice] = useState([0, 0]);

	useEffect(() => {
		async function callAPI() {
			try {
				let issue = await axios.get(`http://localhost:3002/api/issues`);
				setIssues(issue.data.data);
				let phones = await axios.get(
					'http://localhost:3002/api/phones'
				);
				setMobiles(phones.data.data);
			} catch (err) {
				console.error(err);
			}
		}
		callAPI();
		return () => {
			setIssues([]);
			setMobiles([]);
		};
	}, []);
	// Brand handler
	useEffect(() => {
		setBrands(brandsData);
		return () => {
			setBrands([]);
		};
	}, []);

	// brand selection
	const selectBrandHanlder = (brand, id) => {
		setSelectedBrand({ brand: brand, brandID: id, active: true });
	};
	const unSelectBrandHanlder = () => {
		setSelectedBrand({ brand: '', brandID: '', active: false });
		unSelectMobileHanlder();
	};

	// Mobile handler
	const selectMobileHanlder = (mobile, id) => {
		setSelectedMobile({ mobile: mobile, mobileID: id, active: true });
	};
	const unSelectMobileHanlder = () => {
		setSelectedMobile({ mobile: '', mobileID: '', active: false });
	};

	const getMobiles = () => {
		const data = mobiles.filter(
			item => item.brandID == selectedBrand.brandID
		);
		if (data.length == 0) {
			console.log('i will fetch data from server');
		}
		return data;
	};

	// Issues handler
	const preSelectedIssue = () => {
		let myCart = localStorage.getItem('myCart');
		myCart = JSON.parse(myCart);
		let obj = {};
		let min = 0,
			max = 0;
		if (myCart) {
			myCart.map(item => {
				if (
					item.model === selectedMobile.mobile &&
					selectedBrand.brand === item.brand
				) {
					item.issue.map(issue => {
						obj[issue.key] = true;
						min += issue.price[0];
						max += issue.price[1];
					});
					setIsPreSelectedIssue(true);
					setSelectedIssues(obj);
					setTotalPrice([min, max]);
					return;
				}
			});
		}
	};

	const selectIssuesHanlder = (key, minPrice, maxPrice) => {
		setTotalPrice([totalPrice[0] + minPrice, totalPrice[1] + maxPrice]);
		let obj = { ...selectedIssues };
		obj[key] = true;
		setSelectedIssues(obj);
	};
	const unSelectIssuesHanlder = (key, minPrice, maxPrice) => {
		let obj = { ...selectedIssues };
		setTotalPrice([totalPrice[0] - minPrice, totalPrice[1] - maxPrice]);
		obj[key] = false;
		setSelectedIssues(obj);
	};
	const clearAllIssues = () => {
		setSelectedIssues({});
		setIsPreSelectedIssue(false);
		setTotalPrice([0, 0]);
	};
	const unClearAll = () => {
		setSelectedBrand({});
		setSelectedMobile({});
		setSelectedIssues({});
		setTotalPrice([0, 0]);
	};

	return (
		<PhoneContext.Provider
			value={{
				brands,
				mobiles,
				issues,
				selectBrandHanlder,
				unSelectBrandHanlder,
				selectIssuesHanlder,
				selectMobileHanlder,
				unSelectMobileHanlder,
				unSelectIssuesHanlder,
				clearAllIssues,
				unClearAll,
				preSelectedIssue,
				isPreSelectedIssue,
				totalPrice,
				selectedBrand,
				selectedMobile,
				selectedIssues,
				getMobiles,
			}}
		>
			{props.children}
		</PhoneContext.Provider>
	);
};

export default PhoneContextProvider;
