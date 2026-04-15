export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}