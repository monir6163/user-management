export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
