// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/user';
import { sendVerificationEmail } from '@/lib/email-service';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json() as RegisterRequestBody;
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    global.verificationCodes = global.verificationCodes || new Map();
    global.verificationCodes.set(email, {
      code: verificationCode,
      expires: Date.now() + 600000
    });

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({
      message: 'Verification code sent',
      email,
      name,
      password // This will be needed for the verification step
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}