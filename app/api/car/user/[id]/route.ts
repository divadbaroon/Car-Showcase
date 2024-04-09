import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import Car from '@/models/Car';

// get all cars specific to user
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    const allCars = await Car.find({ creator: id }).populate('creator');
    return NextResponse.json(allCars, { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json('Failed to retrieve cars', { status: 500 });
  }
};

// delete a user car by its id
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDatabase();
    await Car.findByIdAndDelete(id);
    return NextResponse.json('Car deleted successfully', { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json('Failed to delete a car', { status: 500 });
  }
};

// update a user car by its id
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const carInfo = await req.json();
  try {
    await connectToDatabase();
    const updatedCar = await Car.findByIdAndUpdate(id, carInfo, { new: true });
    return NextResponse.json(updatedCar, { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json('Failed to update a car', { status: 500 });
  }
};

// create a new car for a user
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const carInfo = await req.json();
  try {
    await connectToDatabase();
    const newCar = new Car({ ...carInfo, creator: id });
    await newCar.save();
    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json('Failed to create a car', { status: 500 });
  }
};