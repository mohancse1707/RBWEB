/*
 * Copyright (c) 2021. ReserveBuddy.
 *  All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

export enum TravelType {
  ONE_WAY = 'One Way',
  ROUND_TRIP = 'Round Trip',
  MULTI_CITY = 'Multi City'
}

export enum TravellingIn {
  ECONOMY = 'ECONOMY',
  BUSINESS = 'Business',
  FIRST = 'First'
}
export interface IFlightSearchModel {
  departingFrom: string;
  arrivingTo: string;
  dateFrom: Date;
  dateTo: Date;
  isRoundTrip: boolean;
  travelType: TravelType.ONE_WAY;
  travellers: IFlightTraveller;
  travellingIn: string;
}
export interface IFlightTraveller {
  adults: number;
  children: number;
  infant: number;
}
