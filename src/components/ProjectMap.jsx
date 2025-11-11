import React, { useEffect, useRef, useState } from "react";

const SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_API}&libraries=places`;

const DEPARTMENTS = [
  { key: "water", label: "Water", color: "#00A86B" },
  { key: "power", label: "Power", color: "#FF4C4C" },
  { key: "transport", label: "Transport", color: "#0077FF" },
  { key: "ndmc", label: "NDMC", color: "#3FC047" },
  { key: "pwd", label: "PWD", color: "#FFA500" },
  { key: "telecom", label: "Telecom", color: "#9C27B0" },
  { key: "housing", label: "Housing", color: "#607D8B" },
];

const POLYGON_DATA = [
  {
    id: 1,
    project: "Dwarka Sector 21 Metro Drainage Upgrade",
    department: "transport",
    area: "Dwarka Sector 21",
    progress: 62,
    size: "very_large",
    fillColor: "#FF4500",
    strokeColor: "#CC3700",
    coords: [
      { lat: 28.5945, lng: 77.0218 },
      { lat: 28.5978, lng: 77.0332 },
      { lat: 28.5999, lng: 77.0410 },
      { lat: 28.6042, lng: 77.0473 },
      { lat: 28.6081, lng: 77.0418 },
      { lat: 28.6029, lng: 77.0302 },
      { lat: 28.5972, lng: 77.0235 },
    ],
  },
  {
    id: 2,
    project: "Janakpuri Water Main Replacement",
    department: "water",
    area: "Janakpuri",
    progress: 78,
    size: "medium",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.6391, lng: 77.0810 },
      { lat: 28.6420, lng: 77.0851 },
      { lat: 28.6436, lng: 77.0902 },
      { lat: 28.6408, lng: 77.0927 },
      { lat: 28.6379, lng: 77.0891 },
      { lat: 28.6362, lng: 77.0840 },
    ],
  },
  {
    id: 3,
    project: "Karol Bagh CCTV & Lighting",
    department: "ndmc",
    area: "Karol Bagh",
    progress: 72,
    size: "large",
    fillColor: "#32CD32",
    strokeColor: "#228B22",
    coords: [
      { lat: 28.6510, lng: 77.1821 },
      { lat: 28.6544, lng: 77.1855 },
      { lat: 28.6562, lng: 77.1918 },
      { lat: 28.6539, lng: 77.1952 },
      { lat: 28.6505, lng: 77.1923 },
      { lat: 28.6489, lng: 77.1874 },
    ],
  },
  {
    id: 4,
    project: "Uttam Nagar Transformer Replacement",
    department: "power",
    area: "Uttam Nagar",
    progress: 45,
    size: "small",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.6388, lng: 77.0296 },
      { lat: 28.6413, lng: 77.0328 },
      { lat: 28.6405, lng: 77.0367 },
      { lat: 28.6374, lng: 77.0352 },
      { lat: 28.6369, lng: 77.0311 },
    ],
  },
  {
    id: 5,
    project: "Connaught Place Pedestrian Improvements",
    department: "pwd",
    area: "Connaught Place",
    progress: 88,
    size: "medium",
    fillColor: "#8A2BE2",
    strokeColor: "#5D1AB2",
    coords: [
      { lat: 28.6309, lng: 77.2133 },
      { lat: 28.6345, lng: 77.2188 },
      { lat: 28.6331, lng: 77.2231 },
      { lat: 28.6301, lng: 77.2225 },
      { lat: 28.6285, lng: 77.2180 },
    ],
  },
  {
    id: 6,
    project: "AIIMS Sewage Pump Station Rehabilitation",
    department: "water",
    area: "AIIMS",
    progress: 53,
    size: "small",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.5662, lng: 77.2098 },
      { lat: 28.5689, lng: 77.2121 },
      { lat: 28.5697, lng: 77.2154 },
      { lat: 28.5665, lng: 77.2170 },
      { lat: 28.5643, lng: 77.2131 },
    ],
  },
  {
    id: 7,
    project: "Hauz Khas Metro Corridor Surface Works",
    department: "transport",
    area: "Hauz Khas",
    progress: 36,
    size: "medium",
    fillColor: "#FF4500",
    strokeColor: "#CC3700",
    coords: [
      { lat: 28.5477, lng: 77.1914 },
      { lat: 28.5498, lng: 77.1932 },
      { lat: 28.5518, lng: 77.1961 },
      { lat: 28.5501, lng: 77.1987 },
      { lat: 28.5472, lng: 77.1965 },
      { lat: 28.5460, lng: 77.1933 },
    ],
  },
  {
    id: 8,
    project: "Lajpat Nagar Network Hub Maintenance",
    department: "telecom",
    area: "Lajpat Nagar",
    progress: 61,
    size: "small",
    fillColor: "#FF69B4",
    strokeColor: "#C71585",
    coords: [
      { lat: 28.5728, lng: 77.2460 },
      { lat: 28.5748, lng: 77.2476 },
      { lat: 28.5761, lng: 77.2505 },
      { lat: 28.5740, lng: 77.2528 },
      { lat: 28.5715, lng: 77.2503 },
      { lat: 28.5709, lng: 77.2472 },
    ],
  },
  {
    id: 9,
    project: "Rohini Drainage & Road Resurfacing",
    department: "pwd",
    area: "Rohini Sector 15",
    progress: 69,
    size: "very_large",
    fillColor: "#8A2BE2",
    strokeColor: "#5D1AB2",
    coords: [
      { lat: 28.7189, lng: 77.1054 },
      { lat: 28.7223, lng: 77.1099 },
      { lat: 28.7247, lng: 77.1145 },
      { lat: 28.7268, lng: 77.1181 },
      { lat: 28.7249, lng: 77.1228 },
      { lat: 28.7197, lng: 77.1210 },
      { lat: 28.7175, lng: 77.1135 },
    ],
  },
  {
    id: 10,
    project: "Pitampura Optical Fiber Laying",
    department: "telecom",
    area: "Pitampura",
    progress: 25,
    size: "medium",
    fillColor: "#FF69B4",
    strokeColor: "#C71585",
    coords: [
      { lat: 28.7011, lng: 77.1445 },
      { lat: 28.7039, lng: 77.1472 },
      { lat: 28.7051, lng: 77.1503 },
      { lat: 28.7034, lng: 77.1534 },
      { lat: 28.7008, lng: 77.1511 },
      { lat: 28.6992, lng: 77.1475 },
    ],
  },
  {
    id: 11,
    project: "Vasant Vihar Smart Lighting",
    department: "ndmc",
    area: "Vasant Vihar",
    progress: 82,
    size: "large",
    fillColor: "#32CD32",
    strokeColor: "#228B22",
    coords: [
      { lat: 28.5667, lng: 77.1749 },
      { lat: 28.5698, lng: 77.1772 },
      { lat: 28.5714, lng: 77.1805 },
      { lat: 28.5700, lng: 77.1834 },
      { lat: 28.5675, lng: 77.1820 },
      { lat: 28.5656, lng: 77.1791 },
    ],
  },
  {
    id: 12,
    project: "Okhla Phase II Flood Mitigation",
    department: "water",
    area: "Okhla Phase II",
    progress: 49,
    size: "medium",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.5515, lng: 77.2689 },
      { lat: 28.5538, lng: 77.2712 },
      { lat: 28.5554, lng: 77.2740 },
      { lat: 28.5535, lng: 77.2767 },
      { lat: 28.5507, lng: 77.2742 },
      { lat: 28.5496, lng: 77.2705 },
    ],
  },
  {
    id: 13,
    project: "Preet Vihar LED Replacement",
    department: "power",
    area: "Preet Vihar",
    progress: 91,
    size: "large",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.6510, lng: 77.2839 },
      { lat: 28.6541, lng: 77.2863 },
      { lat: 28.6560, lng: 77.2905 },
      { lat: 28.6540, lng: 77.2936 },
      { lat: 28.6509, lng: 77.2920 },
      { lat: 28.6494, lng: 77.2881 },
    ],
  },
  {
    id: 14,
    project: "Narela Digital Signage Deployment",
    department: "ndmc",
    area: "Narela",
    progress: 47,
    size: "small",
    fillColor: "#32CD32",
    strokeColor: "#228B22",
    coords: [
      { lat: 28.7208, lng: 77.2263 },
      { lat: 28.7225, lng: 77.2280 },
      { lat: 28.7239, lng: 77.2308 },
      { lat: 28.7220, lng: 77.2331 },
      { lat: 28.7199, lng: 77.2311 },
      { lat: 28.7193, lng: 77.2278 },
    ],
  },
  {
    id: 15,
    project: "Bawana Water Storage Upgrade",
    department: "water",
    area: "Bawana",
    progress: 74,
    size: "very_large",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.7061, lng: 77.1869 },
      { lat: 28.7090, lng: 77.1898 },
      { lat: 28.7115, lng: 77.1932 },
      { lat: 28.7129, lng: 77.1964 },
      { lat: 28.7108, lng: 77.1995 },
      { lat: 28.7069, lng: 77.1981 },
      { lat: 28.7050, lng: 77.1935 },
    ],
  },
  {
    id: 16,
    project: "Azadpur Substation Modernization",
    department: "power",
    area: "Azadpur",
    progress: 57,
    size: "medium",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.7092, lng: 77.1725 },
      { lat: 28.7117, lng: 77.1752 },
      { lat: 28.7135, lng: 77.1794 },
      { lat: 28.7106, lng: 77.1811 },
      { lat: 28.7081, lng: 77.1775 },
    ],
  },
  {
    id: 17,
    project: "Chandni Chowk Heritage Restoration",
    department: "pwd",
    area: "Chandni Chowk",
    progress: 96,
    size: "large",
    fillColor: "#8A2BE2",
    strokeColor: "#5D1AB2",
    coords: [
      { lat: 28.6578, lng: 77.2282 },
      { lat: 28.6601, lng: 77.2310 },
      { lat: 28.6627, lng: 77.2345 },
      { lat: 28.6604, lng: 77.2372 },
      { lat: 28.6571, lng: 77.2350 },
      { lat: 28.6555, lng: 77.2314 },
    ],
  },
  {
    id: 18,
    project: "Tilak Nagar Housing Redevelopment",
    department: "housing",
    area: "Tilak Nagar",
    progress: 51,
    size: "medium",
    fillColor: "#708090",
    strokeColor: "#4B4B4B",
    coords: [
      { lat: 28.6356, lng: 77.0762 },
      { lat: 28.6379, lng: 77.0795 },
      { lat: 28.6390, lng: 77.0833 },
      { lat: 28.6368, lng: 77.0854 },
      { lat: 28.6343, lng: 77.0819 },
    ],
  },
  {
    id: 19,
    project: "Kirti Nagar Sewage Line Upgrade",
    department: "water",
    area: "Kirti Nagar",
    progress: 63,
    size: "small",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.6531, lng: 77.1519 },
      { lat: 28.6552, lng: 77.1537 },
      { lat: 28.6563, lng: 77.1569 },
      { lat: 28.6536, lng: 77.1581 },
      { lat: 28.6519, lng: 77.1551 },
    ],
  },
  {
    id: 20,
    project: "Rajouri Garden Smart Bus Terminal",
    department: "transport",
    area: "Rajouri Garden",
    progress: 80,
    size: "large",
    fillColor: "#FF4500",
    strokeColor: "#CC3700",
    coords: [
      { lat: 28.6420, lng: 77.1233 },
      { lat: 28.6448, lng: 77.1264 },
      { lat: 28.6474, lng: 77.1298 },
      { lat: 28.6451, lng: 77.1332 },
      { lat: 28.6417, lng: 77.1314 },
      { lat: 28.6399, lng: 77.1270 },
    ],
  },
  {
    id: 21,
    project: "Saket E-Mobility Charging Stations",
    department: "power",
    area: "Saket",
    progress: 42,
    size: "medium",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.5196, lng: 77.2108 },
      { lat: 28.5220, lng: 77.2136 },
      { lat: 28.5231, lng: 77.2169 },
      { lat: 28.5202, lng: 77.2191 },
      { lat: 28.5179, lng: 77.2161 },
    ],
  },
  {
    id: 22,
    project: "Vivek Vihar Rainwater Harvesting",
    department: "water",
    area: "Vivek Vihar",
    progress: 70,
    size: "large",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.6673, lng: 77.3150 },
      { lat: 28.6700, lng: 77.3184 },
      { lat: 28.6715, lng: 77.3218 },
      { lat: 28.6686, lng: 77.3245 },
      { lat: 28.6662, lng: 77.3211 },
    ],
  },
  {
    id: 23,
    project: "Ashok Vihar Underground Cabling",
    department: "telecom",
    area: "Ashok Vihar",
    progress: 59,
    size: "medium",
    fillColor: "#FF69B4",
    strokeColor: "#C71585",
    coords: [
      { lat: 28.6868, lng: 77.1711 },
      { lat: 28.6891, lng: 77.1739 },
      { lat: 28.6905, lng: 77.1774 },
      { lat: 28.6878, lng: 77.1798 },
      { lat: 28.6855, lng: 77.1761 },
    ],
  },
  {
    id: 24,
    project: "Sarita Vihar Housing Expansion",
    department: "housing",
    area: "Sarita Vihar",
    progress: 48,
    size: "very_large",
    fillColor: "#708090",
    strokeColor: "#4B4B4B",
    coords: [
      { lat: 28.5264, lng: 77.2938 },
      { lat: 28.5289, lng: 77.2966 },
      { lat: 28.5318, lng: 77.2993 },
      { lat: 28.5341, lng: 77.3020 },
      { lat: 28.5322, lng: 77.3062 },
      { lat: 28.5274, lng: 77.3049 },
      { lat: 28.5249, lng: 77.2998 },
    ],
  },
  {
    id: 25,
    project: "Greater Kailash Smart Grid Pilot",
    department: "power",
    area: "Greater Kailash",
    progress: 67,
    size: "medium",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.5425, lng: 77.2398 },
      { lat: 28.5451, lng: 77.2425 },
      { lat: 28.5462, lng: 77.2463 },
      { lat: 28.5438, lng: 77.2481 },
      { lat: 28.5413, lng: 77.2450 },
    ],
  },
  {
    id: 26,
    project: "Mehrauli Archaeological Lighting",
    department: "ndmc",
    area: "Mehrauli",
    progress: 75,
    size: "large",
    fillColor: "#32CD32",
    strokeColor: "#228B22",
    coords: [
      { lat: 28.5194, lng: 77.1850 },
      { lat: 28.5216, lng: 77.1880 },
      { lat: 28.5234, lng: 77.1915 },
      { lat: 28.5203, lng: 77.1938 },
      { lat: 28.5178, lng: 77.1906 },
    ],
  },
  {
    id: 27,
    project: "Dwarka Sector 8 Power Line Upgrade",
    department: "power",
    area: "Dwarka Sector 8",
    progress: 64,
    size: "large",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.5761, lng: 77.0705 },
      { lat: 28.5789, lng: 77.0733 },
      { lat: 28.5802, lng: 77.0764 },
      { lat: 28.5780, lng: 77.0794 },
      { lat: 28.5748, lng: 77.0770 },
    ],
  },
  {
    id: 28,
    project: "Delhi Cantt Telecom Node Expansion",
    department: "telecom",
    area: "Delhi Cantonment",
    progress: 58,
    size: "medium",
    fillColor: "#FF69B4",
    strokeColor: "#C71585",
    coords: [
      { lat: 28.5863, lng: 77.1331 },
      { lat: 28.5888, lng: 77.1360 },
      { lat: 28.5905, lng: 77.1392 },
      { lat: 28.5879, lng: 77.1418 },
      { lat: 28.5852, lng: 77.1390 },
    ],
  },
  {
    id: 29,
    project: "Model Town Drain Rehabilitation",
    department: "water",
    area: "Model Town",
    progress: 77,
    size: "small",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.7038, lng: 77.1889 },
      { lat: 28.7055, lng: 77.1908 },
      { lat: 28.7064, lng: 77.1939 },
      { lat: 28.7039, lng: 77.1955 },
      { lat: 28.7020, lng: 77.1926 },
    ],
  },
  {
    id: 30,
    project: "Shahdara Flyover Strengthening",
    department: "pwd",
    area: "Shahdara",
    progress: 85,
    size: "very_large",
    fillColor: "#8A2BE2",
    strokeColor: "#5D1AB2",
    coords: [
      { lat: 28.6762, lng: 77.3194 },
      { lat: 28.6789, lng: 77.3223 },
      { lat: 28.6818, lng: 77.3258 },
      { lat: 28.6841, lng: 77.3284 },
      { lat: 28.6823, lng: 77.3321 },
      { lat: 28.6781, lng: 77.3309 },
      { lat: 28.6754, lng: 77.3265 },
    ],
  },
  {
    id: 31,
    project: "Malviya Nagar Underground Wiring",
    department: "telecom",
    area: "Malviya Nagar",
    progress: 68,
    size: "medium",
    fillColor: "#FF69B4",
    strokeColor: "#C71585",
    coords: [
      { lat: 28.5314, lng: 77.2165 },
      { lat: 28.5341, lng: 77.2187 },
      { lat: 28.5359, lng: 77.2216 },
      { lat: 28.5338, lng: 77.2240 },
      { lat: 28.5307, lng: 77.2215 },
    ],
  },
  {
    id: 32,
    project: "Jasola Water Recycling Plant",
    department: "water",
    area: "Jasola",
    progress: 55,
    size: "large",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.5301, lng: 77.2843 },
      { lat: 28.5334, lng: 77.2875 },
      { lat: 28.5358, lng: 77.2911 },
      { lat: 28.5331, lng: 77.2940 },
      { lat: 28.5299, lng: 77.2918 },
    ],
  },
  {
    id: 33,
    project: "Badarpur Solar Integration Yard",
    department: "power",
    area: "Badarpur",
    progress: 74,
    size: "very_large",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.4955, lng: 77.3167 },
      { lat: 28.4988, lng: 77.3192 },
      { lat: 28.5007, lng: 77.3224 },
      { lat: 28.4992, lng: 77.3256 },
      { lat: 28.4961, lng: 77.3238 },
      { lat: 28.4943, lng: 77.3201 },
    ],
  },
  {
    id: 34,
    project: "Najafgarh Sewer Expansion",
    department: "water",
    area: "Najafgarh",
    progress: 60,
    size: "very_large",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.6129, lng: 76.9815 },
      { lat: 28.6162, lng: 76.9846 },
      { lat: 28.6187, lng: 76.9885 },
      { lat: 28.6170, lng: 76.9918 },
      { lat: 28.6138, lng: 76.9893 },
      { lat: 28.6117, lng: 76.9854 },
    ],
  },
  {
    id: 35,
    project: "Palam Airport Access Road",
    department: "transport",
    area: "Palam",
    progress: 87,
    size: "large",
    fillColor: "#FF4500",
    strokeColor: "#CC3700",
    coords: [
      { lat: 28.5539, lng: 77.0905 },
      { lat: 28.5563, lng: 77.0931 },
      { lat: 28.5580, lng: 77.0964 },
      { lat: 28.5561, lng: 77.0990 },
      { lat: 28.5529, lng: 77.0972 },
    ],
  },
  {
    id: 36,
    project: "Dwarka Sector 14 Power Backup Facility",
    department: "power",
    area: "Dwarka Sector 14",
    progress: 63,
    size: "medium",
    fillColor: "#FFD700",
    strokeColor: "#B8860B",
    coords: [
      { lat: 28.5802, lng: 77.0515 },
      { lat: 28.5830, lng: 77.0543 },
      { lat: 28.5851, lng: 77.0571 },
      { lat: 28.5825, lng: 77.0595 },
      { lat: 28.5794, lng: 77.0567 },
    ],
  },
  {
    id: 37,
    project: "Rithala Water Treatment Modernization",
    department: "water",
    area: "Rithala",
    progress: 92,
    size: "very_large",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.7362, lng: 77.1045 },
      { lat: 28.7390, lng: 77.1072 },
      { lat: 28.7409, lng: 77.1115 },
      { lat: 28.7383, lng: 77.1148 },
      { lat: 28.7346, lng: 77.1119 },
    ],
  },
  {
    id: 38,
    project: "Mundka Metro Yard Road Work",
    department: "pwd",
    area: "Mundka",
    progress: 71,
    size: "large",
    fillColor: "#8A2BE2",
    strokeColor: "#5D1AB2",
    coords: [
      { lat: 28.6845, lng: 77.0114 },
      { lat: 28.6868, lng: 77.0146 },
      { lat: 28.6895, lng: 77.0170 },
      { lat: 28.6870, lng: 77.0198 },
      { lat: 28.6838, lng: 77.0173 },
    ],
  },
  {
    id: 39,
    project: "Seelampur Telecom Resilience Upgrade",
    department: "telecom",
    area: "Seelampur",
    progress: 46,
    size: "medium",
    fillColor: "#FF69B4",
    strokeColor: "#C71585",
    coords: [
      { lat: 28.6839, lng: 77.2755 },
      { lat: 28.6860, lng: 77.2781 },
      { lat: 28.6882, lng: 77.2812 },
      { lat: 28.6858, lng: 77.2838 },
      { lat: 28.6831, lng: 77.2809 },
    ],
  },
  {
    id: 40,
    project: "Dwarka Housing Cluster – Phase II",
    department: "housing",
    area: "Dwarka Sector 12",
    progress: 50,
    size: "very_large",
    fillColor: "#708090",
    strokeColor: "#4B4B4B",
    coords: [
      { lat: 28.5879, lng: 77.0613 },
      { lat: 28.5902, lng: 77.0645 },
      { lat: 28.5924, lng: 77.0680 },
      { lat: 28.5908, lng: 77.0709 },
      { lat: 28.5875, lng: 77.0692 },
      { lat: 28.5861, lng: 77.0658 },
    ],
  },
  {
    id: 41,
    project: "Kalkaji Flyover Beautification",
    department: "ndmc",
    area: "Kalkaji",
    progress: 88,
    size: "medium",
    fillColor: "#32CD32",
    strokeColor: "#228B22",
    coords: [
      { lat: 28.5483, lng: 77.2568 },
      { lat: 28.5509, lng: 77.2593 },
      { lat: 28.5535, lng: 77.2626 },
      { lat: 28.5508, lng: 77.2648 },
      { lat: 28.5479, lng: 77.2621 },
    ],
  },
  {
    id: 42,
    project: "Nehru Place Digital Communication Hub",
    department: "telecom",
    area: "Nehru Place",
    progress: 76,
    size: "large",
    fillColor: "#FF69B4",
    strokeColor: "#C71585",
    coords: [
      { lat: 28.5499, lng: 77.2495 },
      { lat: 28.5525, lng: 77.2521 },
      { lat: 28.5548, lng: 77.2553 },
      { lat: 28.5521, lng: 77.2579 },
      { lat: 28.5495, lng: 77.2550 },
    ],
  },
  {
    id: 43,
    project: "Keshav Puram Bridge Reinforcement",
    department: "pwd",
    area: "Keshav Puram",
    progress: 83,
    size: "large",
    fillColor: "#8A2BE2",
    strokeColor: "#5D1AB2",
    coords: [
      { lat: 28.6825, lng: 77.1574 },
      { lat: 28.6848, lng: 77.1601 },
      { lat: 28.6867, lng: 77.1638 },
      { lat: 28.6841, lng: 77.1665 },
      { lat: 28.6818, lng: 77.1633 },
    ],
  },
  {
    id: 44,
    project: "Dwarka Sector 18A Water Supply Boost",
    department: "water",
    area: "Dwarka Sector 18A",
    progress: 54,
    size: "large",
    fillColor: "#1E90FF",
    strokeColor: "#1565C0",
    coords: [
      { lat: 28.5691, lng: 77.0458 },
      { lat: 28.5717, lng: 77.0483 },
      { lat: 28.5738, lng: 77.0519 },
      { lat: 28.5712, lng: 77.0545 },
      { lat: 28.5685, lng: 77.0518 },
    ],
  },
  {
    id: 45,
    project: "Yamuna Vihar Residential Renewal",
    department: "housing",
    area: "Yamuna Vihar",
    progress: 66,
    size: "very_large",
    fillColor: "#708090",
    strokeColor: "#4B4B4B",
    coords: [
      { lat: 28.6988, lng: 77.2829 },
      { lat: 28.7011, lng: 77.2863 },
      { lat: 28.7035, lng: 77.2901 },
      { lat: 28.7010, lng: 77.2934 },
      { lat: 28.6978, lng: 77.2905 },
      { lat: 28.6960, lng: 77.2867 },
    ],
  },
];

export default function GoogleMapComponent() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [layers, setLayers] = useState({});
  const [visible, setVisible] = useState(() =>
    DEPARTMENTS.reduce((acc, d) => ({ ...acc, [d.key]: true }), {})
  );
  const [searchMarker, setSearchMarker] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setApiLoaded(true);
      return;
    }
    const existing = document.querySelector(`script[src^="${SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => setApiLoaded(true));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_URL;
    s.async = true;
    s.defer = true;
    s.onload = () => setApiLoaded(true);
    s.onerror = (e) => console.error("maps script error", e);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!apiLoaded || !mapRef.current || map) return;
    if (!window.google || !window.google.maps) return;

    const gmap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 28.6139, lng: 77.209 },
      zoom: 11,
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
    });
    setMap(gmap);

    const infoWindow = new window.google.maps.InfoWindow();
    const newLayers = {};

    DEPARTMENTS.forEach((d) => (newLayers[d.key] = []));

    POLYGON_DATA.forEach((p) => {
      const deptKey = p.department;
      const dept = DEPARTMENTS.find((d) => d.key === deptKey) || DEPARTMENTS[0];
      const polygon = new window.google.maps.Polygon({
        paths: p.coords,
        strokeColor: dept.color,
        strokeOpacity: 1,
        strokeWeight: 4,
        fillColor: dept.color,
        fillOpacity: 0.35,
      });

      polygon.setMap(gmap);

      const popupHtml = `
        <div style="font-family: Arial, sans-serif; min-width:180px">
          <div style="font-weight:700;font-size:14px;margin-bottom:6px">${p.project}</div>
          <div style="font-size:13px;margin-bottom:4px"><strong>Dept:</strong> ${dept.label}</div>
          <div style="font-size:13px;margin-bottom:6px"><strong>Area:</strong> ${p.area}</div>
          <div style="font-size:13px;margin-bottom:6px"><strong>Progress:</strong> ${p.progress}%</div>
          <div style="background:#eee;border-radius:6px;height:8px;width:100%;">
            <div style="width:${p.progress}%;height:8px;background:${p.progress>=80? '#00A86B' : p.progress>=50 ? '#FFD700' : '#FF4C4C'};border-radius:6px;"></div>
          </div>
        </div>
      `;

      polygon.addListener("mouseover", (e) => {
        infoWindow.setContent(popupHtml);
        infoWindow.setPosition(e.latLng);
        infoWindow.open(gmap);
      });
      polygon.addListener("mouseout", () => infoWindow.close());
      polygon.addListener("click", (e) => {
        // on click zoom slightly and show info
        infoWindow.setContent(popupHtml);
        infoWindow.setPosition(e.latLng);
        infoWindow.open(gmap);
        gmap.panTo(e.latLng);
        gmap.setZoom(Math.max(gmap.getZoom(), 13));
      });

      newLayers[deptKey].push(polygon);
    });

    setLayers(newLayers);

    if (inputRef.current && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.bindTo("bounds", gmap);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;
        if (searchMarker) searchMarker.setMap(null);
        const m = new window.google.maps.Marker({
          map: gmap,
          position: place.geometry.location,
          title: place.name,
        });
        setSearchMarker(m);
        if (place.geometry.viewport) gmap.fitBounds(place.geometry.viewport);
        else {
          gmap.setCenter(place.geometry.location);
          gmap.setZoom(14);
        }
      });
    }
  }, [apiLoaded, mapRef, map]);

  const toggle = (key) => {
    const newState = !visible[key];
    setVisible((s) => ({ ...s, [key]: newState }));
    if (!layers[key]) return;
    layers[key].forEach((poly) => poly.setMap(newState ? map : null));
  };

  const handleSearch = () => {
    if (!map || !inputRef.current) return;
    const q = inputRef.current.value.trim();
    if (!q) return;

    if (searchMarker) {
      searchMarker.setMap(null);
      setSearchMarker(null);
    }

    const tryGeocode = () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: q }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const loc = results[0].geometry.location;
          const m = new window.google.maps.Marker({ map, position: loc, title: results[0].formatted_address, animation: window.google.maps.Animation.DROP });
          setSearchMarker(m);
          map.setCenter(loc);
          map.setZoom(14);
        } else {
          alert("Location not found. Try a different query.");
        }
      });
    };

    if (window.google && window.google.maps && window.google.maps.places) {
      const serviceDiv = document.createElement("div");
      const service = new window.google.maps.places.PlacesService(serviceDiv);
      service.textSearch({ query: q }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results[0] && results[0].geometry && results[0].geometry.location) {
          const loc = results[0].geometry.location;
          const m = new window.google.maps.Marker({ map, position: loc, title: results[0].formatted_address || results[0].name, animation: window.google.maps.Animation.DROP });
          setSearchMarker(m);
          map.setCenter(loc);
          map.setZoom(14);
        } else {
          tryGeocode();
        }
      });
    } else {
      tryGeocode();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div style={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 60,
        background: "white",
        padding: 10,
        borderRadius: 10,
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        display: "flex",
        gap: 8,
        alignItems: "center",
        width: "min(420px, calc(100% - 24px))"
      }}>
        <input
          ref={inputRef}
          placeholder="Search place (e.g. Janakpuri, Connaught Place)..."
          style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e2e8f0", flex: 1, fontSize: 14 }}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
        />
        <button onClick={handleSearch} style={{ background: "#005da3", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
          Search
        </button>
      </div>

      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      <div style={{
        position: "absolute",
        right: 12,
        bottom: 12,
        zIndex: 60,
        background: "white",
        padding: 12,
        borderRadius: 10,
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        width: 220,
        fontFamily: "Arial, sans-serif",
        fontSize: 13
      }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Departments</div>
        {DEPARTMENTS.map((d) => (
          <label key={d.key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <input type="checkbox" checked={visible[d.key]} onChange={() => toggle(d.key)} />
            <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 6, background: d.color }} />
            <span>{d.label}</span>
          </label>
        ))}
        <div style={{ marginTop: 8, color: "#555", fontSize: 12 }}>
          Projects: <strong>{POLYGON_DATA.length}</strong>
        </div>
      </div>
    </div>
  );
}
