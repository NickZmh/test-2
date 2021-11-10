import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import {
	setUserSession,
	setError,
	validation,
} from '../../helpers/authorization';

export const Login = () => {
	const [inputValues, setInputValues] = useState({
		name: '',
		email: '',
		password: '',
	});
	const handleChangeInput = async (e) => {
		const { id, value } = e.target;
		setInputValues((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};
	const history = useHistory();

	const handleSumbitLoginForm = async (e) => {
		e.preventDefault();

		const isValid = validation(inputValues);

		if (isValid) {
			const jsonData = JSON.stringify(inputValues);
			console.log(jsonData);
			const settings = {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: jsonData,
			};
			const response = await fetch('http://localhost:3000/login', settings);
			const responseResult = await response.json();
			const token = responseResult.result;
			if (response.status === 201) {
				setUserSession(token, responseResult.user);
				history.push('/courses');
			} else if (response.status === 400) {
				setError(
					responseResult.result,
					'Some values in not correct, please check your entered data'
				);
			}
		}
	};
	return (
		<div className='welcome-block d-flex fle-column justify-content-center align-items-center'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-4'>
						<form action='post' onSubmit={handleSumbitLoginForm}>
							<h4 className='text-center'>Login</h4>
							<div className='form-group'>
								<Input
									type={'text'}
									value={inputValues.name}
									labelInnerText={'Name'}
									inputId={'name'}
									inputPlaceholder={'Enter Name'}
									handleChangeInput={(e) => {
										handleChangeInput(e);
									}}
								/>
							</div>
							<div className='form-group'>
								<Input
									type={'email'}
									value={inputValues.email}
									labelInnerText={'Email'}
									inputId={'email'}
									inputPlaceholder={'Enter email'}
									handleChangeInput={(e) => {
										handleChangeInput(e);
									}}
								/>
							</div>
							<div className='form-group'>
								<Input
									type={'password'}
									value={inputValues.password}
									labelInnerText={'Password'}
									inputId={'password'}
									inputPlaceholder={'Enter password'}
									handleChangeInput={(e) => {
										handleChangeInput(e);
									}}
								/>
							</div>
							<div className='form-group'>
								<Button
									type={'submit'}
									classStyleName={'btn-dark w-100'}
									children={'Login'}
								/>
							</div>
							<div className='from-group'>
								<p>
									if you not have an account you can
									<Link to='/registration'>
										<strong>Registration</strong>
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
