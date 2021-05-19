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
 * Get day of year
 */
export declare function getDayOfYear(date: Date): number;
export interface loc_params_t {
    hoursFromMeridian: number;
    sinDeg_latitude: number;
    cosDeg_latitude: number;
}
export declare function mk_loc_params(lat: number, lon: number): loc_params_t;
/**
 * Calculate time distance(msec) from utc midnight  for either sunrise or sunset.
 * If there will be no sunrise/sunset that day return  Number.MIN_VALUE
 */
export declare function calculate(dayOfYear: number, lp: loc_params_t, isSunrise: boolean): number;
