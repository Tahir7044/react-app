import React, { useState, useContext } from 'react';
import SearchBrands from './SearchBrand';
import BrandsSelection from './BrandsSelection';
import MobleSelection from './MobleSelection';
import IssueSelection from './IssuesSelection';
import Checkout from './RepairCheckout';
import { PhoneContext } from '../../Contexts/PhoneContext/PhoneContext';

function RepairBrands() {
	const {
		totalPrice,
		issues,
		selectedIssues,
		selectedBrand,
		unSelectBrandHanlder,
		selectedMobile,
		isPreSelectedIssue,
		unSelectMobileHanlder,
		unClearAll,
	} = useContext(PhoneContext);

	const CheckOutHandler = () => {
		let myCart = localStorage.getItem('myCart');
		let issue = [];
		issues.forEach(item => {
			if (selectedIssues[item.issueID]) {
				issue.push({
					key: item.issueID,
					issue: item.issueName,
					price: [item.minimumPrice, item.maximumPrice],
				});
			}
		});

		let summary = {
			brand: selectedBrand.brand,
			model: selectedMobile.mobile,
			issue: issue,
			price: totalPrice,
		};
		if (!myCart || myCart.length === 0) {
			localStorage.setItem('myCart', JSON.stringify([summary]));
		} else {
			myCart = JSON.parse(myCart);
			if (isPreSelectedIssue) {
				myCart = myCart.filter(
					item =>
						item.brand !== summary.brand &&
						item.model !== summary.model
				);
			}
			myCart.push(summary);
			localStorage.setItem('myCart', JSON.stringify(myCart));
		}
		unClearAll();
	};
	return (
		<section className="repairSelection">
			<div className="sectionWrapper">
				<div className="row no-gutters align-items-center justify-content-between">
					<div
						className="col-4"
						onClick={() => {
							if (selectedBrand.active) unSelectBrandHanlder();
						}}
					>
						<a
							href="javascript:void(0)"
							className={
								selectedBrand.active
									? 'text-center progressBooking active'
									: 'text-center progressBooking'
							}
						>
							{selectedBrand.brand
								? selectedBrand.brand
								: 'Brand'}
						</a>
					</div>
					<div
						className="col-4"
						onClick={() => {
							if (selectedMobile.active) unSelectMobileHanlder();
						}}
					>
						<a
							href="javascript:void(0)"
							className={
								selectedMobile.active
									? 'text-center progressBooking active'
									: 'text-center progressBooking'
							}
						>
							{selectedMobile.mobile
								? selectedMobile.mobile
								: 'Mobile'}
						</a>
					</div>
					<div className="col-4">
						<a
							href="javascript:void(0)"
							className="text-center progressBooking"
						>
							Issue
						</a>
					</div>
				</div>

				{!selectedBrand.active && (
					<>
						<SearchBrands msg="Select Your Brand" />
						<BrandsSelection />
					</>
				)}
				{selectedBrand.active && !selectedMobile.active && (
					<>
						<SearchBrands
							msg={`Select Your ${selectedBrand.brand} Device`}
						/>
						<MobleSelection />
					</>
				)}
				{selectedBrand.active && selectedMobile.active && (
					<>
						<Checkout
							msg={`Select Your issue in ${selectedMobile.mobile}`}
							CheckOutHandler={CheckOutHandler}
						/>
						<IssueSelection />
					</>
				)}
			</div>
		</section>
	);
}

export default RepairBrands;
