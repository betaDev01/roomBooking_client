import { Button, Card } from "react-bootstrap"
import { IBookingDetails, IHotelListResponse } from "../../utils/types"
import moment from "moment"

interface IProfileCardProps {
  hotelDetails?: IHotelListResponse,
  element: IBookingDetails;
  customClass?: string
  callBack: () => void;
  deleteCallBack?: () => void;
}
export const ProfileCard = ({ hotelDetails, element, callBack, customClass, deleteCallBack }: IProfileCardProps) => {
  return (
    <Card key={element.id} className={`card ${customClass || ''}`}>
      <Card.Body className="card-body">
        <Card.Title>{hotelDetails?.hotel_name} - ({hotelDetails?.location})</Card.Title>
        <Card.Text>
          <span className="content">
            <span> From : {moment(element.check_in_at).format('MMM DD, YYY')} - {moment(element.check_out_at).format('MMM DD, YYY')}</span>
            <span>No of guests {element.no_guests}</span>
          </span>
        </Card.Text>
        <div>
          {!customClass && <Button className="dropdown-custom" onClick={callBack}>Preview</Button>}
          {customClass && <Button variant="danger" onClick={deleteCallBack}>Delete</Button>}
        </div>
      </Card.Body>
    </Card>
  )
}