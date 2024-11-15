import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen md:w-1/2 mx-auto">
      <div className="w-2/3 p-2">{children}</div>
    </div>
  );
};

export default AuthLayout;
