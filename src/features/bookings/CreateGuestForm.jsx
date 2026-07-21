import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateGuest } from "./useCreateGuest";

export function CreateGuestForm({ onCloseModal, onCreated }) {
  const { isCreating, createGuest } = useCreateGuest();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    createGuest(data, {
      onSuccess: (guest) => {
        reset();
        onCreated?.(guest);
        onCloseModal?.();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          {...register("fullName", {
            required: "Guest name is required",
          })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="button"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? "Creating..." : "Create guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
