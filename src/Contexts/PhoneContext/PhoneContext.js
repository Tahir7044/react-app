import React, { createContext, useState, useEffect } from 'react';
import { brandsData, mobileData, issueData } from '../../data/RepairData';
export const PhoneContext = createContext();
const PhoneContextProvider = props => {
	const [brands, setBrands] = useState([]);
	const [mobiles, setMobiles] = useState([]);
	const [issues, setIssues] = useState([]);
	const [isPreSelectedIssue, setIsPreSelectedIssue] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState({
		brand: '',
		active: false,
	});
	const [selectedMobile, setSelectedMobile] = useState({
		mobile: '',
		active: false,
	});
	const [selectedIssues, setSelectedIssues] = useState({});
	const [totalPrice, setTotalPrice] = useState([0, 0]);
	// Brand handler
	useEffect(() => {
		setBrands(brandsData);
		setMobiles(mobileData);
		setIssues(issueData);
		return () => {
			setBrands([]);
			setMobiles([]);
			setIssues([]);
		};
	}, [brandsData, mobileData, issueData]);
	const selectBrandHanlder = brand => {
		setSelectedBrand({ brand: brand, active: true });
	};
	const unSelectBrandHanlder = () => {
		setSelectedBrand({ brand: '', active: false });
		unSelectMobileHanlder();
	};

	// Mobile handler
	const selectMobileHanlder = mobile => {
		setSelectedMobile({ mobile: mobile, active: true });
	};
	const unSelectMobileHanlder = () => {
		setSelectedMobile({ mobile: '', active: false });
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
						// console.log(issue.key);
						obj[issue.key] = true;
						min += issue.price[0];
						max += issue.price[1];
					});
					// console.log(obj);
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
			}}
		>
			{props.children}
		</PhoneContext.Provider>
	);
};

export default PhoneContextProvider;
