import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const {
    isLoading,
    data: guests,
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
    staleTime: 1000 * 60 * 5,
  });

  return { isLoading, guests, error };
}

export default useGuests;
