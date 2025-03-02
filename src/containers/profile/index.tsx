import { Fragment, useEffect, useState } from "react";
import "../../assets/common.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteBookingRequest, getBookingDetailsRequest, hotelListRequest, modifyBookingRequest } from "../../action";
import { IBookingDetails, IStore } from "../../utils/types";

import { ProfileCard } from "../../components/profile/card";
import { PreviewComponent } from "../../components/profile/previewModal";
const ProfileComponent = () => {

  const dispatch = useDispatch();

  const hotelList = useSelector((state: IStore) => state.common.bokingDetailsResponse);
  const hotelListRespose = useSelector((state: IStore) => state.common.hotelListRespose)
  const [showPreview, setPreview] = useState('');
  useEffect(() => {
    dispatch(getBookingDetailsRequest());
    dispatch(hotelListRequest());

  }, [dispatch])

  console.log(hotelList)

  const updateBooking = (action: string, element: IBookingDetails, checkIn?: Date | null, checkOut?: Date | null, guestCount?: number, roomCount?: number) => {
    dispatch(modifyBookingRequest({
      action,
      checkInDate: checkIn || element.check_in_at,
      checkOutDate: checkOut || element.check_out_at,
      guests: guestCount || element.no_guests,
      roomsBooked: roomCount || element.no_rooms_booked,
      hotelId: element.hotel_id,
      bookingId: element.id
    }))
  }

  return (<div className="profile">
    {hotelList.filter(it => it.action === 'booked').map((it, index) => {
      const hotelDetails = hotelListRespose.find((hIt) => hIt.id === it.hotel_id);
      return (<Fragment key={it.id}>
        <ProfileCard element={it} hotelDetails={hotelDetails} callBack={() => { setPreview(it.id) }} />
        {showPreview === it.id &&
          <PreviewComponent
            key={Math.random()}
            hotelDetails={hotelDetails}
            element={it}
            setShow={() => setPreview('')}
            show={!!showPreview}
            cancelCallBack={() => {
              updateBooking('canceled', it);
              setPreview('')
            }}
            callBack={(checkIn: Date | null, checkOut: Date | null, guestCount: number,
              roomCount: number) => {
              console.log(checkIn, checkOut)
              updateBooking('booked', it, checkIn, checkOut, guestCount, roomCount);
              setPreview('');
            }}
          />}
      </Fragment>
      )
    })}

    {hotelList.filter(it => it.action === 'canceled').map((it) => {
      const hotelDetails = hotelListRespose.find((hIt) => hIt.id === it.hotel_id);
      return (
        <Fragment key={it.id}>
          <ProfileCard
            element={it}
            hotelDetails={hotelDetails}
            key={it.id}
            callBack={() => { console.log('triggered') }}
            deleteCallBack={() => {
              dispatch(deleteBookingRequest({ bookingId: it.id }))
            }}
            customClass='card-warning' />
        </Fragment>
      )
    })}

  </div>)
}

export default ProfileComponent;