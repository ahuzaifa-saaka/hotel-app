import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createGuestMutation } = useMutation({
    mutationFn: (guest) => createGuest(guest),
    onSuccess: () => {
      toast.success("New guest created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createGuest: createGuestMutation };
}

export default useCreateGuest;
