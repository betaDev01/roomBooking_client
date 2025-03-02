
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { IBookingDetails, IHotelListResponse } from '../../utils/types';
import { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface IProfileCardProps {
  hotelDetails?: IHotelListResponse,
  element: IBookingDetails;
  customClass?: string
  show: boolean;
  setShow: () => void;
  callBack: (chekIn: Date | null, chekOut: Date | null,
    guestCount: number,
    roomCount: number
  ) => void;
  cancelCallBack?: () => void;
}

export const PreviewComponent = ({ hotelDetails, element, show, setShow, callBack, cancelCallBack }: IProfileCardProps) => {
  const [chekIn, setCheckIn] = useState<Date | null>(null);
  const [chekOut, setChekOut] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [roomCount, setRoom] = useState<number>(0);

  useEffect(() => {
    setCheckIn(element.check_in_at)
    setChekOut(element.check_out_at)
    setGuestCount(element.no_guests)
    setRoom(element.no_rooms_booked)
  }, [element.check_out_at, element.check_in_at, element.no_rooms_booked, element.no_guests]);

  return (
    <Modal show={show} >
      <Modal.Header>
        <Modal.Title>{hotelDetails?.hotel_name} - {hotelDetails?.location}</Modal.Title>
      </Modal.Header>

      <Modal.Body className='d-flux'>
        <div>
          Check IN
          <DatePicker selected={chekIn} maxDate={chekOut || undefined} minDate={new Date()} placeholderText="MM/DD/YYYY" onChange={(date: Date | null) => {
            setCheckIn(date)
          }} />
        </div>
        <div>
          Check Out
          <DatePicker selected={chekOut} minDate={chekIn || new Date()} placeholderText="MM/DD/YYYY" onChange={(date: Date | null) => {
            setChekOut(date)
          }} />
        </div>
        <div className='d-flux'>
          <div className="child-ele">
            <>No of Guests</>
            <Form>
              <Form.Control type="text" onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  const availRooms = hotelDetails?.available_rooms || 0;
                  if (Number(value) <= (availRooms * 3)) {
                    setGuestCount(Number(value))
                  }
                }

              }} value={guestCount} />
            </Form>
            <span className="notify-count">Max {(hotelDetails?.available_rooms || 0) * 3} Guest</span>
          </div>

          <div className="child-ele">
            <>No of Rooms</>
            <Form>
              <Form.Control type="text" onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  const availRooms = hotelDetails?.available_rooms || 0;

                  if (Number(value) <= availRooms) {
                    setRoom(Number(value))
                  }
                }
              }} value={roomCount} />
            </Form>
            <span className="notify-count">Max {hotelDetails?.available_rooms || 0} Rooms</span>

          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={setShow}>Close</Button>
        <Button className="dropdown-custom" onClick={() => callBack(
          chekIn,
          chekOut,
          guestCount,
          roomCount)
        }>Save changes</Button>
        <Button variant="danger" onClick={cancelCallBack}>Cancel Booking</Button>

      </Modal.Footer>
    </Modal>

  )
}