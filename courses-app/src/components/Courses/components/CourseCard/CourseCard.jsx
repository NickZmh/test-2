import { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import { convertDuration } from './../../../../helpers/pipeDuration';

function CoursesCard(props) {
	const { title, description, authors, duration, creationDate } = props.value;

	const convertedDuration = useMemo(() => {
		return convertDuration(duration);
	}, [duration]);

	const history = useHistory();

	return (
		<div className='col-12'>
			<div className='card mb-3'>
				<div className='card-body'>
					<div className='row'>
						<div className='col-7'>
							<h5 className='card-title'>{title}</h5>
							<p className='card-text'>{description}</p>
						</div>
						<div className='col-5'>
							<div className='card'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item'>
										<strong>Autors: </strong>
										{authors.join(', ')}
									</li>
									<li className='list-group-item'>
										<strong>Durations: </strong>
										{`${convertedDuration.hours}:${convertedDuration.minutes} `}
										hours
									</li>
									<li className='list-group-item'>
										<strong>Created: </strong>
										{creationDate}
									</li>
								</ul>
							</div>
							<Button
								classStyleName={'btn-info mt-2'}
								children={'Show course'}
								clickHandleFunction={(e) => {
									e.preventDefault();
									history.push(`course/${props.id}`);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CoursesCard;
