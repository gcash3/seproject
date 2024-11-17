// src/app/api/auth/verify-2fa/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/user';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    
    const storedData = global.twoFactorCodes?.get(email);
    if (!storedData || storedData.code !== code || Date.now() > storedData.expires) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email }).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    global.twoFactorCodes?.delete(email);

    const response = NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      },
      token // Include token in response
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('2FA verification error:', error);
    return NextResponse.json(
      { error: '2FA verification failed' },
      { status: 500 }
    );
  }
}