// export const fetchEvents = async () => {
//   try {
//     const response = await fetch(
//       "https://event-scape-5af7a-default-rtdb.firebaseio.com/event.json",
//       {
//         method: "GET",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch events. Status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data) {
//       console.warn("No data received from API.");
//       return [];
//     }

//     return Object.keys(data).map((key) => ({
//       id: key,
//       ...data[key],
//       image: data[key].image || "/fallback-image.jpg",
//     }));
//   } catch (error) {
//     console.error("Error fetching events:", error.message);
//     return [];
//   }
// };

// export const addEvent = async (event) => {
//   try {
//     const response = await fetch(
//       "https://event-scape-5af7a-default-rtdb.firebaseio.com/event.json",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(event),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to add event");
//     }

//     const data = await response.json();
//     return { id: data.name, ...event };
//   } catch (error) {
//     console.error("Error adding event:", error);
//     return null;
//   }
// };

// export const updateEvent = async (id, event) => {
//   try {
//     const response = await fetch(
//       `https://event-scape-5af7a-default-rtdb.firebaseio.com/event/${id}.json`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(event),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update event");
//     }

//     const updatedEvent = await response.json();
//     return { id, ...updatedEvent };
//   } catch (error) {
//     console.error("Error updating event:", error);
//     return null;
//   }
// };

// export const deleteEvent = async (id) => {
//   try {
//     const response = await fetch(
//       `https://event-scape-5af7a-default-rtdb.firebaseio.com/event/${id}.json`,
//       {
//         method: "DELETE",
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to delete event");
//     }

//     return true;
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     return false;
//   }
// };


// Fetch Events (GET)
export const fetchEvents = async () => {
  try {
    if (typeof window !== "undefined") {
      // Check if data exists in localStorage
      const storedEvents = localStorage.getItem("eventsData");
      const lastFetchTime = localStorage.getItem("lastFetchTime");

      // If data exists and is fresh (less than 1 hour old), return it
      if (storedEvents && lastFetchTime && Date.now() - lastFetchTime < 3600000) {
        return JSON.parse(storedEvents);
      }
    }

    const response = await fetch(
      "https://event-scape-5af7a-default-rtdb.firebaseio.com/event.json",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch events. Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data) return [];

    const events = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
      image: data[key].image || "/fallback-image.jpg",
    }));

    // Store fetched data in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("eventsData", JSON.stringify(events));
      localStorage.setItem("lastFetchTime", Date.now());
    }

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
