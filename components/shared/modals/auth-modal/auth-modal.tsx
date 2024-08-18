"use client";

import { Button, Dialog, DialogContent } from "@/components/ui";
import { ShieldQuestion } from "lucide-react";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface AuthModalProps {
  onClose: VoidFunction;
  open: boolean;
}

export const AuthModal: FC<AuthModalProps> = ({ onClose, open }) => {
  const [type, setType] = useState<"login" | "register">("login");

  const handleClose = () => {
    onClose();
  };

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  return (
    <Dialog onOpenChange={handleClose} open={open}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? <LoginForm onClose={handleClose} /> : <RegisterForm />}
        <hr />
        <div className="flex gap-2">
          <Button
            className="h-12 flex-1 gap-2 p-2"
            onClick={() => {
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              });
            }}
            type="button"
            variant="secondary">
            <ShieldQuestion />
            GitHub
          </Button>

          <Button
            className="h-12 flex-1 gap-2 p-2"
            onClick={() => {
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              });
            }}
            type="button"
            variant="secondary">
            <ShieldQuestion />
            Google
          </Button>
        </div>

        <Button className="h-12" onClick={onSwitchType} type="button" variant="outline">
          {type === "login" ? "Регистрация" : "Вход"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
