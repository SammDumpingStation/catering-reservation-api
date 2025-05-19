import { JwtPayload } from "jsonwebtoken";
import { ICustomer } from "./customer.type.js";

export type SignUpProps = (data: {
  fullName: string;
  email: string;
  password: string;
}) => Promise<{ customer: ICustomer }>;

export interface IDecodedAccessToken extends JwtPayload {
  customerId: string;
  role: string;
  email: string;
}

export interface IDecodedRefreshToken extends IDecodedAccessToken {
  customerId: string;
  email: string;
  role: string;
  fullName: string;
  contactNumber: string;
}
