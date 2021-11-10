function Button(props) {
	return (
		<button
			type={props.type}
			className={`btn ${props.classStyleName}`}
			onClick={props.clickHandleFunction}
		>
			{props.children}
		</button>
	);
}
export default Button;
