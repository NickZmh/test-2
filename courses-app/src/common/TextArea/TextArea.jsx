function TextArea(props) {
	return (
		<div className='form-group'>
			{props.label && (
				<label className='mb-1' htmlFor={props.textareaId}>
					{props.textareaLabelInnerText}
				</label>
			)}
			<textarea
				name={props.textareaId}
				id={props.textareaId}
				value={props.textareaValue}
				placeholder={props.placeholder}
				onChange={props.handleChangeTextarea}
				cols='20'
				rows='6'
				className='form-control'
			></textarea>
		</div>
	);
}
export default TextArea;
