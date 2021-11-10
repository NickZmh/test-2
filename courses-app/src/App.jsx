import {
	Route,
	Switch,
	useLocation,
	Redirect,
	useHistory,
	Link,
} from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import './App.css';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

function App() {
	const [mockedAuthorsListArray, setMockedAuthorsListArray] =
		useState(mockedAuthorsList);

	const history = useHistory();

	// here we replace author id to author name
	const coursesList = mockedCoursesList.map((item) => {
		const itemCopy = { ...item };
		const updateItem = item.authors.map((authorItem) => {
			const AuthorsListArrayFindItem = mockedAuthorsListArray.find((fItem) => {
				return fItem.id === authorItem;
			});
			authorItem = AuthorsListArrayFindItem.name;
			return authorItem;
		});
		itemCopy.authors = updateItem;
		return itemCopy;
	});

	const [courseListItems, setNewMockedCoursesListArray] = useState(coursesList);

	const createNewAuthor = (inputAddAuthorsValue) => {
		if (inputAddAuthorsValue.length > 2) {
			setMockedAuthorsListArray([
				...mockedAuthorsListArray,
				{ id: uuidv4(), name: inputAddAuthorsValue },
			]);
		} else {
			alert('Error: Author name should consist more than 2 letter');
		}
	};

	// add new item object of course list into 'newMockedCoursesListArray' array - existing course list
	const createNewCoursesButtonHandle = (newDateAuthor) => {
		setNewMockedCoursesListArray((prevState) => [...prevState, newDateAuthor]);
	};

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route path='/registration' component={Registration} />
				<Route exact path='/courses'>
					<Courses courseItems={courseListItems} />
				</Route>
				<Route exact parh='/courses/add'>
					<CreateCourse
						createNewAuthor={createNewAuthor}
						handlerCourseButton={createNewCoursesButtonHandle}
						mockedAuthorsListArray={mockedAuthorsListArray}
					/>
				</Route>
				<Route exact path='/courses/:userId' component={CourseInfo} />
				<Redirect from='/' to='/login' />
			</Switch>
		</div>
	);
}

export default App;
