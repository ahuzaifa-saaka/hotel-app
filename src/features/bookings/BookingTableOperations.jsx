import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import BookingForm from "./BookingForm";

const SearchInput = styled.input`
  border: 1px solid var(--color-grey-200);
  background: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0 1rem;
  height: 4rem;
  min-width: 16rem;
  flex: 1 1 16rem;
  font-size: 1.3rem;
  color: var(--color-grey-800);
  box-shadow: var(--shadow-sm);
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

function BookingTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";

  function handleSearchChange(event) {
    const value = event.target.value;
    if (value) searchParams.set("search", value);
    else searchParams.delete("search");
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <TableOperations>
      <Group>
        <SearchInput
          type="search"
          value={searchValue}
          placeholder="Search by guest name..."
          onChange={handleSearchChange}
        />

        <Filter
          filteredField="status"
          options={[
            { value: "all", label: "All" },
            { value: "checked-out", label: "Checked out" },
            { value: "checked-in", label: "Checked in" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]}
        />

        <SortBy
          options={[
            { value: "startDate-desc", label: "Sort by date (recent first)" },
            { value: "startDate-asc", label: "Sort by date (earlier first)" },
            {
              value: "totalPrice-desc",
              label: "Sort by amount (high first)",
            },
            { value: "totalPrice-asc", label: "Sort by amount (low first)" },
          ]}
        />

        <Modal>
          <Modal.Open opens="booking-form">
            <Button size="small">Add booking</Button>
          </Modal.Open>

          <Modal.Window name="booking-form">
            <BookingForm />
          </Modal.Window>
        </Modal>
      </Group>
    </TableOperations>
  );
}

export default BookingTableOperations;
