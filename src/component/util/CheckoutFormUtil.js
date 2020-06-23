import React, { useState } from 'react';
import { Error } from '../../Contexts/ErrorContext/ErrorContext';

export function AddressHook(initialState) {
	const [state, setState] = useState(initialState);
	const checkOuthandler = e => {
		const { name, value } = e.target;
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
	};
	const stateClear = initialState => {
		setState(initialState);
	};
	const checkOutSubmithandler = (e, initialState) => {
		e.preventDefault();
		// some logic check and save to database
		for (let [key, value] of Object.entries(state)) {
			if (!value) {
				Error('warn', `please fill all the section`);
				return true;
			}
		}
		//  reset the state
		let storage = localStorage.getItem('address');
		if (!storage) {
			storage = [state];
			localStorage.setItem('address', JSON.stringify(storage));
		} else {
			storage = JSON.parse(storage);
			storage.push(state);
			localStorage.removeItem('address');
			localStorage.setItem('address', JSON.stringify(storage));
		}
		stateClear(initialState);
		return false;
	};

	return [state, checkOuthandler, checkOutSubmithandler, stateClear];
}

export function FormShowHook(intialState) {
	const [showForm, setShowForm] = useState(initialState);
	const showFormHandler = () => {
		setShowForm(!showForm);
	};
	return [showForm, showFormHandler];
}
