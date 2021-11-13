import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import TextArea from '../../common/TextArea/TextArea';
import AuthorListCourse from '../AuthorListCourse/AuthorListCourse';
import { convertDuration } from '../../helpers/pipeDuration';

function CreateCourse(props) {
	const { mockedAuthorsListArray } = props;

	const btnStyle = 'btn-info',
		btnText = 'Create New Course',
		btnSuccessStyleClass = 'btn-success',
		btnRemoveStyleClass = 'btn-danger',
		btnAddAuthorInnerText = 'Add author',
		btnRemoveAuthorInnerText = 'Delete author',
		btnCreateAuthorText = 'Create Author',
		inputTypeText = 'text',
		inputTypeNumber = 'number',
		inputTitleCourseName = 'Title',
		inputTitleLabel = 'input-title',
		inputTitleCoursePlaceholder = 'Enter title',
		textareaPlaceholderCreateCourse = 'Enter Description',
		textareaCreateCourseLabel = 'textarea-description',
		textareaCreateCourseLabelInnerText = 'Description',
		inputAddAuthorsId = 'input-authors-name',
		inputAddAuthorsLabelInnerText = 'Author Name',
		inputAddUthorsPlaceholder = 'Enter author name...',
		inputDurationLabelId = 'input-duration',
		inputDurationLabelInnerText = 'Duration',
		inputDurationPlaceholder = '';

	const [authors, setAuthor] = useState(mockedAuthorsListArray);
	const [courseAuthors, setCourseAuthors] = useState([]);

	const history = useHistory();

	useEffect(() => {
		setAuthor(mockedAuthorsListArray);
	}, [mockedAuthorsListArray]);

	// here filtered items from 'author' list that not consist in 'course authors' list
	const authorsList = useMemo(() => {
		let filtAuthor = authors.filter((item) => {
			return !courseAuthors.some((elem) => {
				return elem.id === item.id;
			});
		});
		return filtAuthor;
	}, [authors, courseAuthors]);

	const [inputTitleValue, setInputTitleValue] = useState('');
	const [textareaCreateCourseValue, setTextareaCreateCourseValue] =
		useState('');
	const [inputAddAuthorsValue, setinputAddAuthorsValue] = useState('');
	const [inputDurationValue, setInputDurationValue] = useState('');

	// here the checking that all inputs are filled and created new item object for course and passed to parent component
	function handleClickCreateCourseButton(event) {
		event.preventDefault();

		if (
			inputTitleValue.length < 1 ||
			textareaCreateCourseValue.length < 1 ||
			inputDurationValue.length < 1
		) {
			alert('Please, fill in all fields');
		} else if (courseAuthors.length < 1) {
			alert('Please, choose at least one author to create new course');
		} else {
			const dateStamp = new Date();
			const today = dateStamp.getDate().toString().padStart(2, '0');
			const month = (dateStamp.getMonth() + 1).toString().padStart(2, '0');
			const year = dateStamp.getFullYear();
			const fullDate = today + '/' + month + '/' + year;
			const filteredCourseAuthor = courseAuthors.map((item) => {
				return item.name;
			});
			const data = {
				id: uuidv4(),
				title: inputTitleValue,
				description: textareaCreateCourseValue,
				creationDate: fullDate,
				duration: Number(inputDurationValue),
				authors: filteredCourseAuthor,
			};
			props.handlerCourseButton(data);
			history.push('/courses');
		}
	}
	// here we pass input author value to parent component
	function handleClickButtonCreateAuthor(event) {
		event.preventDefault();
		props.createNewAuthor(inputAddAuthorsValue);
		if (inputAddAuthorsValue.length > 2) setinputAddAuthorsValue('');
	}

	const [updateDurationValue, setDurationValue] = useState({
		minutes: '00',
		hours: '00',
	});
	const { minutes, hours } = updateDurationValue;
	console.log(updateDurationValue);
	// convert duration value into hours and minutes
	function inputDurationHandle(event) {
		setInputDurationValue(event.target.value);
		setDurationValue(() => convertDuration(event.target.value));
	}
	// handler callback that set new item into 'course authors' list from 'author' list
	function AddAuthor(idItem) {
		const newAuthor = authors.find((item) => {
			return item.id === idItem;
		});
		setCourseAuthors((preveState) => [...preveState, newAuthor]);
	}

	// handler callback that remove one autor item from 'course authors' list
	function RemoveAuthor(idItem) {
		const filteredOneAuthor = courseAuthors.filter((item) => {
			return item.id !== idItem;
		});
		setCourseAuthors(filteredOneAuthor);
	}

	return (
		<form className=''>
			<div className='container'>
				<div className='row mt-5'>
					<div className='col-8'>
						<div className='form-group'>
							<Input
								type={inputTypeText}
								labelInnerText={inputTitleCourseName}
								valueValue={inputTitleValue}
								label={inputTitleLabel}
								inputId={inputTitleLabel}
								inputPlaceholder={inputTitleCoursePlaceholder}
								handleChangeInput={(e) => setInputTitleValue(e.target.value)}
							/>
						</div>
					</div>
					<div className='col-4 d-flex flex-row justify-content-end align-items-end'>
						<div className='form-group'>
							<Button
								classStyleName={btnStyle}
								children={btnText}
								clickHandleFunction={handleClickCreateCourseButton}
							/>
						</div>
					</div>
					<div className='col-12'>
						<TextArea
							textareaLabelInnerText={textareaCreateCourseLabelInnerText}
							label={textareaCreateCourseLabel}
							textareaId={textareaCreateCourseLabel}
							placeholder={textareaPlaceholderCreateCourse}
							handleChangeTextarea={(e) =>
								setTextareaCreateCourseValue(e.target.value)
							}
							textareaValue={textareaCreateCourseValue}
						/>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='card'>
					<div className='card-body pt-5'>
						<div className='row'>
							<div className='col-6'>
								<h6 className='text-center'>Add authors</h6>
								<div className='form-group'>
									<Input
										type={inputTypeText}
										inputId={inputAddAuthorsId}
										labelInnerText={inputAddAuthorsLabelInnerText}
										inputValue={inputAddAuthorsValue}
										handleChangeInput={(e) =>
											setinputAddAuthorsValue(e.target.value)
										}
										inputPlaceholder={inputAddUthorsPlaceholder}
									/>
								</div>
								<div className='form-group mb-5 d-flex flex-row justify-content-center'>
									<Button
										classStyleName={btnStyle}
										children={btnCreateAuthorText}
										clickHandleFunction={handleClickButtonCreateAuthor}
									/>
								</div>
								<h6 className='text-center'>Duration</h6>
								<div className='form-group'>
									<Input
										type={inputTypeNumber}
										labelInnerText={inputDurationLabelInnerText}
										inputId={inputDurationLabelId}
										value={inputDurationValue}
										handleChangeInput={inputDurationHandle}
										inputPlaceholder={inputDurationPlaceholder}
									/>
								</div>
								<div className='form-group d-flex flex-row justify-content-start'>
									<p className='mb-0'>
										Duration <strong>{`${hours}:${minutes}`}</strong> hours
									</p>
								</div>
							</div>
							<div className='col-6'>
								<h6 className='text-center'>Authors</h6>
								{authorsList.length < 1 ? (
									<div className='text-center'>Author list is empty</div>
								) : (
									authorsList.map((item) => (
										<AuthorListCourse
											key={item.id}
											value={item}
											authorHandleFunction={AddAuthor}
											btnStyleClass={btnSuccessStyleClass}
											btnInnerText={btnAddAuthorInnerText}
										/>
									))
								)}
								<h6 className='text-center mt-4'>Course authors</h6>
								{courseAuthors.length < 1 ? (
									<div className='text-center'>Author list is empty</div>
								) : (
									courseAuthors.map((item) => (
										<AuthorListCourse
											key={item.id}
											value={item}
											authorHandleFunction={RemoveAuthor}
											btnStyleClass={btnRemoveStyleClass}
											btnInnerText={btnRemoveAuthorInnerText}
										/>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default CreateCourse;
