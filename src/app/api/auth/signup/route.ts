import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { SignupSchema } from '@/lib/validation';
import { generateToken } from '@/lib/jwt';
import { logSecurityEvent, logSecurityError } from '@/lib/audit-log';

export async function POST(request: NextRequest) {
  try {
    // Validate input
    const body = await request.json();
    const validated = SignupSchema.parse(body);
    
    await connectDB();

    // Check if email already exists
    const existingUser = await User.findOne({ email: validated.email.toLowerCase() });
    if (existingUser) {
      logSecurityError('SIGNUP_ATTEMPT', 'Email already exists', undefined, validated.email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Create new user
    const newUser = new User({
      email: validated.email.toLowerCase(),
      password: validated.password,
      name: validated.name,
      phone: validated.phone || '',
      isVerified: false,
      verificationCode,
    });

    await newUser.save();
    logSecurityEvent('USER_SIGNUP', newUser._id.toString(), validated.email);

    // Send verification email via Resend
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Flexylab <noreply@flexylab.shop>',
          to: validated.email,
          subject: 'Verify your Flexylab account',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #06b6d4;">Welcome to Flexylab!</h2>
              <p>Hi ${validated.name},</p>
              <p>Please verify your email to complete your registration.</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="font-size: 24px; font-weight: bold; color: #000; letter-spacing: 2px;">
                  ${verificationCode}
                </p>
              </div>
              <p>This code will expire in 1 hour.</p>
              <p style="color: #6b7280; font-size: 12px;">Never share this code with anyone.</p>
              <p>Best regards,<br/>The Flexylab Team</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send verification email');
        logSecurityError('EMAIL_SEND_FAILURE', 'Verification email failed', newUser._id.toString(), validated.email);
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
    }

    return NextResponse.json(
      {
        message: 'Signup successful! Check your email for verification code.',
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      logSecurityError('SIGNUP_VALIDATION_FAILED', error.errors[0].message, undefined, body?.email);
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    logSecurityError('SIGNUP_ERROR', error.message, undefined, body?.email);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
