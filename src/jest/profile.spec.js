import { render, screen, fireEvent } from "@testing-library/react";
import moment from "moment";
import { ProfileCard } from "../components/profile/card";
import { notToBeInTheDocument, toBeInTheDocument } from "../utils/jest_helper";

describe("ProfileCard Component", () => {
  const mockCallBack = jest.fn();

  const mockHotelDetails = {
    hotel_name: "Grand Hotel",
    location: "New York",
  };

  const mockBookingDetails = {
    id: "123",
    check_in_at: moment().toISOString(),
    check_out_at: moment().add(2, "days").toISOString(),
    no_guests: 2,
  };

  it("renders ProfileCard correctly with hotel details", () => {
    render(
      <ProfileCard
        hotelDetails={mockHotelDetails}
        element={mockBookingDetails}
        callBack={mockCallBack}
      />
    );

    toBeInTheDocument(`${mockHotelDetails.hotel_name} - (${mockHotelDetails.location})`);
    toBeInTheDocument(`No of guests ${mockBookingDetails.no_guests}`);
    toBeInTheDocument(`From : ${moment(mockBookingDetails.check_in_at).format("MMM DD, YYY")} - ${moment(mockBookingDetails.check_out_at).format("MMM DD, YYY")}`);
  });


  it("does not render Preview button when customClass is provided", () => {
    render(
      <ProfileCard
        hotelDetails={mockHotelDetails}
        element={mockBookingDetails}
        callBack={mockCallBack}
        customClass="some-class"
      />
    );

    expect(screen.queryByText("Preview")).not.toBeInTheDocument();

  });
});
