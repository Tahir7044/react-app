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
	return (
		<div className="row no-gutters justify-content-start align-items-center issueSelection selectOption">
			{issues.map(item => (
				<div className="col-12 col-md-6 col-lg-4" key={item.issueID}>
					<div className="branWrap ">
						<div className="iconWrap">
							<img
								src={`/assets/images/icons/${item.image}`}
								alt=""
							/>
						</div>
						<div className="contentWrap">
							<h4>{item.issueName}</h4>
							<p>{item.description}</p>
							<p className="price">
								Rs {item.minimumPrice} - Rs {item.maximumPrice}
							</p>
						</div>
						<a
							href="javascript:void(0)"
							className={
								selectedIssues[item.issueID] ? 'remove' : ''
							}
							onClick={() => {
								if (selectedIssues[item.issueID])
									unSelectIssuesHanlder(
										item.issueID,
										item.minimumPrice,
										item.maximumPrice
									);
								else {
									selectIssuesHanlder(
										item.issueID,
										item.minimumPrice,
										item.maximumPrice
									);
								}
							}}
						>
							<span className="">+ Add</span>
							<span
								className={
									selectedIssues[item.issueID] ? '' : 'd-none'
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
