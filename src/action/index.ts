import * as actionTypes from './action-types';
import { ActionsUnion, createAction, IBookingDetails, IDeleteBookingRequest, IHotelListRequest, IHotelListResponse, IModifyBooking } from '../utils/types/index';

export const hotelListRequest = (payload?: IHotelListRequest|undefined) => createAction(actionTypes.HOTEL_LIST_REQUEST, payload);
export const hotelListFailure = (payload: string) => createAction(actionTypes.HOTEL_LIST_FAILURE, payload);
export const hotelListResponse = (payload: IHotelListResponse[]) => createAction(actionTypes.HOTEL_LIST_RESPONSE, payload);

export const getBookingDetailsRequest = () => createAction(actionTypes.GET_BOOKING_DETAILS_REQUEST);
export const getBookingDetailsFailure = (payload: string) => createAction(actionTypes.GET_BOOKING_DETAILS_FAILURE, payload);
export const getBookingDetailsResponse = (payload: IBookingDetails[]) => createAction(actionTypes.GET_BOOKING_DETAILS_RESPONSE, payload);

export const modifyBookingRequest = (payload: IModifyBooking) => createAction(actionTypes.MODIFY_BOOKING_REQUEST, payload);
export const modifyBookingFailure = (payload: string) => createAction(actionTypes.MODIFY_BOOKING_FAILURE, payload);
export const modifyBookingResponse = () => createAction(actionTypes.MODIFY_BOOKING_RESPONSE);

export const deleteBookingRequest = (payload: IDeleteBookingRequest) => createAction(actionTypes.DELETE_BOOKING_REQUEST, payload);
export const deleteBookingFailure = (payload: string) => createAction(actionTypes.DELETE_BOOKING_FAILURE, payload);
export const deleteBookingResponse = () => createAction(actionTypes.DELETE_BOOKING_RESPONSE);

export const DASHBOARD_ACTIONS = {
  hotelListRequest,
  hotelListFailure,
  hotelListResponse
};

export type HotelListAction = ActionsUnion<typeof DASHBOARD_ACTIONS>;
