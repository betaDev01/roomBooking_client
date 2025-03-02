import produce from 'immer';

import * as actionTypes from '../../action/action-types/index';
import { HotelListAction } from '../../action';
import { IReducerInitialState } from '../../utils/types';


const initialState: IReducerInitialState = {
  isHotelListFetching: false,
  hotelListEror: '',
  hotelListRespose: [],

  isBookinDetailsFetching: false,
  bookingDetailsError: '',
  bokingDetailsResponse: [],

  isModifyBookingFetching: false,
  modifyBookingError: '',

  isDeleteBookingFetching: false,
  deleteBookingError: ''
};

export const commonReducer = (prevState: IReducerInitialState = initialState, action: HotelListAction) => {
  switch (action.type) {
    case actionTypes.HOTEL_LIST_REQUEST:
      return produce(prevState, (nextState) => {
        nextState.isHotelListFetching = true;
        nextState.hotelListEror = ''
      });

    case actionTypes.HOTEL_LIST_FAILURE:
      return produce(prevState, (nextState) => {
        nextState.isHotelListFetching = false;
        nextState.hotelListEror = action.payload;
      });

    case actionTypes.HOTEL_LIST_RESPONSE:
      return produce(prevState, (nextState) => {
        nextState.isHotelListFetching = false;
        nextState.hotelListEror = '';
        nextState.hotelListRespose = action.payload
      });


    // Booking list Details Reducer
    case actionTypes.GET_BOOKING_DETAILS_REQUEST:
      return produce(prevState, (nextState) => {
        nextState.isBookinDetailsFetching = true;
        nextState.bookingDetailsError = ''
      });

    case actionTypes.GET_BOOKING_DETAILS_FAILURE:
      return produce(prevState, (nextState) => {
        nextState.isBookinDetailsFetching = false;
        nextState.bookingDetailsError = action.payload;
      });

    case actionTypes.GET_BOOKING_DETAILS_RESPONSE:
      return produce(prevState, (nextState) => {
        nextState.isBookinDetailsFetching = false;
        nextState.bookingDetailsError = '';
        nextState.bokingDetailsResponse = action.payload
      });


    //Modify Booking
    case actionTypes.MODIFY_BOOKING_REQUEST:
      return produce(prevState, (nextState) => {
        nextState.isModifyBookingFetching = true;
        nextState.modifyBookingError = ''
      });

    case actionTypes.MODIFY_BOOKING_FAILURE:
      return produce(prevState, (nextState) => {
        nextState.isModifyBookingFetching = false;
        nextState.modifyBookingError = action.payload;
      });

    case actionTypes.MODIFY_BOOKING_RESPONSE:
      return produce(prevState, (nextState) => {
        nextState.isModifyBookingFetching = false;
        nextState.modifyBookingError = '';
      });


         //Delete Booking
    case actionTypes.DELETE_BOOKING_REQUEST:
      return produce(prevState, (nextState) => {
        nextState.isDeleteBookingFetching = true;
        nextState.deleteBookingError = ''
      });

    case actionTypes.DELETE_BOOKING_FAILURE:
      return produce(prevState, (nextState) => {
        nextState.isDeleteBookingFetching = false;
        nextState.deleteBookingError = action.payload;
      });

    case actionTypes.DELETE_BOOKING_RESPONSE:
      return produce(prevState, (nextState) => {
        nextState.isDeleteBookingFetching = false;
        nextState.deleteBookingError = '';
      });
    default: return prevState;
  }
};