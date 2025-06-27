import Image from "next/image";

export default function Preloader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center space-y-6">
                {/* Video Container */}
                {/* <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        src="/preloader.mp4"
                        className="w-full h-full object-cover"
                    /> */}
                <div className="w-64 h-40 rounded-lg overflow-hidden flex justify-center">
                    <Image
                        src="/preloader.jpg"
                        alt="Preloader"
                        width={128}
                        height={128}
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Loading Section */}
                <div className="flex flex-col items-center space-y-2">
                    {/* Loading text with dots */}
                    <div className="flex items-center text-gray-500">
                        <span className="text-sm font-mono italic mr-3">Loading</span>
                        <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                            <div
                                className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                                style={{ animationDelay: '0.5s' }}
                            />
                            <div
                                className="w-1 h-1 bg-blue-300 rounded-full animate-pulse"
                                style={{ animationDelay: '1s' }}
                            />
                        </div>
                    </div>

                    {/* Did you know section */}
                    <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-gray-600">Did you know that?</p>
                        <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-roboto">
                            AI learns from data to make decisions<br />
                            like humans do.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}