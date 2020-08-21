import React, { useContext, useEffect, useState } from 'react';
import { PhoneContext } from '../../Contexts/PhoneContext/PhoneContext';
function MobleSelection() {
	const { getMobiles, selectMobileHanlder } = useContext(PhoneContext);
	const [mobiles, setmobiles] = useState([]);
	useEffect(() => {
		setmobiles(getMobiles());
		window.scrollTo(0, 500);
	}, []);
	return (
		<div className="row no-gutters justify-content-start align-items-center selectOption mobileSelect">
			{mobiles.map(item => (
				<div
					className="col-6 col-md-4 col-lg-2"
					key={item.productID}
					onClick={() => {
						selectMobileHanlder(item.mobileModel, item.productID);
					}}
				>
					<div className="branWrap">
						<div className="imgWrapBrand">
							<img
								src={item.image}
								className="d-block text-center mx-auto"
								alt=""
							/>
						</div>
						<h3 className="text-center uppercase">
							{item.mobileModel}
						</h3>
					</div>
				</div>
			))}
		</div>
	);
}

export default MobleSelection;
