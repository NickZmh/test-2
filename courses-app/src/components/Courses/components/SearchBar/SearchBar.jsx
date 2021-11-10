import { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

function SearchBar(props) {
	const [styleButton] = useState('btn-primary ml-3');
	const [inputPlaceholder] = useState('EnterCourseName');
	const [searchInputValue, setSearchInputValue] = useState('');
	const innerSearchButtonText = 'Search';
	const [inputId] = 'searchInput';

	function handleChangeInput(e) {
		setSearchInputValue(e.target.value);
		props.handleSearchInputValue(e.target.value);
	}

	return (
		<form action='' className='d-flex flex-row w-100'>
			<Input
				inputId={inputId}
				inputValue={searchInputValue}
				handleChangeInput={handleChangeInput}
				inputPlaceholder={inputPlaceholder}
			/>
			<Button classStyleName={styleButton} children={innerSearchButtonText} />
		</form>
	);
}

export default SearchBar;
