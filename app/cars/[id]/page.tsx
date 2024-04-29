"use client";
import { useEffect, useState } from "react";
import { CarProps } from "@/types";
import Image from "next/image";
import toast from "react-hot-toast";

import ReservationSystem from "@/components/reservationSystem";

const CardDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [car, setCar] = useState<CarProps>();

  // fecth individual car by its id
  useEffect(() => {
    const fetchSpecificCar = async () => {
      try {
        const res = await fetch(`/api/car/${id}`);
        const carDetail = await res.json();
        setCar(carDetail);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    toast.promise(fetchSpecificCar(), {
      loading: "Fetching car details...",
      success: "Fetched car details.",
      error: (err) => err.message,
    });
  }, [id]);

  return (
    <section className="relative max-w-[1440px] mx-auto pt-16 md:pt-24 p-2">
      {car ? (
        <div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
            <div className="bg-gray-100 dark:bg-gray-900 md:w-1/2 rounded-2xl">
              <Image
                src={car.imageFiles[0]}
                alt="car"
                width={1024}
                height={1024}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col w-full max-w-sm p-4">
              <h2 className="font-bold text-lg md:text-3xl">{car.carTitle}</h2>
              <hr className="w-1/6 border-gray-300 dark:border-gray-700 mt-1" />

              <p className="text-gray-700 dark:text-gray-300">
                {car.model} | {car.year}
              </p>
              <div className="space-y-2 md:space-y-4 mt-4 md:mt-6 w-full">
                <div className="flex items-center justify-between w-full">
                <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize text-left">
                      Price
                    </h4>
                    <hr className="w-1/3 border-gray-300 dark:border-gray-700 mt-1" />

                    <p className="font-normal">${car.rentPrice} per day</p>
                  </div>
                  <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize">
                    Capacity
                    </h4>
                    <hr className="w-1/3 border-gray-300 dark:border-gray-700 mt-1" />
                    <p className="font-normal">{car.capacity} people</p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="w-full">
                    <h4 className="md:text-lg font-semibold capitalize">
                      Description
                    </h4>
                    <hr className="w-1/2 border-gray-300 dark:border-gray-700 mt-1" />


                    <p className="font-normal mt-1">{car.description}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 md:p-6 mt-4 md:mt-6 rounded-2xl">
          <h3 className="capitalize font-bold text-lg md:text-2xl">
            Reserve the {car.carTitle}
          </h3>
          <p className="text-base md:text-lg mt-2 mb-4 lg:mb-8 text-slate-600 dark:text-slate-400">
            Quickly find an available date and time to reserve.
          </p>
          <hr className="border-gray-300 dark:border-gray-700 -mt-3" />
            <ReservationSystem />
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default CardDetails;