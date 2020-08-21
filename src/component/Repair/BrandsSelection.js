import React, { useContext, useEffect } from 'react';
import { PhoneContext } from '../../Contexts/PhoneContext/PhoneContext';

function BrandsSelection() {
	const { brands, selectBrandHanlder } = useContext(PhoneContext);
	// console.log(brands);
	return (
		<div className="row no-gutters justify-content-start align-items-center selectOption">
			{brands.map(item => (
				<div
					key={item.brandID}
					className="col-6 col-md-4 col-lg-2"
					onClick={() => {
						selectBrandHanlder(item.brandName, item.brandID);
					}}
				>
					<div className="branWrap">
						<div className="imgWrapBrand">
							<img
								src={`/assets/images/brandLogos/${item.image}`}
								className="d-block text-center mx-auto"
								alt={item.brandName}
							/>
						</div>
						<h3 className="text-center uppercase">
							{item.brandName}
						</h3>
					</div>
				</div>
			))}
		</div>
	);
}

export default BrandsSelection;
