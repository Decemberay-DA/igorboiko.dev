/**
 *
 */
export interface ITimeMoment {
	sinceStart: number;
	delta: number;
	frame: number;
}

// export interface ITimeMomentMathed extends ITimeMoment, MATHJS.Matrix {}

// const mathArray = MATHJS.matrix([0, 0, 0]);

// const timeMoment2: ITimeMomentMathed = {
// 	...MATHJS.matrix([0, 0, 0]),
// 	sinceStart: 0,
// 	delta: 0,
// 	frame: 0,
// };

// const timeMoment5: ITimeMomentMathed = {
// 	...MATHJS.matrix([0, 0, 0]),
// 	sinceStart: 0,
// 	delta: 0,
// 	frame: 0,
// };

// const av = MATHJS.mean([timeMoment2, timeMoment5]);
