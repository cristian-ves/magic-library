import { SparklesText } from '@/components/ui/sparkles-text';
import Drake from '../assets/dragon.svg';

export const MainPage = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-magicPurple via-deepPurple to-magicGreen overflow-hidden flex flex-col">

            <div className="absolute inset-0 bg-stars bg-cover bg-center -z-10"></div>

            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-8 md:px-20 gap-16">

                <div className="flex-shrink-0 w-full md:w-2/5 flex items-center justify-center">
                    <img
                        src={Drake}
                        alt="Magic Library"
                        className="w-96 md:w-[36rem] lg:w-[42rem] h-auto"
                    />
                </div>

                <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left gap-6">
                    <SparklesText className="text-5xl md:text-6xl font-heading text-lightPurple">
                        Welcome to the World Wide Magic Library!
                    </SparklesText>
                    <p className="text-lightPurple text-lg md:text-xl max-w-xl font-body">
                        Discover the magic of <strong>Data Structures</strong> through a worldwide magical library network.
                    </p>
                </div>
            </div>
        </div>
    );
};
