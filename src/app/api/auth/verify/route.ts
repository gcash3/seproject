// src/app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/user';
import jwt from 'jsonwebtoken';

interface VerifyRequestBody {
  email: string;
  code: string;
  name: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, code, name, password } = await req.json() as VerifyRequestBody;
    
    const storedData = global.verificationCodes?.get(email);
    if (!storedData || storedData.code !== code || Date.now() > storedData.expires) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    await connectDB();

    // Create user with all required fields
    const user = await User.create({ 
      email, 
      password,
      name
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    global.verificationCodes?.delete(email);

    const response = NextResponse.json({
      message: 'User verified successfully',
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}