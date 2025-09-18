  "use client";
  import { useState, useEffect } from "react";
  import { FaEdit, FaUpload } from "react-icons/fa";
  import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } from "@/app/api/Productapi";
  import { MdDelete } from "react-icons/md";
  import { Oval } from "react-loader-spinner";

  const Page = () => {
    const [accessory, setAccessory] = useState({
      name: "",
      category: "",
      quantity: "",
      description: "",
      image: null,
    });

    const [accessories, setAccessories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAccessoryId, setCurrentAccessoryId] = useState(null);
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
      const getProducts = async () => {
        const storedProducts =
          JSON.parse(localStorage.getItem("accessories")) || [];
        if (storedProducts.length > 0) {
          setAccessories(storedProducts);
        } else {
          const productsData = await fetchProducts();
          if (productsData) {
            const productsArray = Object.keys(productsData).map((key) => ({
              id: key,
              ...productsData[key],
            }));
            setAccessories(productsArray);
            localStorage.setItem("accessories", JSON.stringify(productsArray));
          }
        }
      };
      getProducts();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setAccessory({ ...accessory, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const accessoryWithImage = { ...accessory, image: imageURL };
      if (isEditing) {
        const updatedAccessory = await updateProduct(
          currentAccessoryId,
          accessoryWithImage
        );
        if (updatedAccessory) {
          const updatedAccessories = accessories.map((item) =>
            item.id === currentAccessoryId
              ? { id: currentAccessoryId, ...updatedAccessory }
              : item
          );
          setAccessories(updatedAccessories);
          localStorage.setItem("accessories", JSON.stringify(updatedAccessories));
          setIsEditing(false);
          setCurrentAccessoryId(null);
        }
      } else {
        const newAccessory = await addProduct(accessoryWithImage);
        if (newAccessory) {
          const updatedAccessories = [
            ...accessories,
            { id: newAccessory.name, ...accessoryWithImage },
          ];
          setAccessories(updatedAccessories);
          localStorage.setItem("accessories", JSON.stringify(updatedAccessories));
        }
      }
      setAccessory({
        name: "",
        category: "",
        quantity: "",
        description: "",
        image: null,
      });
      setImageURL("");
    };

    // Handle Image File Selection
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const objectURL = URL.createObjectURL(file);
        setImageURL(objectURL);
      }
    };

    // Handle Direct URL Input
    const handleURLChange = (event) => {
      setImageURL(event.target.value);
    };

    const handleEdit = (item) => {
      setAccessory(item);
      setImageURL(item.image || "");
      setIsEditing(true);
      setCurrentAccessoryId(item.id);
    };

    const handleDelete = async (id) => {
      const success = await deleteProduct(id);
      if (success) {
        const updatedAccessories = accessories.filter((item) => item.id !== id);
        setAccessories(updatedAccessories);
        localStorage.setItem("accessories", JSON.stringify(updatedAccessories));
      }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);
    
      const [loading, setLoading] = useState(true);
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
      <div className="w-full flex justify-between mx-auto gap-5 p-6 bg-white shadow-md rounded-lg">
        <div className="w-[30%]">
          <h2 className="text-2xl font-semibold mb-4">Add Event Accessories</h2>

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label className="block text-sm font-medium">Accessory Name</label>
              <input
                type="text"
                name="name"
                value={accessory.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={accessory.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="decor">Decoration</option>
                <option value="lighting">Lighting</option>
                <option value="seating">Seating</option>
                <option value="party">Party</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={accessory.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={accessory.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Upload or Paste Image URL
              </label>

              {/* File Upload */}
              <div className="flex items-center space-x-2 border p-2 rounded-md">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  id="fileUpload"
                  accept="image/*"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex items-center space-x-2"
                >
                  <FaUpload className="text-blue-500" />
                  <span>{imageURL ? "Image Selected" : "Choose a file"}</span>
                </label>
              </div>

              {/* Paste URL Input */}
              <input
                type="text"
                placeholder="Paste Image URL here..."
                value={imageURL}
                onChange={handleURLChange}
                className="mt-2 border rounded-md p-2 w-full"
              />

              {/* Show Image Preview */}
              {imageURL && (
                <div className="mt-4">
                  <img
                    src={imageURL}
                    alt="Uploaded Preview"
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Update Accessory" : "Add Accessory"}
            </button>
          </form>
        </div>

        <div className="mt-10 w-[65%]">
        <h3 className="text-xl font-bold mb-4">Accessory List ({accessories.length} total)</h3>

          {/* <h3 className="text-xl font-bold mb-4">Accessory List</h3> */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-gray-200 text-center">
                <tr>
                  <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                    Category
                  </th>
                  <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                    Quantity
                  </th>
                  <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                    Description
                  </th>
                  <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                    Image
                  </th>
                  <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {accessories.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100 transition">
                    <td className="py-3 px-6 border-b text-gray-600">
                      {item.name}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      {item.category}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      {item.description}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>

                    <td className="py-3 px-6 text-3xl text-nowrap border-b text-gray-600">
                      <button
                        className="text-blue-500 px-4"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  export default Page;

