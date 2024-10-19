"use client";

import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/type";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function FormContainer({
  action,
  children,
}: {
  children: React.ReactNode;
  action: actionFunction;
}) {
  //useFormState(this is use to show the message on screen )
  //1) state its is come from initialstae or when the function return value store in state
  //2)FormAction it is use to set on action of form
  //3)action it is the function for example our action is in this is CreateProduct which we pass with the name
  //4)initialState

  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
      });
    }
  }, [state.message]);
  return <form action={formAction}>{children}</form>;
}
