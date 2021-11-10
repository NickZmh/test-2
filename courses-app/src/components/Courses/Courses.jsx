import { useMemo, useState } from 'react';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import CoursesCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

function Courses({ courseItems }) {
	const btnCreateCourseInnerText = 'Create Course';
	const btnCreateCourseStyle = 'btn-info';

	const { push } = useHistory();

	const [searchValue, setChangeSearchValue] = useState('');

	// search by name or id in course list array
	const listCourse = useMemo(() => {
		const listCourse = courseItems.filter((searchItem) => {
			return (
				searchItem.title.toLowerCase().includes(searchValue.toLowerCase()) ||
				searchItem.id.toLowerCase().includes(searchValue.toLocaleLowerCase())
			);
		});
		return listCourse;
	}, [searchValue, courseItems]);

	const { url } = useRouteMatch();
	console.log(url);

	let { slug } = useParams();
	console.log(slug);

	return (
		<div>
			<div className='container'>
				<div className='row mt-5'>
					<div className='col-8'>
						<SearchBar
							handleSearchInputValue={(value) => setChangeSearchValue(value)}
						/>
					</div>
					<div className='col-4 d-flex flex-row justify-content-end'>
						<Button
							classStyleName={btnCreateCourseStyle}
							children={btnCreateCourseInnerText}
							clickHandleFunction={(e) => {
								e.preventDefault();
								push('/courses/add');
							}}
						/>
					</div>
				</div>
				<div className='row mt-4'>
					{listCourse.map((item) => (
						<CoursesCard key={item.id} id={item.id} value={item} url={url} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Courses;
