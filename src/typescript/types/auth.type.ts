import { JwtPayload } from "jsonwebtoken";
import { CustomerProps } from "./customer.type.js";

export type SignUpProps = (data: {
  fullName: string;
  email: string;
  password: string;
}) => Promise<{ customer: CustomerProps }>;

export interface DecodedToken extends JwtPayload {
  customerId: string;
  role: string;
}
