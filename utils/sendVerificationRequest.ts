import { resend } from '@/lib/resend'
import MagicLinkEmail from '@/app/(main)/_components/auth/ReactEmail'

interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  provider: string;
  theme: string;
}

interface EmailData {
  from: string;
  to: string[];
  subject: string;
  text: string;
  react: React.ReactNode; // Assuming MagicLinkEmail returns a ReactNode
}

export async function sendVerificationRequest(params: SendVerificationRequestParams): Promise<{ success: boolean; data: any }> {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  try {
    const data = await resend.emails.send({
      from: 'FlairNow <onboarding@resend.dev>',
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host }),
    } as EmailData); // Assert the type for the email data
    return { success: true, data };
  } catch (error) {
    throw new Error('Failed to send the verification Email.');
  }
}

interface TextParams {
  url: string;
  host: string;
}

function text({ url, host }: TextParams): string {
  return `Sign in to ${host}\n${url}\n\n`;
}