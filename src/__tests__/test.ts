import {calculate,getDayOfYear,mk_loc_params} from '../index'

describe('FastSunriseSunset library', () => {
	it('should have calculate,getDayOfYear,mk_loc_params', () => {
		expect(typeof calculate).toBe('function');
		expect(typeof getDayOfYear).toBe('function');
		expect(typeof mk_loc_params).toBe('function');
	});

	let day_start=new Date("2000-01-21 00:00:00 GMT");
	let doy=getDayOfYear(day_start);
	let loc=mk_loc_params(51.1788, -1.8262);
	it('should return correct sunrise time for GMT', () => {
		let ofs=calculate(doy,loc,true);
		expect(new Date(day_start.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 07:59:37.362 GMT"))
	});
	it('should return correct sunset time for GMT', () => {
		let ofs=calculate(doy,loc,false);
		expect(new Date(day_start.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 16:38:21.883 GMT"))
	});
})


