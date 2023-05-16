type SignInAuthLayoutProps = {
  children: React.ReactNode;
};

export default function SignInAuthLayout({ children }: SignInAuthLayoutProps) {
  return <div className="min-h-screen">{children}</div>;
}
