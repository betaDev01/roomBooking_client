import { Button, Container, Dropdown, Form } from "react-bootstrap"

import "../../assets/common.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hotelListRequest, modifyBookingRequest } from "../../action"
import { IHotelListResponse, IModifyBooking, IStore } from "../../utils/types"
import DatePicker from "react-datepicker";
import Alert from 'react-bootstrap/Alert';

import "react-datepicker/dist/react-datepicker.css";
const Dashboard = () => {

  const [filterLocation, setFilterLocation] = useState('')
  const [location, setLocation] = useState<IHotelListResponse | null>(null);

  const [chekIn, setCheckIn] = useState<Date | null>(null);
  const [chekOut, setChekOut] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [roomCount, setRoom] = useState<number>(0);


  const [isError, setError] = useState(false);
  const hotelListRespose = useSelector((state: IStore) => state.common.hotelListRespose)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hotelListRequest())
  }, []);

  const resetStates = () => {
    setChekOut(null);
    setCheckIn(null);
    setGuestCount(0);
    setRoom(0);
    setLocation(null);
    setFilterLocation('');
  }
  const bookHotel = () => {
    console.log('clicked')
    const isError = [location, chekIn, chekOut, guestCount, roomCount].filter((it) => !it).length > 0;
    if (isError) {
      setError(true);
    } else {
      const payload: IModifyBooking = {
        action: 'booked',
        checkInDate: chekIn || new Date(),
        checkOutDate: chekOut || new Date(),
        guests: guestCount,
        roomsBooked: roomCount,
        hotelId: location?.id || ''
      }
      dispatch(modifyBookingRequest(payload));
      resetStates()
    }
  }

  return (
    <Container fluid className="container-class">
      <div className="child-container">
        <div className="child-ele">
          <>Select Location</>
          <Dropdown className="p-10">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {filterLocation || 'Location'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {hotelListRespose.map((it, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    active={it.location === filterLocation}
                    onClick={() => {
                      setError(false);
                      setRoom(0);
                      setGuestCount(0);
                      setFilterLocation(it.location);
                    }}
                  >
                    {it.location}
                  </Dropdown.Item>)
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="child-ele">
          <>Select Hotel</>
          <Dropdown className="p-10">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {location ? location?.hotel_name : 'Hotel'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {hotelListRespose.filter(fIt => fIt.location === filterLocation).map((it, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    active={it.id === location?.id}
                    onClick={() => {
                      setError(false);
                      setRoom(0);
                      setGuestCount(0);
                      setLocation(it);
                    }}
                  >
                    {it.hotel_name}
                  </Dropdown.Item>)
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>


        <div className="child-ele">
          <>CheckIn Date</>
          <DatePicker selected={chekIn} maxDate={chekOut || undefined} minDate={new Date()} placeholderText="MM/DD/YYYY" onChange={(date: Date | null) => {
            setCheckIn(date)
            setError(false);

          }} />
        </div>
        <div className="child-ele">
          <>CheckOut Date</>
          <DatePicker selected={chekOut} minDate={chekIn || undefined} placeholderText="MM/DD/YYYY" onChange={(date: Date | null) => {
            setError(false);
            setChekOut(date)
          }} />
        </div>


        <div className="child-ele">
          <>No of Guests</>
          <Form>
            <Form.Control type="text" onChange={(e) => {
              const value = e.target.value;
              setError(false);

              if (/^\d*$/.test(value)) {
                const availRooms = location?.available_rooms || 0;
                if (Number(value) <= (availRooms * 3)) {
                  setGuestCount(Number(value))
                }
              }

            }} value={guestCount} />
          </Form>
          <>Max {(location?.available_rooms || 0) * 3} Guest</>
        </div>

        <div className="child-ele">
          <>No of Rooms</>
          <Form>
            <Form.Control type="text" onChange={(e) => {
              setError(false);
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                const availRooms = location?.available_rooms || 0;

                if (Number(value) < availRooms) {
                  setRoom(Number(value))
                }
              }
            }} value={roomCount} />
          </Form>
          <>Max {location?.available_rooms || 0} Rooms</>

        </div>
        <div>
          <Button onClick={bookHotel}> Book Hotel</Button>
          <Button onClick={resetStates} variant="danger"> Reset</Button>
        </div>
        {isError ? <Alert variant={'warning'} onClose={() => setError(false)}>
          Please Fill out all the felds
        </Alert> : null}
      </div>
    </Container>
  )
}

export default Dashboard