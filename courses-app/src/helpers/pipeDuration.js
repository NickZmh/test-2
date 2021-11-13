export const convertDuration = (timeMinutes) => {
	let time = timeMinutes;
	if (typeof timeMinutes !== 'number') {
		time = +timeMinutes;
	}
	let hours = Math.floor(time / 60)
			.toString()
			.padStart(2, 0),
		minutes = Math.floor(time % 60)
			.toString()
			.padStart(2, 0);
	console.log();
	return { hours, minutes };
};
