import React, { Fragment } from 'react';

const Main = ({ facility }) => {
	const {
		name,
		availableSpaces,
		prediction30min,
		prediction60min,
		prediction90min
	} = facility;
	return (
		<section className='section column is-half is-offset-one-quarter is-large mh-750'>
			{name !== '' ? (
				<Fragment>
					<h1 className='title'>{name}</h1>
					<div className='table-container'>
						<table id='facilityTable' className='table is-fullwidth'>
							<tbody className='is-size-4'>
								<tr>
									<td>Currently available spaces</td>
									<td id='availableSpaces' className='has-text-weight-bold'>
										{availableSpaces}
									</td>
								</tr>
								<tr>
									<td>30 min prediction</td>
									<td id='30minPrediction'>{prediction30min}</td>
								</tr>
								<tr>
									<td>60 min prediction</td>
									<td id='60minPrediction'>{prediction60min}</td>
								</tr>
								<tr>
									<td>90 min prediction</td>
									<td id='90minPrediction'>{prediction90min}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<div className='is-flex is-horizontal-center'>
						<figure className='image is-128x128'>
							<img src='./icons/parked-car.svg' alt='' />
						</figure>
					</div>

					<h3 id='facilityName' className='is-size-5 has-text-weight-bold'>
						Please enter the ID of your destination!
					</h3>
				</Fragment>
			)}
		</section>
	);
};

export default Main;
