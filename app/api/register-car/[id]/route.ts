import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import Car from '@/models/Car';

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  // user id
  const { id } = params;
  //all info
  const {
    carTitle,
    location,
    rentPrice,
    capacity,
    fuelCapacity,
    shortDescription,
    typeOfclass,
    model,
    manufacturer,
    cylinders,
    cityMPG,
    combinationMPG,
    highwayMPG,
    year,
    transmission,
    fuelType,
    carType,
    drive,
    imageFiles,
  } = await req.json();

  try {
    await connectToDatabase();

    //create new car on mongodb
    const newCar = new Car({
      carTitle,
      location,
      rentPrice,
      capacity,
      fuelCapacity,
      shortDescription,
      typeOfclass,
      model,
      manufacturer,
      cylinders,
      cityMPG,
      combinationMPG,
      highwayMPG,
      year,
      transmission,
      fuelType,
      carType,
      drive,
      imageFiles,
      creator: id,
    });

    //save new car
    await newCar.save();

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json('Failed to create a Car', { status: 500 });
  }
};