import React, { useState, useEffect } from 'react';


// Extend the TimeOption interface to include availability
interface TimeOption {
    label: string;
    value: string;
    available: boolean; // true if the time slot is available
}

const ReservationSystem = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [times, setTimes] = useState<TimeOption[]>([]);
    const [selectedStartTime, setSelectedStartTime] = useState<string>('');
    const [selectedEndTime, setSelectedEndTime] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log('Reservation made for:', selectedDate, 'from', selectedStartTime, 'to', selectedEndTime);

        // Redirect to the booking page
        window.location.href = 'https://www.tntlimousine.com/reservation';
    };

    useEffect(() => {
        if (selectedDate) {
            fetchAvailableTimes(selectedDate);
        }
    }, [selectedDate]);

    const fetchAvailableTimes = async (date: string) => {
        setTimeout(() => {
            // Simulate fetching times and checking against unavailable times
            const allTimes = [
                { label: '6 AM', value: '06:00', available: true },
                { label: '7 AM', value: '07:00', available: true },
                { label: '8 AM', value: '08:00', available: true },
                { label: '9 AM', value: '09:00', available: true },
                { label: '10 AM', value: '10:00', available: true },
                { label: '11 AM', value: '11:00', available: true },
                { label: '12 PM', value: '12:00', available: true },
                { label: '1 PM', value: '13:00', available: true },
                { label: '2 PM', value: '14:00', available: true },
                { label: '3 PM', value: '15:00', available: false },
                { label: '4 PM', value: '16:00', available: false },
                { label: '5 PM', value: '17:00', available: false },
                { label: '6 PM', value: '18:00', available: true },
                { label: '7 PM', value: '19:00', available: true },
                { label: '8 PM', value: '20:00', available: true },
                { label: '9 PM', value: '21:00', available: true },
                { label: '10 PM', value: '22:00', available: true }
            ];
            setTimes(allTimes);
        }, 1000);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setTimes([]);
        setSelectedStartTime('');
        setSelectedEndTime('');
    };

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStartTime(event.target.value);
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEndTime(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mt-4 text-center mb-2">Pick a Date</label>
                <div className="relative w-full max-w-sm">
                    <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={selectedDate}
                    onChange={handleDateChange}
                    />
                </div>
                </div>

        
                {times.length > 0 && selectedDate && (
                    <div className="flex justify-center space-x-8 mt-4">
                        <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-900 dark:text-white text-center">Pick a Start Time</label>
                        <div className="max-w-[8rem]">
                            <select
                            id="startTime"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={selectedStartTime}
                            onChange={handleStartTimeChange}
                            required
                            >
                            {times.map((time) => (
                                <option 
                                key={time.value} 
                                value={time.value} 
                                disabled={!time.available} 
                                >
                                {time.label}
                                </option>
                            ))}
                            </select>
                        </div>
                        </div>
                        
                        <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-900 dark:text-white text-center">Pick an End Time</label>
                        <div className="max-w-[8rem]">
                            <select
                            id="endTime"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={selectedEndTime}
                            onChange={handleEndTimeChange}
                            required
                            >
                            {times.map((time) => (
                                <option 
                                key={time.value} 
                                value={time.value} 
                                disabled={!time.available} 
                                >
                                {time.label}
                                </option>
                            ))}
                            </select>
                        </div>
                        </div>
                    </div>
                    )}

                    {selectedStartTime && selectedEndTime && (
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="p-2 bg-blue-1000 text-white rounded">
                            Continue to Booking
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ReservationSystem;
