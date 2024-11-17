
// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/user';
import { send2FACode } from '@/lib/email-service';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate 2FA code
    const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store 2FA code
    global.twoFactorCodes = global.twoFactorCodes || new Map();
    global.twoFactorCodes.set(email, {
      code: twoFactorCode,
      expires: Date.now() + 300000 // 5 minutes
    });

    // Send 2FA code
    await send2FACode(email, twoFactorCode);

    return NextResponse.json({
      message: '2FA code sent',
      email
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}