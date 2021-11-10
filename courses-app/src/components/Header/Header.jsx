import React from 'react';
import Logo from './components/Logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

function Header() {
	const userName = 'Andrey';
	const { pathname } = useLocation();

	return (
		<nav className='navbar navbar-light bg-light'>
			<Logo />
			{pathname !== '/registration' && pathname !== '/login' && (
				<div className='d-flex flex-row justify-content-center align-items-center'>
					<p className='h6 mb-0 mr-4'>{userName}</p>
					<button type='button' className='btn btn-outline-info'>
						Log out
					</button>
				</div>
			)}
		</nav>
	);
}

export default Header;
