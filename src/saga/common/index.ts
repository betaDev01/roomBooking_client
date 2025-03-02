import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from '../../action/action-types/index'
import {
  deleteBookingFailure,
  deleteBookingResponse,
  getBookingDetailsFailure,
  getBookingDetailsRequest,
  getBookingDetailsResponse,
  hotelListFailure,
  hotelListRequest,
  hotelListResponse,
  modifyBookingFailure,
  modifyBookingResponse
} from "../../action";
import { IBookingDetails, IDeleteBookingRequest, IHotelListRequest, IHotelListResponse, IModifyBooking, ISagaPayload } from "../../utils/types";
import { API_ROUTES } from "../../utils";
import { apiCall } from "../../utils/helper";

function* commonRequest(action: ISagaPayload<IHotelListRequest>): any {
  try {
    const response = yield apiCall({
      apiPath: API_ROUTES.hotelList.path,
      method: API_ROUTES.hotelList.method,
      params: action.payload ? {
        'location': action.payload?.location || '',
      } : null
    });
    if (response.status === 401) {
      yield put(hotelListFailure(response.data.error));
    } else {
      const res: IHotelListResponse[] = response.data?.data && response.data?.data.length > 0 ?
        response.data.data : [];
      yield put(hotelListResponse(res));
    }
  } catch (error: any) {
    yield put(hotelListFailure(error));
  }
}

function* getBookingDetailsRequestSaga(): any {
  try {
    const response = yield apiCall({
      apiPath: API_ROUTES.getBookingDetais.path,
      method: API_ROUTES.getBookingDetais.method
    });
    if (response.status === 401) {
      yield put(getBookingDetailsFailure(response.data.error));
    } else {
      const res: IBookingDetails[] = response.data?.data && response.data?.data.length > 0 ?
        response.data.data : [];
      console.log("🚀 ~ function*getBookingDetailsRequest ~ res:", res)

      yield put(getBookingDetailsResponse(res));
    }
  } catch (error: any) {
    yield put(getBookingDetailsFailure(error));
  }
}

function* deleteBookingRequest(action: ISagaPayload<IDeleteBookingRequest>): any {
  try {
    const response = yield apiCall({
      apiPath: API_ROUTES.deleteBooking.path,
      method: API_ROUTES.deleteBooking.method,
      params: {
        'bookingId': action.payload?.bookingId
      }
    });
    if (response.status === 401) {
      yield put(deleteBookingFailure(response.data.error));
    } else {
      const res: IBookingDetails[] = response.data?.data && response.data?.data.length > 0 ?
        response.data.data : [];
      yield put(deleteBookingResponse());
      yield put(getBookingDetailsRequest());
    }
  } catch (error: any) {
    yield put(deleteBookingFailure(error));
  }
}

function* modifyBokingRequest(action: ISagaPayload<IModifyBooking>): any {
  try {
    const response = yield apiCall({
      apiPath: API_ROUTES.modifyBooking.path,
      method: API_ROUTES.modifyBooking.method,
      data: {
        ...action.payload
      }
    });
    if (response.status === 401) {
      yield put(modifyBookingFailure(response.data.error));
    } else {
      const res: IBookingDetails[] = response.data?.data && response.data?.data.length > 0 ?
        response.data.data : [];
      yield put(modifyBookingResponse());
      yield put(getBookingDetailsRequest());
      yield put(hotelListRequest())
    }
  } catch (error: any) {
    yield put(modifyBookingFailure(error));
  }
}

export function* commonSagaRequests() {
  yield takeLatest(actionTypes.HOTEL_LIST_REQUEST, commonRequest);
  yield takeLatest(actionTypes.GET_BOOKING_DETAILS_REQUEST, getBookingDetailsRequestSaga);
  yield takeLatest(actionTypes.MODIFY_BOOKING_REQUEST, modifyBokingRequest);
  yield takeLatest(actionTypes.DELETE_BOOKING_REQUEST, deleteBookingRequest);
}