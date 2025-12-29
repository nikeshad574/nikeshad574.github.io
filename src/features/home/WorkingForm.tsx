import { useCallback, useEffect, useState, type FormEventHandler } from "react";
import GlowingButton from "../../components/GlowingButton";
import { useSendEmail } from "../../hooks/contact.hooks";
import { Loader2 } from "lucide-react";

interface SingleInputData<T> {
  value: T;
  error?: string;
}

interface FormValueInputs {
  name: SingleInputData<string>;
  email: SingleInputData<string>;
  message: SingleInputData<string>;
}

function WorkingForm() {
  const {
    sendEmail,
    isPending: isSendingEmail,
    isSuccess: isSuccessSendingEmail,
  } = useSendEmail();

  const [values, setValues] = useState<FormValueInputs>({
    name: { value: "" },
    email: { value: "" },
    message: { value: "" },
  });

  const register = useCallback(
    (fieldName: string, validation: Record<string, string | string[]>) => ({
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        if (validation.required && e.target.value.trim() === "") {
          setValues((prev) => ({
            ...prev,
            [fieldName]: {
              value: e.target.value,
              error: validation.required,
            },
          }));
          return;
        }

        if (validation.pattern) {
          const pattern = new RegExp(validation.pattern[0]);
          if (!pattern.test(e.target.value)) {
            setValues((prev) => ({
              ...prev,
              [fieldName]: {
                value: e.target.value,
                error: validation.pattern[1] || "Invalid format",
              },
            }));
            return;
          }
        }

        setValues((prev) => ({
          ...prev,
          [fieldName]: { value: e.target.value },
        }));
      },
      id: fieldName,
      name: fieldName,
      value: values[fieldName as keyof FormValueInputs].value,
    }),
    [values]
  );

  const handleForm: FormEventHandler = (e) => {
    e.preventDefault();

    const errorExist = Object.values(values).some((field) => field.error);
    if (errorExist) {
      return;
    }
    sendEmail({
      name: values.name.value,
      email: values.email.value,
      message: values.message.value,
    });
  };

  useEffect(() => {
    if (!isSendingEmail && isSuccessSendingEmail) {
      setValues({
        name: { value: "" },
        email: { value: "" },
        message: { value: "" },
      });
    }
  }, [isSendingEmail]);

  return (
    <form onSubmit={handleForm} className="flex-1/2 flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium">
          Name *
        </label>
        <input
          type="text"
          className="outline focus:outline-primary-400 rounded-md px-2 py-1"
          disabled={isSendingEmail}
          {...register("name", { required: "Name is required" })}
        />
        {values.name.error && (
          <span className="text-red-700 text-sm">{values.name.error}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email *
        </label>
        <input
          type="email"
          className="outline focus:outline-primary-400 rounded-md px-2 py-1"
          disabled={isSendingEmail}
          {...register("email", {
            required: "Email is required",
            pattern: [
              "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              "Invalid email address",
            ],
          })}
        />
        {values.email.error && (
          <span className="text-red-700 text-sm">{values.email.error}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="font-medium">
          Message *
        </label>
        <textarea
          className="outline focus:outline-primary-400 rounded-md px-2 py-1 h-32 resize-none"
          disabled={isSendingEmail}
          {...register("message", {
            required: "Message is required",
            pattern: [
              "^.{10,}$",
              "Message must be at least 10 characters long",
            ],
          })}
        />
        {values.message.error && (
          <span className="text-red-700 text-sm">{values.message.error}</span>
        )}
      </div>

      <div className="flex justify-end">
        <GlowingButton
          onClick={() => console.log("clicked")}
          className="w-fit px-6 py-2 font-medium text-md"
          disabled={isSendingEmail}
        >
          Get In Touch
          {isSendingEmail && <Loader2 className="h-4 w-4 animate-spin" />}
        </GlowingButton>
      </div>
    </form>
  );
}

export default WorkingForm;
