import React from 'react';
import Logo from './components/Logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useHistory } from 'react-router-dom';
import { deleteUserSession } from '../../helpers/authorization';
import Button from '../../common/Button/Button';

function Header({ userInfo }) {
	const { pathname } = useLocation();

	const history = useHistory();

	return (
		<nav className='navbar navbar-light bg-light'>
			<Logo />
			{pathname !== '/registration' && pathname !== '/login' && (
				<div className='d-flex flex-row justify-content-center align-items-center'>
					<p className='h6 mb-0 mr-4'>{userInfo && userInfo.name}</p>
					<Button
						type={'button'}
						classStyleName={'btn-outline-info'}
						clickHandleFunction={(e) => {
							e.preventDefault();
							deleteUserSession('token', 'user');
							history.push('/login');
						}}
						children={'Log out'}
					/>
				</div>
			)}
		</nav>
	);
}

export default Header;
