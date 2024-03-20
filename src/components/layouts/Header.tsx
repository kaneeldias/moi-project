import Image from "next/image";

export default function Header() {

    return (
        <div className={`font-bold bg-blue-700 text-blue-700 text-md p-5 items-center justify-center flex flex-row w-full`}>
            <div>
                <Image src={`/aiesec-logo.png`}
                       width={200}
                       height={200}
                       priority={true}
                       alt={`AIESEC logo`}
                />
            </div>
        </div>
    );
}
