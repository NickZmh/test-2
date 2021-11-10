import { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useHistory } from 'react-router-dom';
import { setError, validation } from '../../helpers/authorization';

export const Registration = () => {
	const [inputValues, setInputsValues] = useState({
		name: '',
		email: '',
		password: '',
	});
	const handleChangeInput = (e) => {
		const { id, value } = e.target;
		setInputsValues((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};
	const history = useHistory();

	const handleSumbitRegistrationForm = async (e) => {
		e.preventDefault();

		const isValid = validation(inputValues, 'Registration was successful');

		if (isValid === true) {
			const jsonData = JSON.stringify(inputValues);
			const settings = {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				method: 'post',
				body: jsonData,
			};
			const response = await fetch('http://localhost:3000/register', settings);
			const responseResult = await response.json();
			console.log(response);
			if (response.status === 201) {
				history.push('/login');
			} else if (response.status === 400) {
				setError(responseResult.errors, 'This email already exist');
			}
		}
	};

	return (
		<div className='welcome-block d-flex fle-column justify-content-center align-items-center'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-4'>
						<form action='post' onSubmit={handleSumbitRegistrationForm}>
							<h4 className='text-center'>Registration</h4>
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
									children={'Registration'}
								/>
							</div>
							<div className='from-group'>
								<p>
									if you have an account you can
									<Link to='/login'>
										<strong>Login</strong>
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
