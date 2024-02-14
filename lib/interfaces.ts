import nodemailer from "nodemailer"

export enum Role {
  OWNER,
  ADMIN,
  VIEWER,
  EMPLOYEE,
  RECRUITER,
  PEOPLE_MANAGER,
  HIRING_MANAGER,
  ONBOARDING_MANAGER,
  UNASSIGNED
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  clientId: string;
  clientUserId: string;
  expires: Date;
  user: User;
  client: Client;
  clientUser: ClientUser;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  emailVerified?: Date;
  password?: string;
  image?: string;
  userDomain?: string;
  accounts: Account[];
  sessions: Session[];
  client: ClientUser[];
}

export interface Client {
  id: string;
  domain: string;
  companyName?: string;
  logo?: string;
  website?: string;
  description?: string;
  countryCode?: string;
  phoneNumber?: string;
  streetNo?: string;
  streetAddress?: string;
  province?: string;
  zipCode?: string;
  country?: string;
  user: ClientUser[];
  sessions: Session[];
}

export interface ClientUser {
  id: string;
  client: Client;
  clientId: string;
  user: User;
  userId: string;
  role: Role[];
  sessions: Session[];
}

export interface SigninBtnProps {
  session?: Session | null, 
  onClick?: () => void;
}

export interface UserProps {
  session?: Session | null, 
  user?: User | null, 
  onClick?: () => void;
}

export interface FormData {
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserForm {
  session?: Session | null;
  formData: FormData;
}

export interface SidebarCompProps {
  userRoles: string[];
  session?: Session | null,
  onClick?: () => void;
}

export interface UserCardProps {
  session?: Session | null, 
  onClick?: () => void;
}

export interface UserInfo {
  user: User;
  formData: FormData;
}

export interface AdminProps {
  session?: Session | null, 
  onClick?: () => void;
}

export interface TextParams {
  url: string;
  host: string;
}

export interface RoleBadgeProps {
  role: string;
  index: number;
  roles: Role[] | undefined;
}

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
}

export interface Country {
  name: string;
  unicodeFlag: string;
  dialCode: string;
}

export interface CommandInputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CodeSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export interface FileInfo {
  name: string;
  preview: string;
}

export interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  provider: {
    server: nodemailer.TransportOptions;
    from: string;
    html: string;
  };
}
