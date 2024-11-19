"use client";
import Link from "next/link";
import { useRoom } from '../context/RoomContext';

export default function Home() {
  const { rooms } = useRoom();
  return (
    // grid
    // justify-items-center
    <div className="grid-rows-[20px_1fr_20px] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col md:flex-row gap-4">
      { rooms.map((room, i) => {
            return (
              room ?
              <Link key={ i } href={{query: {"param1":"asdas"}, pathname: `/room/${room.id}`}}>
                <div className="max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-32 rounded">
                    {room.name}
                </div>
              </Link> :
                <div className="max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-32 rounded" key={ i }>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
            );
          }) }

      </div>
      {/* <p>asdkasdsad</p>
    <div className="flex w-full h-96">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop>
        <source src="/../../../out/v.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div> */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
