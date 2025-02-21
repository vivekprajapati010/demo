import { ToastOptions } from "react-toastify";

export interface UserData {
  email?: string;
  password?: string;
  fullName?: string;
  confirmPassword?: string;
  mobile?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
}
export interface ProductDialogState {
  isOpen: boolean;
  record: Product | null;
}
export type ToasterType = "default" | "error" | "success" | "information";
export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ShowToasterOptions {
  message: string | null | undefined;
  type?: "default" | "error" | "success" | "information";
  position?: ToastOptions["position"];
  timeSpan?: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: string;
  category: string;
}
