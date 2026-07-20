import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: Checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        Status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was error while checking out"),
  });
  return { Checkout, isCheckingOut };
}
