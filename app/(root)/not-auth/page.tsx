import { InfoBlock } from "@/components/shared";

export default function UnauthorizedPage() {
  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      <InfoBlock imageUrl="/assets/images/lock.png" text="Вам необходимо войти в аккаунт" title="Доступ запрещен" />
    </div>
  );
}
