export default function Preloader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                {/* Video Container */}
                <div className="w-64 h-40 rounded-lg overflow-hidden bg-white">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        src="/preloader.mp4"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Loading text */}
                <div className="flex items-center text-gray-500">
                    <span className="text-sm font-mono italic mr-2">Loading</span>
                    <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                </div>
                <span className="text-sm font-roboto mr-2 text-gray-500">Did you know that?</span>
                <span className="text-sm font-roboto mr-2 text-gray-500 text-center">
                    AI learns from data to make decisions <br />like humans do.
                </span>
            </div>
        </div>
    );
}