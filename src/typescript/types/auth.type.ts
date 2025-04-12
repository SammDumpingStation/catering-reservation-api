import { JwtPayload } from "jsonwebtoken";
import { ICustomer } from "./customer.type.js";

export type SignUpProps = (data: {
  fullName: string;
  email: string;
  password: string;
}) => Promise<{ customer: ICustomer }>;

export interface IDecodedToken extends JwtPayload {
  customerId: string;
  role: string;
}
