import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Prevent prerendering of this API route
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name, verificationCode } = await request.json();

    console.log('📧 Sending email via Resend to:', email);

    if (!email || !name || !verificationCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await resend.emails.send({
      from: 'Flexylab <noreply@flexylab.shop>',
      to: email,
      subject: 'Verify your Flexylab account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Flexylab</h1>
          </div>
          
          <div style="background-color: #f8fafc; padding: 40px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Welcome to Flexylab!</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              Thank you for signing up with Flexylab. To complete your registration, please verify your email address by entering the code below:
            </p>
            
            <div style="background-color: white; border: 2px solid #06b6d4; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px;">
              <p style="color: #64748b; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase;">Verification Code</p>
              <p style="color: #06b6d4; font-size: 36px; letter-spacing: 8px; margin: 0; font-weight: bold; font-family: 'Courier New', monospace;">
                ${verificationCode}
              </p>
            </div>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              This code will expire in 24 hours.
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              If you didn't create an account with Flexylab, please ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
              © 2026 Flexylab. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ Email sent successfully:', response);

    return NextResponse.json(
      { success: true, message: 'Verification email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Resend error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
