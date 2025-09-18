import React from "react";

const newsData = [
  {
    image: "https://www.bizzabo.com/wp-content/uploads/2023/06/AI-for-Events-Webinar-Series_-Key-Takeaways-and-Tips_16x9.png",
    title: "EventScape Launches AI-Powered Recommendations",
    description: "Our latest update introduces AI-driven event suggestions, ensuring you never miss an event that matches your interests.",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOyZ8OgoiTd6XjQE4GY5dsB-gAMxMpbXZU-A&s",
    title: "Upcoming Tech Conference 2025 Powered by EventScape",
    description: "Join top industry leaders at the biggest tech event of the year. Get early access to speaker lists and schedules.",
  },
  {
    image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "EventScape Partners with Top Universities for Student Events",
    description: "We're excited to collaborate with universities worldwide to bring more educational and networking events to students.",
  },
  {
    image: "https://cdn.create.vista.com/api/media/small/371897462/stock-photo-one-million-achievement-celebration-rendering-text-white-background",
    title: "EventScape Hits 1 Million Users!",
    description: "We're thrilled to announce that EventScape now has over 1 million active users. Thank you for your support!",
  },
  {
    image: "https://img.freepik.com/free-photo/rear-view-large-group-music-fans-front-stage-music-concert-by-night-copy-space_637285-623.jpg?semt=ais_hybrid",
    title: "Exclusive Early Access to Music Fest 2025",
    description: "Get early bird tickets to the biggest music fest of the year, exclusively through EventScape!",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq6WTNROw26y9n3bNd5LzMG1I83HuJbZEHyA&s",
    title: "EventScape Sponsors Global Startup Meetup 2025",
    description: "Join us in supporting startups worldwide with networking, funding opportunities, and mentorship.",
  },
  {
    image: "https://www.shutterstock.com/shutterstock/photos/2506695733/display_1500/stock-vector-transforming-vision-into-reality-with-a-virtual-reality-device-against-a-high-tech-background-2506695733.jpg",
    title: "Virtual Reality (VR) Events Now on EventScape!",
    description: "Experience events like never before with our new VR-supported events feature.",
  },
  {
    image: "https://img.freepik.com/premium-photo/business-team-working-virtual-reality-technology-modern-office_31965-113220.jpg",
    title: "Hybrid Events: The Future of Networking",
    description: "EventScape is revolutionizing events with hybrid options, making networking more accessible worldwide.",
  },
  
];

const News = () => {
  return (
    <div className="overflow-auto pt-[3.8%] p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center bg-[url('https://img.freepik.com/free-photo/light-blue-bright-bokeh-background_23-2147873264.jpg')] bg-cover bg-center text-black p-16 opacity-90 shadow-md">
        EventScape News & Updates
      </h1>

      <div className="max-w-6xl mx-auto py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((news, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-5">
            <img
              src={news.image}
              alt={`Event ${index + 1}`}
              className="rounded-md w-full h-[250px] object-cover"
            />
            <h2 className="text-xl font-semibold mt-3">{news.title}</h2>
            <p className="text-gray-600 mt-2">{news.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
