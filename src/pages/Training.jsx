import { React, useState } from "react";

// Sample data for different categories
const videoData = {
    seminars: [
        {
            title: "Seminar 1",
            thumbnail:
                "https://tse2.mm.bing.net/th/id/OIP.b83x3HXh43XJ5c8uoW8aGQHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
            link: "#",
        },
        {
            title: "Seminar 2",
            thumbnail: "https://i.ytimg.com/vi/u46JfHrxwMk/maxresdefault.jpg",
            link: "#",
        },
        {
            title: "Seminar 3",
            thumbnail:
                "https://i.ytimg.com/vi/2rxMG9spKTA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbju9zN1vfDY4Ny4eTFZUt1ymaXQ",
            link: "#",
        },
        {
            title: "Seminar 4",
            thumbnail: "https://i.ytimg.com/vi/0edLoCR0clE/maxresdefault.jpg",
            link: "#",
        },
        {
            title: "Seminar 5",
            thumbnail:
                "https://www.project-challenge.com/wp-content/uploads/2024/08/wipm-leadership-unpacked-5.png",
            link: "#",
        },
    ],
    webinars: [
        {
            title: "Webinar 1",
            thumbnail: "https://i.ytimg.com/vi/ADqU5By_xF0/maxresdefault.jpg",
            link: "#",
        },
        {
            title: "Webinar 2",
            thumbnail:
                "https://cdn.prod.website-files.com/62287a75b85ea07f52ebfee0/6548846e206e0be7d840903b_Card%202%20ppl.png",
            link: "#",
        },
        {
            title: "Webinar 3",
            thumbnail: "https://img.youtube.com/vi/P_mTODV5wpI/mqdefault.jpg",
            link: "#",
        },
        {
            title: "Webinar 4",
            thumbnail:
                "https://www.wrenchacademy.org/wp-content/uploads/2024/05/webinar-banner.png",
            link: "#",
        },
        {
            title: "Webinar 5",
            thumbnail:
                "https://content.cdntwrk.com/mediaproxy?url=https%3A%2F%2Fres.cloudinary.com%2Fuf-553208%2Fimage%2Fupload%2Fv1718272107%2FTPF2024i_webinar_uberflip_1200x628_r4geje.png&size=1&version=1722931308&sig=fa7fe6a6a287e04d9b277eabcd4a96b6&default=hubs%2Ftilebg-videos.jpg",
            link: "#",
        },
    ],
    workshops: [
        {
            title: "Workshop 1",
            thumbnail:
                "https://cdn.eventespresso.com/wp-content/uploads/2023/08/01074844/Workshop-Ideas-Image-Man-2048x1152.jpg",
            link: "#",
        },
        {
            title: "Workshop 2",
            thumbnail:
                "https://www.george.gov.za/wp-content/uploads/2023/02/Event-organisers-representing-sports-clubs-schools-event-companies-and-NGOs-attended-the-workshop-3.jpg",
            link: "#",
        },
        {
            title: "Workshop 3",
            thumbnail:
                "https://cdn.cseindia.org/large/2021-08-18/0.98751900_1629257750_building.jpg",
            link: "#",
        },
        {
            title: "Workshop 4",
            thumbnail:
                "https://www.mahawashcoalition.com/wp-content/uploads/2022/07/Development-of-a-Framework-for-Capacity-Building-of-ULBs-copy.png",
            link: "#",
        },
        {
            title: "Workshop 5",
            thumbnail:
                "https://www.mahawashcoalition.com/wp-content/uploads/2024/08/URCModule.jpg",
            link: "#",
        },
    ],
    capacityBuildingExercises: [
        {
            title: "Live Session 1",
            thumbnail:
                "https://tse1.mm.bing.net/th/id/OIP.-2Uzxb0IX_FwP1LObVMywQHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3,
            link: "#",
        },
        {
            title: "Live Session 2",
            thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdd4645qs3form-gXGs8qQpswbmGdmdgKkHUw2hepyhcoOhhtup7W2RcEY3rS6yS1ca54&usqp=CAU",
            link: "#",
        },
        {
            title: "Live Session 3",
            thumbnail:
                "https://media.licdn.com/dms/image/v2/D5612AQHwy4vuHq3Xow/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1712235873353?e=2147483647&v=beta&t=ubbZQ_NSytFkSlrUVJCwqj0uttyRPieWW1ItgLnuVs8",
            link: "#",
        },
        {
            title: "Live Session 4",
            thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Wzj_OMTcIlzdgjcuyPvHdtG-xggO-FvcyDQ8nWUjf7WuBe6xVIP9OHN0KwVfMoTMpn0&usqp=CAU",
            link: "#",
        },
        {
            title: "Live Session 5",
            thumbnail:
                "https://integralworld.org/wp-content/uploads/2023/09/IntegralWorld-Programme-Action-Capacity-Building-Societal-Capacity-Building-Policymakers-Capacity-Building-1024x536.jpg",
            link: "#",
        },
    ],
    recordings: [
        {
            title: "Recording 1",
            thumbnail:
                "https://pmi-p-001.sitecorecontenthub.cloud/api/public/content/7f477752172d442585040cd9ddc61844?v=e46fb29f",
            link: "#",
        },
        {
            title: "Recording 2",
            thumbnail:
                "https://web-static.wrike.com/blog/content/uploads/2017/09/Implementation-Outsourcing-Project-Manager.jpg?av=91455950a8726491e14009682e9bcee3",
            link: "#",
        },
        {
            title: "Recording 3",
            thumbnail:
                "https://img-c.udemycdn.com/course/480x270/2157944_c6fd_6.jpg",
            link: "#",
        },
        {
            title: "Recording 4",
            thumbnail:
                "https://pmi-p-001.sitecorecontenthub.cloud/api/public/content/adac32fc53254ba0831ea6f85f77bb4c?v=e5e4fff3",
            link: "#",
        },
        {
            title: "Recording 5",
            thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7sRONZwR79LDO8HntGbioHEMaatCwJDHz_g&s",
            link: "#",
        },
    ],
};

// Card component for each video
const VideoCard = ({ title, thumbnail, link }) => (
    <div className="w-full">
        <a href={link}>
            <img
                className="rounded-lg mb-2 w-full"
                src={thumbnail}
                alt={title}
            />
        </a>
        <p className="text-center text-sm">{title}</p>
    </div>
);

// Section component for each category
const Section = ({ heading, videos }) => (
    <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold mt-2">{heading}</h2>
            <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
            >
                View More
                <svg
                    className="w-5 h-5 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.293 9.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 11.586l2.293-2.293z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
        </div>
        <div className="flex space-x-4 overflow-hidden">
            {videos.slice(0, 5).map((video, index) => (
                <VideoCard key={index} {...video} />
            ))}
        </div>
    </div>
);

// Main page component
const Training = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        console.log("Search term:", searchTerm);
    };
    return (
        <div className="container mx-auto p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-blue-800">
                    Training Programs
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-full py-2 px-4 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-0 bg-blue-600 text-white px-4 py-2 rounded-full"
                    >
                        Search
                    </button>
                </div>
            </div>
            <Section heading="Seminars" videos={videoData.seminars} />
            <Section heading="Webinars" videos={videoData.webinars} />
            <Section heading="Workshops" videos={videoData.workshops} />
            <Section
                heading="Capacity Building Exercises"
                videos={videoData.capacityBuildingExercises}
            />
            <Section
                heading="Recorded Sessions"
                videos={videoData.recordings}
            />
        </div>
    );
};

export default Training;
