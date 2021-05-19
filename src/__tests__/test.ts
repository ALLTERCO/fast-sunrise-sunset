import {calculate,getDayOfYear,mk_loc_params} from '../index'

describe('FastSunriseSunset library', () => {
	it('should have calculate,getDayOfYear,mk_loc_params', () => {
		expect(typeof calculate).toBe('function');
		expect(typeof getDayOfYear).toBe('function');
		expect(typeof mk_loc_params).toBe('function');
	});

	let day_start_winter=new Date("2000-01-21 00:00:00 GMT");
	let day_start_spring=new Date("2000-04-21 00:00:00 GMT");
	let day_start_summer=new Date("2000-06-21 00:00:00 GMT");
	let day_start_autumn=new Date("2000-09-21 00:00:00 GMT");
	
	let loc_stonehenge=mk_loc_params(51.1788, -1.8262);
	let loc_sofia=mk_loc_params(42.7011,23.3232);

	it('should return correct sunrise/sunset time in winter for mutiple locations', () => {
		const day_start=day_start_winter;
		let doy=getDayOfYear(day_start);
		let ofs=calculate(doy,loc_stonehenge,true);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-01-21T07:59:37.362Z");
		ofs=calculate(doy,loc_stonehenge,false);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-01-21T16:38:21.883Z");
		//SOFIA
		ofs=calculate(doy,loc_sofia,true);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-01-21T05:51:15.833Z");
		ofs=calculate(doy,loc_sofia,false);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-01-21T15:25:17.206Z");
	});

	it('should return correct sunrise/sunset time in spring for mutiple locations', () => {
		const day_start=day_start_spring;
		let doy=getDayOfYear(day_start);
		/*
		let ofs=calculate(doy,loc_stonehenge,true);
		expect(new Date(day_start_winter.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 07:59:37.362 GMT"))
		ofs=calculate(doy,loc_stonehenge,false);
		expect(new Date(day_start_winter.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 16:38:21.883 GMT"))
		*/
		
		let ofs=calculate(doy,loc_sofia,true);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-04-21T03:35:05.183Z");
		ofs=calculate(doy,loc_sofia,false);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-04-21T17:16:14.769Z");
	});

	it('should return correct sunrise/sunset time in summer for mutiple locations', () => {
		const day_start=day_start_summer;
		let doy=getDayOfYear(day_start);
		/*
		let ofs=calculate(doy,loc_stonehenge,true);
		expect(new Date(day_start_winter.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 07:59:37.362 GMT"))
		ofs=calculate(doy,loc_stonehenge,false);
		expect(new Date(day_start_winter.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 16:38:21.883 GMT"))
		*/
		
		let ofs=calculate(doy,loc_sofia,true);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-06-21T02:48:45.836Z");
		ofs=calculate(doy,loc_sofia,false);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-06-21T18:08:23.524Z");
	});


	it('should return correct sunrise/sunset time in autumn for mutiple locations', () => {
		const day_start=day_start_autumn;
		let doy=getDayOfYear(day_start);
		/*
		let ofs=calculate(doy,loc_stonehenge,true);
		expect(new Date(day_start_winter.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 07:59:37.362 GMT"))
		ofs=calculate(doy,loc_stonehenge,false);
		expect(new Date(day_start_winter.getTime()+ofs)).toEqual(new Date("Fri, 21 Jan 2000 16:38:21.883 GMT"))
		*/
		
		let ofs=calculate(doy,loc_sofia,true);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-09-21T04:13:23.752Z"); //+40 seconds
		ofs=calculate(doy,loc_sofia,false);
		expect(new Date(day_start.getTime()+ofs).toISOString()).toEqual("2000-09-21T16:24:57.976Z") //-61seconds;
	});

})


