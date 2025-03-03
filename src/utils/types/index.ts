import { AnyAction } from "redux"

export interface IHotelListRequest {
  location?: string
}

export interface IHotelListResponse {
  id: string
  hotel_name: string
  location: string
  total_rooms: number
  available_rooms: number
}

export interface IReducerInitialState {
  isHotelListFetching: boolean;
  hotelListEror: string;
  hotelListRespose: IHotelListResponse[]

  isBookinDetailsFetching: boolean,
  bookingDetailsError: string,
  bokingDetailsResponse: IBookingDetails[],

  isModifyBookingFetching: boolean,
  modifyBookingError: string

  isDeleteBookingFetching: boolean,
  deleteBookingError: string
}

export interface IDeleteBookingRequest {
  bookingId: string
}

export interface IModifyBooking {
  bookingId?: string,
  hotelId: string,
  checkInDate: Date,
  checkOutDate: Date,
  roomsBooked: number,
  guests: number,
  action: string,
}

export interface IBookingDetails {
  id: string
  hotel_id: string
  no_guests: number
  no_rooms_booked: number
  action: string
  check_in_at: Date
  check_out_at: Date
  created_at: Date
  modified_at: Date | null
}

export function createAction<T extends string, P>(type: T, payload?: P): AnyAction {
  return payload === undefined ? { type } : { type, payload };
}

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;


export interface IStore {
  common: IReducerInitialState;
}


export interface ISagaPayload<PayloadType = {}> {
  type: string;
  payload?: PayloadType;
}