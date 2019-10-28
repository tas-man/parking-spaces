import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
import 'bulma/css/bulma.min.css';
import getParkingDataById from './utils/axios-conf';

function App() {
	const [facility, setFacility] = useState({
		name: '',
		availableSpaces: 0,
		prediction30min: 0,
		prediction60min: 0,
		prediction90min: 0,
		error: null
	});
	const { error } = facility;
	const searchId = useRef(755);

	const onChange = e => {
		searchId.current.value = e.target.value;
	};

	const getParkingData = e => {
		e.preventDefault();
		getParkingDataById(searchId.current.value)
			.then(res => {
				if (res.status === 200 || 304) {
					const data = res.data;
					setFacility({
						name: data.facilityName ? data.facilityName : '',
						availableSpaces: data.currentStatus.spacesAvailable
							? data.currentStatus.spacesAvailable
							: 0,
						prediction30min: data.prediction30min.spacesAvailable
							? data.prediction30min.spacesAvailable
							: 0,
						prediction60min: data.prediction60min.spacesAvailable
							? data.prediction60min.spacesAvailable
							: 0,
						prediction90min: data.prediction90min.spacesAvailable
							? data.prediction90min.spacesAvailable
							: 0,
						error: null
					});
				}
			})
			.catch(err => {
				setFacility({
					name: '',
					error: `Could not retrieve data for facility with id ${searchId.current.value}`
				});
				console.log(err);
			});
	};

	return (
		<div className='App'>
			<Header
				onChange={onChange}
				getParkingData={getParkingData}
				searchId={searchId}
				error={error}
			/>
			<Main facility={facility} />
			<Footer />
		</div>
	);
}

export default App;
