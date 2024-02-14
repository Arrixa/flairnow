import { MagicLinkEmail } from '@/app/(main)/_components/auth/ReactEmail'
import { createTransport } from "nodemailer"
import { render } from '@react-email/render';
import { SendVerificationRequestParams, TextParams } from '@/lib/interfaces';


export async function sendVerificationRequest(params: SendVerificationRequestParams): Promise<{ success: boolean; data: any }> {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);
  const emailHtml = render(MagicLinkEmail({ url, host }));

  try {
    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
      from: 'FlairNow <tamlyn.springer@arrixa.com>',
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      html: emailHtml,
    }); 
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, data: error };
  }
}

function text({ url, host }: TextParams): string {
  return `Sign in to ${host}\n${url}\n\n`;
}
