import React, { useEffect } from 'react'

interface JobSearchProps {}

export const JobSearch: React.FC<JobSearchProps> = () => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col pt-32 pb-16">
            <h1 className="font-sans text-3xl text-center text-black font-bold mb-6">TE-Tjänster på riktigt!</h1>
            <form className="flex flex-row gap-4 justify-center">
                <div className="flex flex-col w-1/4">
                    <input
                        className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-800 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        type="text"
                        placeholder="Sök jobb"
                    />
                </div>
                <div className="flex flex-col">
                    <input
                        type="text"
                        className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        placeholder="Ort"
                    />
                </div>
                <div className="flex flex-col">
                    <button className="h-full flex-shrink-0 bg-pink-500 text-white text-base font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                        Sök
                    </button>
                </div>
            </form>
        </div>
    )
}
