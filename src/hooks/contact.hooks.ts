import emailJs from "@emailjs/browser";
import conf from "../conf/conf";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tablesDB } from "../conf/appwriteConfig";
import { ID } from "appwrite";

interface ContactEmailTemplateParams {
  name: string;
  email: string;
  message: string;
}

export const useSendEmail = () => {
  const {
    mutate: sendEmail,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (templateParams: ContactEmailTemplateParams) => {
      await tablesDB.createRow({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.contact,
        rowId: ID.unique(),
        data: templateParams,
      });

      const resp = await emailJs.send(
        conf.emailJs.serviceId,
        conf.emailJs.templateId,
        templateParams as any,
        {
          publicKey: conf.emailJs.publicKey,
        }
      );

      if (resp.status !== 200) {
        throw new Error(resp.text);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Email sent successfully!");
    },
  });

  return { sendEmail, isPending, isSuccess };
};
