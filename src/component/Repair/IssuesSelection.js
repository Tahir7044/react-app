import React, { useEffect, useContext } from 'react';
import { PhoneContext } from '../../Contexts/PhoneContext/PhoneContext';
function IssuesSelection() {
	const {
		issues,
		selectedIssues,
		unSelectIssuesHanlder,
		selectIssuesHanlder,
		preSelectedIssue,
		clearAllIssues,
	} = useContext(PhoneContext);

	useEffect(() => {
		preSelectedIssue();
		window.scrollTo(0, 500);
		return () => {
			clearAllIssues();
		};
	}, []);
	// console.log(selectedIssues);
	return (
		<div className="row no-gutters justify-content-start align-items-center issueSelection selectOption">
			{issues.map(item => (
				<div className="col-12 col-md-6 col-lg-4" key={item.key}>
					<div className="branWrap ">
						<div className="iconWrap">
							<img
								src="/assets/images/icons/broken-phone.png"
								alt=""
							/>
						</div>
						<div className="contentWrap">
							<h4>{item.issue}</h4>
							<p>{item.discription}</p>
							<p className="price">
								Rs {item.minPrice} - Rs {item.maxPrice}
							</p>
						</div>
						<a
							href="javascript:void(0)"
							className={selectedIssues[item.key] ? 'remove' : ''}
							onClick={() => {
								if (selectedIssues[item.key])
									unSelectIssuesHanlder(
										item.key,
										item.minPrice,
										item.maxPrice
									);
								else {
									selectIssuesHanlder(
										item.key,
										item.minPrice,
										item.maxPrice
									);
								}
							}}
						>
							<span className="">+ Add</span>
							<span
								className={
									selectedIssues[item.key] ? '' : 'd-none'
								}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="#fff"
								>
									<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
								</svg>
								Remove
							</span>
						</a>
					</div>
				</div>
			))}
		</div>
	);
}

export default IssuesSelection;
