import Image from "next/image";
import React from "react";

const speakers = [
  { id: 1, name: "Foyez Ahmed", role: "Web Developer", image: "/Images/profile/1profile.png" },
  { id: 2, name: "Jane Doe", role: "UI/UX Designer", image: "/Images/profile/2profile.png" },
  { id: 3, name: "John Smith", role: "Software Engineer", image: "/Images/profile/3profile.png" },
  { id: 4, name: "Emily Johnson", role: "Product Manager", image: "/Images/profile/4profile.png" },
];

const Speakers = () => {
  return (
    <div>
      <h1 className="text-3xl py-4 font-bold text-blue-900">Main Speakers</h1>
      <div className="grid grid-cols-2 gap-4">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex items-center gap-3 p-2 bg-white shadow-md rounded-lg">
            <Image
              src={speaker.image}
              alt={speaker.name}
              width={960} // Reduced from 1200 for optimization
              height={960}
              priority={true} // Loads images faster
              quality={90} // Improves clarity
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-bold">{speaker.name}</h4>
              <p className="text-gray-600">{speaker.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
