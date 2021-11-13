import { useParams, useRouteMatch, useHistory, Link } from 'react-router-dom';
import { convertDuration } from '../../helpers/pipeDuration';

export const CourseInfo = ({ courseListItems }) => {
	const params = useParams();
	const history = useHistory();
	console.log(history);

	const match = useRouteMatch();
	console.log(match);

	const inforCourseItem = courseListItems.filter((item) => {
		return item.id === params.courseId;
	});
	console.log(inforCourseItem);
	const [item] = inforCourseItem;
	console.log(item);

	const duration = convertDuration(item.duration);
	console.log(duration);

	return (
		<div className='container'>
			<div className='row mt-4'>
				<div className='col-12 mb-2'>
					<Link to='/courses'>&lt; Back to courses</Link>
				</div>
				<div className='col-12'>
					<h3 className='text-center mb-4'>{item.title}</h3>
				</div>
				<div className='col-8'>
					<p>{item.description}</p>
				</div>
				<div className='col-4'>
					<p>
						<strong>id: </strong>
						{item.id}
					</p>
					<p>
						<strong>Duration: </strong>
						{`${duration.hours}:${duration.minutes}`} hours
					</p>
					<p>
						<strong>Created: </strong>
						{item.creationDate}
					</p>
					<p>
						<strong className='mb-2 d-inline-block'>Authors: </strong>
						{item.authors.map((item, index) => (
							<p className='mb-1' key={index}>
								{item}
							</p>
						))}
					</p>
				</div>
			</div>
		</div>
	);
};
