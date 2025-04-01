export type signUpProps = {
  fullName: string;
  email: string;
  password: string;
  role: "customer" | "caterer";
};

export type signInProps = {
  email: string;
  password: string;
};
