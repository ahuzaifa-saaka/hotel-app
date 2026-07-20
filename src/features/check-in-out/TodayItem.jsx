import styled from "styled-components";
import React from "react";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import { Link } from "react-router-dom";
// import CheckInButton from "../../ui/CheckInButton";
import { Flag } from "../../ui/Flag";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const { id, Status, status, guests, numNights, numNight } = activity;
  const currentStatus = Status ?? status;
  const nights = numNights ?? numNight ?? 0;

  return (
    <StyledTodayItem>
      {currentStatus === "unconfirmed" && <Tag type="green">Arriving</Tag>}

      {currentStatus === "checked-in" && <Tag type="blue">Checked In</Tag>}

      <Flag src={guests?.countryFlag} alt={`Flag of ${guests?.country}`} />

      <Guest>{guests?.fullName ?? "Guest"}</Guest>
      <div>{nights} nights</div>

      {currentStatus === "checked-in" && (
        <Button size="small" variant="primary" as={Link} to={`/checkin/${id}`}>
          Checked In
        </Button>
      )}
    </StyledTodayItem>
  );
}
