export interface EmailTemplateData {
  recipientName: string;
  eventName?: string;
  teamName?: string;
  role?: string;
  invoiceNumber?: string;
  amount?: string;
  transactionId?: string;
  certificateNumber?: string;
  actionUrl?: string;
}

const baseLayout = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
    .logo { font-size: 22px; font-weight: 900; color: #7c3aed; margin-bottom: 24px; text-transform: uppercase; tracking: -0.5px; }
    .badge { background: #f3e8ff; color: #6b21a8; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
    h1 { font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 16px; margin-bottom: 12px; }
    p { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 12px; }
    .footer { border-top: 1px solid #f1f5f9; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">🚀 Kernel Overriders Platform</div>
    ${content}
    <div class="footer">
      &copy; 2026 Kernel Overriders Tech Community. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const emailTemplates = {
  REGISTRATION_SUCCESS: (d: EmailTemplateData) => baseLayout(`
    <span class="badge">REGISTRATION CONFIRMED</span>
    <h1>Welcome to ${d.eventName || 'Kernel Overriders Event'}!</h1>
    <p>Hi ${d.recipientName}, your team registration has been successfully confirmed. You can now build, form teams, and submit your innovation.</p>
    <a href="${d.actionUrl || 'https://kernel-overriders.vercel.app/'}" class="btn">View Event Portal</a>
  `),

  PAYMENT_SUCCESS: (d: EmailTemplateData) => baseLayout(`
    <span class="badge">PAYMENT RECEIVED</span>
    <h1>Payment Invoice #${d.invoiceNumber || 'INV-2026'}</h1>
    <p>Hi ${d.recipientName}, we have received your payment for ${d.eventName || 'Kernel Overriders Competition'}.</p>
    <p><strong>Transaction ID:</strong> ${d.transactionId || 'TX-984210'}</p>
  `),

  TEAM_JOINED: (d: EmailTemplateData) => baseLayout(`
    <span class="badge">TEAM ROSTER UPDATE</span>
    <h1>Joined Team ${d.teamName}!</h1>
    <p>Hi ${d.recipientName}, you have officially joined team <strong>${d.teamName}</strong> as a ${d.role || 'Member'}.</p>
  `),

  SUBMISSION_RECEIVED: (d: EmailTemplateData) => baseLayout(`
    <span class="badge">SUBMISSION CONFIRMED</span>
    <h1>Project Submitted Successfully</h1>
    <p>Hi ${d.recipientName}, your project submission for ${d.eventName} has been successfully recorded on the Kernel Overriders ledger.</p>
  `),

  WINNER_ANNOUNCEMENT: (d: EmailTemplateData) => baseLayout(`
    <span class="badge">WINNER DECLARATION</span>
    <h1>Official Winner Results Declared!</h1>
    <p>The official contest leaderboard and prize winners for ${d.eventName} have been published!</p>
  `),

  CERTIFICATE_ISSUED: (d: EmailTemplateData) => baseLayout(`
    <span class="badge">VERIFIED CREDENTIAL</span>
    <h1>Your Certificate is Ready!</h1>
    <p>Hi ${d.recipientName}, your digital certificate of accomplishment for ${d.eventName} has been issued.</p>
  `),
};
