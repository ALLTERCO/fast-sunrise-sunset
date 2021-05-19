/**
 *  Original library by By Matt Kane and Alexey Udivankin 
 *  Optimised for speed and multiple calls for mutiple locations by Stoian Ivanov
 *
 *  Original copyrights folow
 */
/**
 * Sunrise/sunset script. By Matt Kane. Adopted for NPM use by Alexey Udivankin.
 * 
 * Based loosely and indirectly on Kevin Boone's SunTimes Java implementation 
 * of the US Naval Observatory's algorithm.
 * 
 * Copyright © 2012 Triggertrap Ltd. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General
 * Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 * You should have received a copy of the GNU Lesser General Public License along with this library; if not, write to
 * the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA,
 * or connect to: http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
 */


/**
 * Degrees per hour
 */
const DEGREES_PER_HOUR = 360 / 24;

/**
 * Msec in hour
 */
const MSEC_IN_HOUR = 60 * 60 * 1000;

const PIx2=2.0*Math.PI;

/**
 * Default zenith
 */
const DEFAULT_ZENITH_cosDeg = cosDeg(90.8333);



/**
 * Get day of year
 */
export function getDayOfYear(date: Date): number {
	
	return Math.ceil((date.getTime() - Date.UTC(date.getUTCFullYear(), 0, 1)) / 8.64e7)+1;
	//return Math.ceil((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 8.64e7);
}

/**
 * Get sin of value in deg
 */
function sinDeg(deg: number): number {
	return Math.sin(deg * PIx2 / 360.0);
}

/**
 * Get acos of value in deg
 */
function acosDeg(x: number): number {
	return Math.acos(x) * 360.0 / PIx2;
}

/**
 * Get asin of value in deg
 */
function asinDeg(x: number): number {
	return Math.asin(x) * 360.0 / PIx2;
}

/**
 * Get tan of value in deg
 */
function tanDeg(deg: number): number {
	return Math.tan(deg * PIx2 / 360.0);
}

/**
 * Get cos of value in deg
 */
function cosDeg(deg: number): number {
	return Math.cos(deg * PIx2 / 360.0);
}

/**
 * Get ramainder
 */
function mod(a: number, b: number): number {
	const result = a % b;
	return (result < 0 ? result + b : result);
}


export interface loc_params_t {
	hoursFromMeridian:number;
	sinDeg_latitude:number;
	cosDeg_latitude:number;
}

export function mk_loc_params(lat:number,lon:number):loc_params_t{
	return {
		hoursFromMeridian:lon / DEGREES_PER_HOUR,
		sinDeg_latitude:sinDeg(lat),
		cosDeg_latitude:cosDeg(lat),
	}
}

/**
 * Calculate time distance(msec) from utc midnight  for either sunrise or sunset.
 * If there will be no sunrise/sunset that day return  Number.MIN_VALUE
 */
export function calculate(dayOfYear:number, lp:loc_params_t,  isSunrise: boolean): number  {

	const approxTimeOfEventInDays = (isSunrise? dayOfYear + ((6 - lp.hoursFromMeridian) / 24): dayOfYear + ((18.0 - lp.hoursFromMeridian) / 24));

	const sunMeanAnomaly = (0.9856 * approxTimeOfEventInDays) - 3.289;
	const sunTrueLongitude = mod(sunMeanAnomaly + (1.916 * sinDeg(sunMeanAnomaly)) + (0.020 * sinDeg(2 * sunMeanAnomaly)) + 282.634, 360);
	const ascension = 0.91764 * tanDeg(sunTrueLongitude);

	let rightAscension;
	rightAscension = 360 / (PIx2) * Math.atan(ascension);
	rightAscension = mod(rightAscension, 360);

	const lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
	const raQuadrant = Math.floor(rightAscension / 90) * 90;
	rightAscension = rightAscension + (lQuadrant - raQuadrant);
	rightAscension /= DEGREES_PER_HOUR;

	const sinDec = 0.39782 * sinDeg(sunTrueLongitude);
	const cosDec = cosDeg(asinDeg(sinDec));
	const cosLocalHourAngle = ((DEFAULT_ZENITH_cosDeg) - (sinDec * (lp.sinDeg_latitude))) / (cosDec * (lp.cosDeg_latitude));
	if (cosLocalHourAngle>1 || cosLocalHourAngle<-1) {
		return Number.MIN_VALUE;
	}
	const localHourAngle = (isSunrise? 360 - acosDeg(cosLocalHourAngle) : acosDeg(cosLocalHourAngle));

	const localHour = localHourAngle / DEGREES_PER_HOUR;
	const localMeanTime = localHour + rightAscension - (0.06571 * approxTimeOfEventInDays) - 6.622;
	const time = mod(localMeanTime - (lp.hoursFromMeridian), 24);

	// Created date will be set to local (system) time zone.
	return time * MSEC_IN_HOUR;
}

