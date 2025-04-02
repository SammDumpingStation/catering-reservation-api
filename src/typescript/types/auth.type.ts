import { CustomerProps } from "./customer.type.js";

export type signUpProps = (data: {
  fullName: string;
  email: string;
  password: string;
}) => Promise<{ customer: CustomerProps }>;

export type signInProps = (data: {
  email: string;
  password: string;
}) => Promise<{
  customer: CustomerProps;
}>;
