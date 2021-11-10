import Button from '../../common/Button/Button';

function AuthorListCourse(props) {
	const { value, btnInnerText, btnStyleClass } = props;

	function handleClickAddAuthor(event) {
		event.preventDefault();
		props.authorHandleFunction(value.id);
	}
	return (
		<div className='mb-2 d-flex flex-row align-items-center justify-content-between'>
			{value.name}
			<Button
				clickHandleFunction={handleClickAddAuthor}
				classStyleName={btnStyleClass}
				children={btnInnerText}
			/>
		</div>
	);
}
export default AuthorListCourse;
