import { FaTimes } from "react-icons/fa";

const BookingModal = ({
  setIsModalOpen,
  event,
  date,
  quantity,
  image,
  totalPrice,
}) => {
  const finalPrice = totalPrice;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
        {/* Close Button at Top-Right */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition duration-300"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Title */}
        <h3 className="text-xl font-bold text-gray-800 text-center">
          🎟️ Booking Confirmed!
        </h3>
        {/* Event Image */}
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Event"
              className="w-full h-52 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        {/* Booking Details */}
        <div className="mt-4 space-y-3">
          <p className="text-gray-700">
            <strong>Event:</strong> {event}
          </p>
          <p className="text-gray-700">
            <strong>Date:</strong> {new Date(date).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <strong>Quantity:</strong> {quantity}
          </p>
        </div>

        <p className="text-lg font-semibold text-center mt-4">
          Total Price: <span className="text-green-600">${finalPrice}</span>
        </p>
      </div>
    </div>
  );
};

export default BookingModal;
