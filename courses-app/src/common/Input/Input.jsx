import React from 'react';

function Input(props) {
	return (
		<div className='input-group mb-0'>
			{props.labelInnerText && (
				<label
					htmlFor={props.inputId}
					className='input-group-prepend w-100 mb-1'
				>
					{props.labelInnerText}
				</label>
			)}

			<input
				type={props.type}
				value={props.inputValue}
				onChange={props.handleChangeInput}
				id={props.inputId}
				className='form-control'
				placeholder={props.inputPlaceholder}
			/>
		</div>
	);
}
export default Input;
