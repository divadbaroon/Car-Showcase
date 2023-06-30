import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import Car from '@/models/Car';
import { NextRequest } from 'next/server';

interface QueryProps {
    model?: string | null | undefined;
    limit?: string | null | undefined;
    fuelType?: string | null | undefined;
    year?: string | null | undefined;
    manufacturer?: string | null | undefined;
}

// get all cars
export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const model = searchParams.get('model');
    const limit = searchParams.get('limit');
    const fuelType = searchParams.get('fuelType');
    const year = searchParams.get('year');
    const manufacturer = searchParams.get('manufacturer');
    console.log(model === 'undefined', limit, fuelType, year, manufacturer);
    try {
        await connectToDatabase();
        let query: QueryProps = {
        };
        if (model !== 'undefined') {
            query.model = model;
        }
        if (fuelType !== 'undefined') {
            query.fuelType = fuelType;
        }
        if (year !== 'undefined') {
            query.year = year;
        }
        if (manufacturer !== 'undefined') {
            query.manufacturer = manufacturer;
        }
        console.log(query);
        const allCars = await Car.find(query).limit(parseInt(limit || '25'));
        console.log({allCars});
        return NextResponse.json(allCars, { status: 200 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to fetch all cars', { status: 500 });
    }

}