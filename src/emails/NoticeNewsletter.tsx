import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Img,
} from '@react-email/components';

interface NoticeEmailProps {
  title: string;
  content: string;
  publishedIn: string;
  publisherName: string;
  publisherPosition: string;
}

export default function NoticeEmail({
  title,
  content,
  publishedIn,
  publisherName,
  publisherPosition,
}: NoticeEmailProps) {
  const formattedDate = new Date(publishedIn).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>{title}</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{title} - Published on {formattedDate}</Preview>
      <Section style={{ padding: '20px' }}>
        <Row>
          <Heading as="h2">{title}</Heading>
        </Row>
        <Row>
          <Text dangerouslySetInnerHTML={{ __html: content }} />
      </Row>
        <Row>
          <Text>
            Published on <strong>{formattedDate}</strong> by{' '}
            <strong>{publisherName}</strong> ({publisherPosition})
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
