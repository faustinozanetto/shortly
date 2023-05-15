import { BuiltInProviderType } from 'next-auth/providers';

export type AuthSignInOption = {
  provider: BuiltInProviderType;
  label: string;
  icon: JSX.Element;
};
