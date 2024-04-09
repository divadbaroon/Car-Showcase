import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import User from '@/models/User';

// get user profile
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const profile = await User.findById(id);
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json('Failed to get user', { status: 500 });
  }
};

// update user profile
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { coverImage } = await req.json();
  try {
    await connectToDatabase();
    const updatedProfile = await User.findByIdAndUpdate(id, { coverImage }, { new: true });
    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json('Failed to update user', { status: 500 });
  }
};