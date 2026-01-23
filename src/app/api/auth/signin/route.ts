import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { SigninSchema } from '@/lib/validation';
import { generateToken } from '@/lib/jwt';
import { logSecurityEvent, logSecurityError } from '@/lib/audit-log';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = SigninSchema.parse(body);

    await connectDB();

    const user = await User.findOne({ email: validated.email.toLowerCase() });

    if (!user) {
      logSecurityError('LOGIN_FAILED', 'User not found', undefined, validated.email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      logSecurityError('LOGIN_UNVERIFIED', 'Unverified email attempt', undefined, validated.email);
      return NextResponse.json(
        { error: 'Please verify your email first' },
        { status: 403 }
      );
    }

    const isPasswordValid = await user.comparePassword(validated.password);

    if (!isPasswordValid) {
      logSecurityError('LOGIN_WRONG_PASSWORD', 'Wrong password attempt', user._id.toString(), validated.email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    logSecurityEvent('USER_LOGIN', user._id.toString(), user.email);

    // Return user data and token
    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json(
      { user: userData, token },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Signin error:', error);
    logSecurityError('SIGNIN_ERROR', error.message, undefined, undefined);
    return NextResponse.json(
      { error: 'Failed to sign in' },
      { status: 500 }
    );
  }
}
