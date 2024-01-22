import { FC } from "react";
import { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const page: FC<layoutProps> = ({ children }: layoutProps) => {
  return <div>Dashboard Page</div>;
};

export default page;
