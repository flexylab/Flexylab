import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { userId, name, phone, address } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone, address },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
