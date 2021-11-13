import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../Context/Context';

export const PrivateRoute = ({ children, ...rest }) => {
	let auth = useAuth();
	console.log(auth);
	return (
		<Route
			{...rest}
			// render={({ location }) =>
			// auth.user ? (
			// 	children
			// ) : (
			// 	<Redirect
			// 		to={{
			// 			pathname: '/login',
			// 			state: { from: location },
			// 		}}
			// 	/>
			// )
			// }
		/>
	);
};
