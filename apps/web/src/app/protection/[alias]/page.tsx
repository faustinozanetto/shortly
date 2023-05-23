import URLShortenerProtection from '@modules/url-shortener/components/protection/url-shortener-protection';

type LinkAccessPageProps = {
  params: {
    alias: string;
  };
};

export default function LinkAccessPage(props: LinkAccessPageProps) {
  const { params } = props;
  const { alias } = params;

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <URLShortenerProtection alias={alias} />
    </div>
  );
}
