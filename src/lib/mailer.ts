import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadEmailData {
  name: string;
  email: string;
  budget: string;
  projectDetails: string;
  source: string;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const { error } = await resend.emails.send({
    from: `RISORIX Leads <${process.env.FROM_EMAIL}>`,
    to: process.env.NOTIFY_EMAIL!,
    subject: `New Lead — ${lead.name} (${lead.budget})`,
    html: `<!DOCTYPE html>
<html>
  <body style="font-family:sans-serif;background:#0f0f0f;color:#fff;padding:32px;margin:0;">
    <div style="max-width:560px;margin:0 auto;background:#1a1a1a;border-radius:16px;padding:32px;border:1px solid #2a2a2a;">

      <h2 style="margin:0 0 8px;font-size:22px;color:#fff;">New Lead Received</h2>
      <p style="margin:0 0 24px;color:#888;font-size:14px;">Someone submitted a project inquiry on your website.</p>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#888;font-size:13px;width:130px;">Name</td>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;">${lead.name}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#888;font-size:13px;">Email</td>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;font-size:14px;">
            <a href="mailto:${lead.email}" style="color:#60a5fa;text-decoration:none;">${lead.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#888;font-size:13px;">Budget</td>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;">${lead.budget}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#888;font-size:13px;">Source</td>
          <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;">${lead.source}</td>
        </tr>
      </table>

      <div style="margin-top:24px;">
        <p style="margin:0 0 8px;color:#888;font-size:13px;">Project Details</p>
        <div style="background:#0f0f0f;border-radius:10px;padding:16px;color:#e5e5e5;font-size:14px;line-height:1.6;white-space:pre-wrap;">${lead.projectDetails}</div>
      </div>

      <div style="margin-top:24px;padding-top:24px;border-top:1px solid #2a2a2a;">
        <a href="mailto:${lead.email}" style="display:inline-block;background:#fff;color:#000;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">Reply to ${lead.name}</a>
      </div>

      <p style="margin:24px 0 0;color:#555;font-size:12px;">Sent by RISORIX · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>

    </div>
  </body>
</html>`,
  });

  if (error) {
    throw new Error(error.message);
  }
}