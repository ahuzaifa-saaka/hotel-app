import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import BookingForm from "../features/bookings/BookingForm";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
      </Row>

      <BookingTableOperations />

      <BookingTable />
    </>
  );
}

export default Bookings;
