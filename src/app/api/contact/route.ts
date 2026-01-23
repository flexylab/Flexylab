import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/api-middleware';
import { logSecurityEvent, logSecurityError } from '@/lib/audit-log';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ContactFormSchema.parse(body);

    // Sanitize inputs
    const sanitized = {
      name: sanitizeInput(validated.name),
      email: validated.email.toLowerCase(),
      subject: sanitizeInput(validated.subject),
      message: sanitizeInput(validated.message),
    };

    logSecurityEvent('CONTACT_FORM_SUBMITTED', undefined, sanitized.email, { subject: sanitized.subject });

    // Send email to company
    const result = await resend.emails.send({
      from: 'Flexylab <noreply@flexylab.shop>',
      to: 'flexylab@flexylab.shop',
      replyTo: sanitized.email,
      subject: `New Contact Form: ${sanitized.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #06b6d4;">New Message from Flexylab Contact Form</h2>
          
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitized.name}</p>
            <p><strong>Email:</strong> ${sanitized.email}</p>
            <p><strong>Subject:</strong> ${sanitized.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${sanitized.message}</p>
          </div>

          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This is an automated email from Flexylab Contact Form.
          </p>
        </div>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Flexylab <noreply@flexylab.shop>',
      to: sanitized.email,
      subject: 'We received your message - Flexylab',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #06b6d4;">Thank you for contacting Flexylab!</h2>
          
          <p>Hi ${sanitized.name},</p>
          
          <p>We've received your message and will get back to you as soon as possible. Our team typically responds within 2-4 business hours.</p>
          
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message Summary:</strong></p>
            <p><strong>Subject:</strong> ${sanitized.subject}</p>
          </div>

          <p>Best regards,<br/>The Flexylab Team</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! We will be in touch soon.' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    logSecurityError('CONTACT_FORM_ERROR', error.message, undefined, undefined);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
