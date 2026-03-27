import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateContact } from "../services/apiContact";
import toast from "react-hot-toast";
import handleAxiosError from "../utils/commonUtils";

export const contactQueryKeys = {
  base: "contact",
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createContact,
    isPending: isCreatingContact,
    isSuccess: isSuccessCreatingContact,
    reset: resetCreateContact,
  } = useMutation({
    mutationFn: apiCreateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [contactQueryKeys.base] });
      toast.success("Message sent successfully!");
    },
    onError: (err) => {
      toast.error(handleAxiosError(err));
    },
  });

  return {
    createContact,
    isCreatingContact,
    isSuccessCreatingContact,
    resetCreateContact,
  };
};
