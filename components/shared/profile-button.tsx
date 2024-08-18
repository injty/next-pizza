import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui";

interface ProfileButtonProps {
  className?: string;
  handleClickSignIn?: VoidFunction;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ className, handleClickSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button className="flex items-center gap-3" onClick={handleClickSignIn} variant="outline">
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button className="flex items-center gap-3" variant="outline">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
