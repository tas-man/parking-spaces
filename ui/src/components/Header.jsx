import React from 'react';

const Header = ({ getParkingData, onChange, searchId, error }) => {
	return (
		<section className='section has-background-dark'>
			<h1 className='is-size-1 has-text-white'>Search for parking spaces</h1>
			<h3 className='is-size-5 has-text-white'>
				Enter facility id specified by the HSL API
			</h3>
			<form
				className='column is-one-fifth is-offset-two-fifths'
				onSubmit={getParkingData}
			>
				<div className='field has-addons'>
					<input
						className='input'
						type='text'
						ref={searchId}
						onChange={e => onChange}
						placeholder='Enter Facility Id'
						required
					/>
					<button className='button is-primary'>Search</button>
				</div>
				{error ? <h2 className='is-size-5 has-text-warning'>{error}</h2> : null}
			</form>
			<h3 className='is-size-6 has-text-grey'>
				Examples: 755 = Lauttasaarentie, 738 = Keimolanportti
			</h3>
		</section>
	);
};

export default Header;
