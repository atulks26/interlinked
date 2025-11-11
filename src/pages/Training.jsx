import { React, useState } from "react";
const videoData = {
  seminars: [
    {
      title: "Seminar 1",
      thumbnail:
        "https://tse2.mm.bing.net/th/id/OIP.b83x3HXh43XJ5c8uoW8aGQHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Seminar 2",
      thumbnail: "https://i.ytimg.com/vi/u46JfHrxwMk/maxresdefault.jpg",
    },
    {
      title: "Seminar 3",
      thumbnail:
        "https://i.ytimg.com/vi/2rxMG9spKTA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbju9zN1vfDY4Ny4eTFZUt1ymaXQ",
    },
    {
      title: "Seminar 4",
      thumbnail: "https://i.ytimg.com/vi/0edLoCR0clE/maxresdefault.jpg",
    },
    {
      title: "Seminar 5",
      thumbnail:
        "https://www.project-challenge.com/wp-content/uploads/2024/08/wipm-leadership-unpacked-5.png",
    },
  ],
  webinars: [
    {
      title: "Webinar 1",
      thumbnail: "https://i.ytimg.com/vi/ADqU5By_xF0/maxresdefault.jpg",
    },
    {
      title: "Webinar 2",
      thumbnail:
        "https://cdn.prod.website-files.com/62287a75b85ea07f52ebfee0/6548846e206e0be7d840903b_Card%202%20ppl.png",
    },
    {
      title: "Webinar 3",
      thumbnail: "https://img.youtube.com/vi/P_mTODV5wpI/mqdefault.jpg",
    },
    {
      title: "Webinar 4",
      thumbnail:
        "https://www.wrenchacademy.org/wp-content/uploads/2024/05/webinar-banner.png",
    },
    {
      title: "Webinar 5",
      thumbnail:
        "https://content.cdntwrk.com/mediaproxy?url=https%3A%2F%2Fres.cloudinary.com%2Fuf-553208%2Fimage%2Fupload%2Fv1718272107%2FTPF2024i_webinar_uberflip_1200x628_r4geje.png&size=1&version=1722931308&sig=fa7fe6a6a287e04d9b277eabcd4a96b6&default=hubs%2Ftilebg-videos.jpg",
    },
  ],
  workshops: [
    {
      title: "Workshop 1",
      thumbnail:
        "https://cdn.eventespresso.com/wp-content/uploads/2023/08/01074844/Workshop-Ideas-Image-Man-2048x1152.jpg",
    },
    {
      title: "Workshop 2",
      thumbnail:
        "https://www.george.gov.za/wp-content/uploads/2023/02/Event-organisers-representing-sports-clubs-schools-event-companies-and-NGOs-attended-the-workshop-3.jpg",
    },
    {
      title: "Workshop 3",
      thumbnail:
        "https://cdn.cseindia.org/large/2021-08-18/0.98751900_1629257750_building.jpg",
    },
    {
      title: "Workshop 4",
      thumbnail:
        "https://www.mahawashcoalition.com/wp-content/uploads/2022/07/Development-of-a-Framework-for-Capacity-Building-of-ULBs-copy.png",
    },
    {
      title: "Workshop 5",
      thumbnail:
        "https://www.mahawashcoalition.com/wp-content/uploads/2024/08/URCModule.jpg",
    },
  ],
  capacityBuildingExercises: [
    {
      title: "Live Session 1",
      thumbnail:
        "https://tse1.mm.bing.net/th/id/OIP.-2Uzxb0IX_FwP1LObVMywQHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Live Session 2",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdd4645qs3form-gXGs8qQpswbmGdmdgKkHUw2hepyhcoOhhtup7W2RcEY3rS6yS1ca54&usqp=CAU",
    },
    {
      title: "Live Session 3",
      thumbnail:
        "https://gauravtiwari.org/wp-content/uploads/2020/06/working-seminar.jpg?fit=1160%2C773&ssl=1",
    },
    {
      title: "Live Session 4",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Wzj_OMTcIlzdgjcuyPvHdtG-xggO-FvcyDQ8nWUjf7WuBe6xVIP9OHN0KwVfMoTMpn0&usqp=CAU",
    },
    {
      title: "Live Session 5",
      thumbnail:
        "https://integralworld.org/wp-content/uploads/2023/09/IntegralWorld-Programme-Action-Capacity-Building-Societal-Capacity-Building-Policymakers-Capacity-Building-1024x536.jpg",
    },
  ],
  recordings: [
    {
      title: "Recording 1",
      thumbnail:
        "https://pmi-p-001.sitecorecontenthub.cloud/api/public/content/7f477752172d442585040cd9ddc61844?v=e46fb29f",
    },
    {
      title: "Recording 2",
      thumbnail:
        "https://web-static.wrike.com/blog/content/uploads/2017/09/Implementation-Outsourcing-Project-Manager.jpg?av=91455950a8726491e14009682e9bcee3",
    },
    {
      title: "Recording 3",
      thumbnail: "https://img-c.udemycdn.com/course/480x270/2157944_c6fd_6.jpg",
    },
    {
      title: "Recording 4",
      thumbnail:
        "https://pmi-p-001.sitecorecontenthub.cloud/api/public/content/adac32fc53254ba0831ea6f85f77bb4c?v=e5e4fff3",
    },
    {
      title: "Recording 5",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7sRONZwR79LDO8HntGbioHEMaatCwJDHz_g&s",
    },
  ],
};

const VideoCard = ({ title, thumbnail }) => (
  <div className="w-60 sm:w-72 flex-shrink-0 transition-transform transform hover:scale-105 cursor-pointer">
    <img
      className="rounded-lg mb-2 w-full h-40 object-cover shadow-md"
      src={thumbnail}
      alt={title}
    />
    <p className="text-center text-sm font-semibold text-gray-800">{title}</p>
  </div>
);

const Section = ({ heading, videos }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mt-2 mb-6 text-blue-900">{heading}</h2>
    <div className="flex space-x-6 overflow-x-auto pb-4 px-2">
      {videos.length > 0 ? (
        videos.map((video, index) => <VideoCard key={index} {...video} />)
      ) : (
        <p className="text-gray-600 italic">No results found.</p>
      )}
    </div>
  </div>
);

const Training = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = Object.fromEntries(
    Object.entries(videoData).map(([key, videos]) => [
      key,
      videos.filter((v) =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    ])
  );

  return (
    <div className="container mx-auto px-6 sm:px-10 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-bold text-blue-800 text-center sm:text-left">
          Training Programs
        </h1>
        <div className="relative w-full sm:w-auto flex justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-full py-2 px-4 w-72 shadow-sm focus:ring focus:ring-blue-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-0 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      <Section heading="Seminars" videos={filteredData.seminars} />
      <Section heading="Webinars" videos={filteredData.webinars} />
      <Section heading="Workshops" videos={filteredData.workshops} />
      <Section
        heading="Capacity Building Exercises"
        videos={filteredData.capacityBuildingExercises}
      />
      <Section heading="Recorded Sessions" videos={filteredData.recordings} />

      <div className="text-center mt-16">
        <a
          href="/"
          className="bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-blue-800 transition-all duration-200"
        >
          ← Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Training;
