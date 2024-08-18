import * as React from "react";

interface VerificationUserProps {
  code: string;
}

export const VerificationUser: React.FC<Readonly<VerificationUserProps>> = ({ code }) => (
  <div>
    <h1>
      Код подтверждения: <b>{code}</b>
    </h1>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить свою почту</a>
    </p>
  </div>
);
