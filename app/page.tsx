import BaseNavigation from '@/components/base-navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="w-full min-h-screen p-4">
            <div className="w-full min-h-[calc(100vh-32px)] flex rounded-md bg-[#0D0D0D] border-red-400">
                <BaseNavigation />
                <div className="w-1/2 flex flex-col justify-end py-32 px-18">
                    <h1 className="text-6xl">
                        <span>ALIVE</span>
                        <br />
                        <span>Helth checking website</span>
                    </h1>
                    <p className="my-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, cumque at.
                        Nemo totam deserunt a rem optio distinctio nisi expedita.
                    </p>
                    <div className="flex gap-2">
                        <Button className="w-fit font-semibold text-white dark:bg-orange-700 hover:bg-orange-800 shadow-md cursor-pointer active:scale-95 ">
                            Get start
                        </Button>
                        <Button className="w-fit font-semibold bg-white text-black hover:bg-gray-300 shadow-md cursor-pointer active:scale-95">
                            Sign up
                        </Button>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-end"></div>
            </div>
        </div>
    );
}
