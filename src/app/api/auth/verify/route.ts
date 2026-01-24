import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { VerifyEmailSchema } from '@/lib/validation';
import { logSecurityEvent, logSecurityError } from '@/lib/audit-log';
export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = VerifyEmailSchema.parse(body);

    await connectDB();

    const user = await User.findOne({ email: validated.email.toLowerCase() });

    if (!user) {
      logSecurityError('VERIFY_FAILED', 'User not found', undefined, validated.email);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.verificationCode !== validated.verificationCode) {
      logSecurityError('VERIFY_FAILED', 'Invalid verification code', user._id.toString(), validated.email);
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Verify user
    user.isVerified = true;
    user.verificationCode = '';
    await user.save();

    logSecurityEvent('EMAIL_VERIFIED', user._id.toString(), validated.email);

    // Return user data
    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      { message: 'Email verified successfully', user: userData },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Verification error:', error);
    logSecurityError('VERIFY_ERROR', error.message, undefined, undefined);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}
