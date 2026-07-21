import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Form from "../../ui/Form";
import Heading from "../../ui/Heading";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "./useGuests";
import { useCreateGuest } from "./useCreateGuest";
import { useCreateBooking } from "./useCreateBooking";
import { useEditBooking } from "./useEditBooking";

export function BookingForm({ bookingToEdit = {}, onCloseModal } = {}) {
  const { isCreating, createBooking } = useCreateBooking();
  const { isEditing, editBooking } = useEditBooking();

  const isEdit = Boolean(bookingToEdit?.id);
  const { cabins } = useCabins();
  const { guests, isLoading: areGuestsLoading } = useGuests();
  const { isCreating: isCreatingGuest, createGuest } = useCreateGuest();

  const { register, handleSubmit, reset, formState, control, watch } = useForm({
    defaultValues: isEdit ? bookingToEdit : {},
  });
  const { errors } = formState;

  const startDate = watch("startDate");

  // Reset form whenever the booking being edited changes,
  // since the same modal/form instance can be reused for different rows
  useEffect(() => {
    if (isEdit) reset(bookingToEdit);
  }, [bookingToEdit, isEdit, reset]);

  function onSubmit(data) {
    const base = {
      cabinId: data.cabinId,
      startDate: data.startDate,
      endDate: data.endDate,
      numNight: Number(data.numNight || 1),
      numGuest: Number(data.numGuest || 1),
      totalPrice: Number(data.totalPrice || 0),
      Status: isEdit ? bookingToEdit.Status : "unconfirmed",
    };

    if (isEdit) {
      const payload = { ...base, guestId: data.guestId };
      editBooking(
        { id: bookingToEdit.id, updated: payload },
        {
          onSuccess: () => onCloseModal?.(),
        },
      );
      return;
    }

    // Create mode: if user provided a new guest name, create the guest first
    if (data.guestName) {
      createGuest(
        { fullName: data.guestName },
        {
          onSuccess: (guest) => {
            const payload = { ...base, guestId: guest.id };
            createBooking(payload, {
              onSuccess: () => {
                reset();
                onCloseModal?.();
              },
            });
          },
        },
      );
      return;
    }

    // Fallback: if no guestName provided but guestId exists (edge case), use it
    const payload = { ...base, guestId: data.guestId };
    createBooking(payload, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading
        as="h2"
        style={{
          textAlign: "center",
          color: "var(--color-brand-600)",
          marginBottom: "1rem",
        }}
      >
        {isEdit ? "Edit booking" : "Create new booking"}
      </Heading>

      <FormRow
        label="Guest name"
        error={isEdit ? errors?.guestId?.message : errors?.guestName?.message}
      >
        {isEdit ? (
          <Controller
            control={control}
            name="guestId"
            rules={{ required: "Guest is required" }}
            render={({ field }) => (
              <Select
                placeholder="Select guest"
                options={(guests || []).map((g) => ({
                  value: g.id,
                  label: g.fullName,
                }))}
                disabled={areGuestsLoading}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        ) : (
          <Input
            type="text"
            placeholder="Enter guest full name"
            {...register("guestName", { required: "Guest name is required" })}
          />
        )}
      </FormRow>

      <FormRow label="Cabin" error={errors?.cabinId?.message}>
        <Controller
          control={control}
          name="cabinId"
          rules={{ required: "Cabin is required" }}
          render={({ field }) => (
            <Select
              placeholder="Select cabin"
              options={(cabins || []).map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </FormRow>

      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          placeholder="Select start date"
          {...register("startDate", { required: "Start date is required" })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          placeholder="Select end date"
          {...register("endDate", {
            required: "End date is required",
            validate: (value) => {
              if (!startDate) return true;
              return (
                new Date(value) >= new Date(startDate) ||
                "End date must be after start date"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Nights" error={errors?.numNight?.message}>
        <Input
          type="number"
          placeholder="Number of nights"
          {...register("numNight", {
            min: { value: 1, message: "Nights must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuest?.message}>
        <Input
          type="number"
          placeholder="Number of guests"
          {...register("numGuest", {
            min: { value: 1, message: "Guests must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Total price" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          placeholder="Total price"
          {...register("totalPrice", {
            min: { value: 0, message: "Total must be at least 0" },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing || isCreatingGuest}>
          {isEdit
            ? "Save changes"
            : isCreatingGuest
              ? "Creating guest..."
              : "Create booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default BookingForm;
