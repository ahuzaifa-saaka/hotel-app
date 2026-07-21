import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings";

export function useEditBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editBooking } = useMutation({
    mutationFn: ({ id, updated }) => createEditBooking(updated, id),
    onSuccess: () => {
      toast.success("Booking successfully updated");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBooking };
}

export default useEditBooking;
