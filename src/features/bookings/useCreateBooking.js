import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createBooking } = useMutation({
    mutationFn: (newBooking) => createEditBooking(newBooking),
    onSuccess: (data) => {
      toast.success("New booking successfully created");
      try {
        queryClient.setQueriesData({ queryKey: ["bookings"] }, (old) => {
          if (!old) return old;
          // old expected shape: { data: bookingsArray, count }
          if (old.data && Array.isArray(old.data)) {
            return {
              ...old,
              data: [data, ...old.data],
              count: (old.count || 0) + 1,
            };
          }
          return old;
        });
      } catch (e) {
        // ignore cache update errors
      }
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBooking };
}

export default useCreateBooking;
