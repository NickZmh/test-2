import React from 'react';
import { Link } from 'react-router-dom';

function logo() {
	return (
		<Link className='navbar-brand' to='/'>
			<img
				src='https://getbootstrap.com/docs/4.6/assets/brand/bootstrap-solid.svg'
				width='30'
				height='30'
				className='d-inline-block align-top'
				alt=''
			/>
			Bootstrap
		</Link>
	);
}

export default logo;
