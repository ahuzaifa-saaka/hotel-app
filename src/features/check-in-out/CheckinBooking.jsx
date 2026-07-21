import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  const { Checkin, isCheckingIn } = useCheckin();

  const { booking, isLoading } = useBooking();

  const { settings = {}, isLoading: isLoadingSetting } = useSettings();

  const moveBack = useMoveBack();

  useEffect(() => {
    if (booking) setConfirmPaid(booking.isPaid);
  }, [booking]);

  if (isLoading || isLoadingSetting) return <Spinner />;

  const bookingId = booking?.id;
  const guests = booking?.guests ?? {};
  const totalPrice = booking?.totalPrice ?? 0;
  const numGuest = booking?.numGuest ?? booking?.numGuests ?? 1;
  const numNight = booking?.numNight ?? booking?.numNights ?? 1;
  const hasBreakfast = booking?.hasBreakfast ?? false;

  const breakfastPrice = settings?.breakFastPrice ?? 0;
  const optionalBreakfastPrice = breakfastPrice * numNight * numGuest;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      Checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          ExtraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      Checkin({
        bookingId,
        breakfast: {},
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button
          variation="success"
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
