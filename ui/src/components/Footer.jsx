import React from 'react';

const Footer = () => {
	return (
		<section className='section is-small has-background-light'>
			<footer className='footer has-background-light'>
				<div className='container'>
					<p className='title is-size-6 has-text-centered'>
						2019 &copy; Totte Sjöman
					</p>
					<p className='is-size-7'>
						Icons made by{' '}
						<a
							className='has-text-primary'
							href='https://www.flaticon.com/authors/freepik'
							title='Freepik'
						>
							Freepik
						</a>{' '}
						from{' '}
						<a
							className='has-text-primary'
							href='https://www.flaticon.com/'
							title='Flaticon'
						>
							www.flaticon.com
						</a>
					</p>
				</div>
			</footer>
		</section>
	);
};

export default Footer;
