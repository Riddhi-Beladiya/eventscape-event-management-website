"use client";
import React, { useEffect, useState } from "react";
import "../../Forntend-Component/Portfolio/Portfolio.css";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const imageUrls1 = [
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-1142-1686302597-6482ef856e97d.jpeg?v=1686302601",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-2326-1686302581-6482ef7517c45.jpeg?v=1686302586",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-2642-1686302567-6482ef6737984.jpeg?v=1686302572",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-F5712CA0-5B26-4D3A-AFC2-6F6E84C0D87C-1670405426-63905d324ab0e.jpeg?v=1670405430",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-83B088F0-0718-4E79-972B-2204EF18056E-1660028684-62f2070c151ab.jpeg?v=1660028693",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-2267366D-63B8-4FEF-8108-C87F382A8B55-1658405764-62d94384abeea.jpeg?v=1658405783",
  ];
  const imageUrls2 = [
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/enap-photo-615621f172505.JPG?v=1633034739",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-E6802D9B-5C1C-405E-AF97-110C29CEBFF3-1638775066-61adb91a71b30.jpeg?v=1638775070",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-6242-1642050664-61dfb46855484.jpg?v=1642050668",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-7D9921F0-45F5-4CCA-9274-846DFC64603F-1648124686-623c630ecb596.jpeg?v=1648124692",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-09A57F07-E18D-4CBF-81DB-0BA7C6534AF1-1648124777-623c6369a3c86.jpeg?v=1648124781",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-2459-1667342259-63619fb37653f.jpg?v=1667342265",
  ];

  const imageUrls3 = [
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/enap-photo-6156225fd6883.jpg?v=1633034851",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-6757-1642050646-61dfb456ae029.JPG?v=1642050649",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-6672-1642050659-61dfb4637a5c7.jpg?v=1642050663",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-EFFB806A-558F-48EA-9CCD-C33B1F2DBB12-1648124683-623c630b22190.jpeg?v=1648124693",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-D8204362-C7DC-485E-A4E0-B56C33B38D6A-1649818948-62563d449c8be.jpeg?v=1649818954",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-image-50421249-1656738388-62bfd254430a2.JPG?v=1656738392",
  ];
  const imageUrls4 = [
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-D8204362-C7DC-485E-A4E0-B56C33B38D6A-1649818948-62563d449c8be.jpeg?v=1649818954",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-image-50421249-1656738388-62bfd254430a2.JPG?v=1656738392",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-8115B165-B148-4F1C-AE2E-DE3A13AC9BE5-1658405784-62d9439894494.jpeg?v=1658405802",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-1707-1667349608-6361bc685f79d.JPG?v=1667349612",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-3693-1686302560-6482ef6084c72.jpeg?v=1686302564",
    "https://cdn.shopify.com/s/files/1/2303/2349/t/14/assets/Enorm-Gallery-42325-IMG-2545-1686302574-6482ef6e7f900.jpeg?v=1686302579",
  ];

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
          <div className="flex flex-col items-center text-blue-900">
            <Oval
              visible={true}
              height={80}
              width={40}
              color="#08318a"
              secondaryColor="#749ffc"
              ariaLabel="loading"
            />
            <p className="text-center mt-2">Loading event details...</p>
          </div>
        </div>
      );
    }

  return (
    <div className="row-pg pt-[3.8%]">
      <div className="column-pg">
        {imageUrls1.map((image, index) => (
          <div
            key={index}
            className=" cursor-pointer "
            onClick={() => openModal(image)}
          >
            <img
              className=" myImages w-full rounded-md shadow-md my-2 hover:opacity-75 transition"
              src={image}
              alt={`Gallery ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="column-pg">
        {imageUrls2.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img
              className="w-full rounded-md shadow-md my-2 hover:opacity-75 transition"
              src={image}
              alt={`Gallery ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="column-pg">
        {imageUrls3.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img
              className="w-full rounded-md shadow-md my-2 hover:opacity-75 transition"
              src={image}
              alt={`Gallery ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="column-pg">
        {imageUrls4.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img
              className="w-full rounded-md shadow-md my-2 hover:opacity-75 transition"
              src={image}
              alt={`Gallery ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative p-4">
            <span
              className="absolute top-3 right-6 text-white text-3xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <img
              className="max-w-full max-h-[90vh] rounded-md"
              src={selectedImage}
              alt="Selected"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
