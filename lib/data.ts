export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'planning' | 'ongoing' | 'completed' | 'paused';
  category: 'infrastructure' | 'education' | 'health' | 'water' | 'energy' | 'other';
  budget: {
    total: number;
    spent: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    completionPercentage: number;
  };
  contractor: string;
  contact: string;
  email: string;
  photos: string[];
  updates: Array<{
    date: string;
    description: string;
  }>;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Jigawa State University Road Rehabilitation',
    description: 'Rehabilitation of the main access road to Jigawa State University including drainage and street lighting.',
    location: 'Dutse, Jigawa State',
    coordinates: { lat: 11.7667, lng: 9.3333 },
    status: 'ongoing',
    category: 'infrastructure',
    budget: {
      total: 250000000,
      spent: 145000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2023-06-15',
      endDate: '2024-12-31',
      completionPercentage: 58,
    },
    contractor: 'Premier Construction Ltd',
    contact: 'Mr. Ahmed Hassan',
    email: 'ahmed.hassan@premierconst.com',
    photos: [],
    updates: [
      {
        date: '2024-05-10',
        description: 'Completed Phase 2 - Drainage installation 95% done',
      },
      {
        date: '2024-03-22',
        description: 'Phase 1 road resurfacing completed on schedule',
      },
    ],
  },
  {
    id: '2',
    name: 'Hadejia Water Supply Project',
    description: 'Construction of new water treatment facility and distribution network serving 50,000 residents.',
    location: 'Hadejia, Jigawa State',
    coordinates: { lat: 12.4333, lng: 10.25 },
    status: 'completed',
    category: 'water',
    budget: {
      total: 180000000,
      spent: 180000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2022-09-01',
      endDate: '2024-03-15',
      completionPercentage: 100,
    },
    contractor: 'Aqua Solutions Nigeria',
    contact: 'Eng. Fatima Mohammed',
    email: 'fatima@aquasolutions.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-03-15',
        description: 'Project successfully completed and handed over',
      },
      {
        date: '2024-02-01',
        description: 'Final testing and commissioning of treatment plant',
      },
    ],
  },
  {
    id: '3',
    name: 'Gumel Primary Health Centre',
    description: 'Construction of new primary health centre with maternity ward and diagnostic facilities.',
    location: 'Gumel, Jigawa State',
    coordinates: { lat: 12.6333, lng: 9.8667 },
    status: 'ongoing',
    category: 'health',
    budget: {
      total: 95000000,
      spent: 62000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2023-11-20',
      endDate: '2024-10-30',
      completionPercentage: 65,
    },
    contractor: 'BuildRight Constructions',
    contact: 'Dr. Bashir Adamu',
    email: 'bashir.adamu@buildright.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-05-05',
        description: 'Structural work completed, electrical installation ongoing',
      },
      {
        date: '2024-02-14',
        description: 'Foundation completed, walls up to 3rd floor level',
      },
    ],
  },
  {
    id: '4',
    name: 'Kiyawa Secondary School Complex',
    description: 'Construction of new secondary school with 40 classrooms, laboratory, and library facilities.',
    location: 'Kiyawa, Jigawa State',
    coordinates: { lat: 11.5, lng: 10.5667 },
    status: 'planning',
    category: 'education',
    budget: {
      total: 320000000,
      spent: 12000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2024-07-01',
      endDate: '2025-12-31',
      completionPercentage: 5,
    },
    contractor: 'TBD - Tender under review',
    contact: 'Mr. Musa Ibrahim',
    email: 'musa.ibrahim@jigedu.gov.ng',
    photos: [],
    updates: [
      {
        date: '2024-05-12',
        description: 'Site survey and design finalization completed',
      },
    ],
  },
  {
    id: '5',
    name: 'Birnin Kudu Solar Power Installation',
    description: 'Installation of 100kW solar power system for government offices and public facilities.',
    location: 'Birnin Kudu, Jigawa State',
    coordinates: { lat: 11.1167, lng: 9.5833 },
    status: 'paused',
    category: 'energy',
    budget: {
      total: 75000000,
      spent: 42000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2023-08-10',
      endDate: '2024-08-10',
      completionPercentage: 55,
    },
    contractor: 'Green Energy Solutions Ltd',
    contact: 'Eng. Hauwa Sani',
    email: 'hauwa.sani@greensolar.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-04-20',
        description: 'Project temporarily paused pending equipment delivery',
      },
      {
        date: '2024-01-30',
        description: 'Foundation and structural work completed',
      },
    ],
  },
  {
    id: '6',
    name: 'Dutse Town Hall Renovation',
    description: 'Comprehensive renovation of historic town hall including architectural restoration and modern amenities.',
    location: 'Dutse, Jigawa State',
    coordinates: { lat: 11.7667, lng: 9.3333 },
    status: 'ongoing',
    category: 'infrastructure',
    budget: {
      total: 85000000,
      spent: 68000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2024-01-15',
      endDate: '2024-08-30',
      completionPercentage: 80,
    },
    contractor: 'Heritage Builders Inc',
    contact: 'Arch. Ibrahim Nura',
    email: 'ibrahim.nura@heritagebuild.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-05-08',
        description: 'Roofing and facade work nearing completion',
      },
      {
        date: '2024-03-20',
        description: 'Interior renovation and wiring systems installed',
      },
    ],
  },
  {
    id: '7',
    name: 'Gwiwa Market Rehabilitation',
    description: 'Rehabilitation of central market with improved drainage, storage facilities, and modern stalls.',
    location: 'Gwiwa, Jigawa State',
    coordinates: { lat: 12.2167, lng: 9.75 },
    status: 'completed',
    category: 'infrastructure',
    budget: {
      total: 55000000,
      spent: 55000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2023-05-01',
      endDate: '2024-02-28',
      completionPercentage: 100,
    },
    contractor: 'Market Development Solutions',
    contact: 'Mr. Salisu Abdullahi',
    email: 'salisu.abdullahi@mds.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-02-28',
        description: 'Project completed and opened for public use',
      },
    ],
  },
  {
    id: '8',
    name: 'Kazaure Agricultural Training Centre',
    description: 'Construction of modern agricultural training facility with demonstration farms and capacity building centre.',
    location: 'Kazaure, Jigawa State',
    coordinates: { lat: 11.8833, lng: 8.4167 },
    status: 'ongoing',
    category: 'education',
    budget: {
      total: 120000000,
      spent: 76000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2023-10-01',
      endDate: '2024-11-30',
      completionPercentage: 63,
    },
    contractor: 'AgriTech Constructions',
    contact: 'Dr. Shehu Yakubu',
    email: 'shehu.yakubu@agritech.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-04-30',
        description: 'Main building structure completed, equipment installation in progress',
      },
    ],
  },
  {
    id: '9',
    name: 'Jahun General Hospital Expansion',
    description: 'Expansion of existing general hospital with new surgical ward, ICU, and diagnostic center.',
    location: 'Jahun, Jigawa State',
    coordinates: { lat: 12.1167, lng: 10.75 },
    status: 'ongoing',
    category: 'health',
    budget: {
      total: 280000000,
      spent: 156000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2023-07-01',
      endDate: '2025-06-30',
      completionPercentage: 56,
    },
    contractor: 'Healthcare Infrastructure Ltd',
    contact: 'Dr. Aisha Muhammadu',
    email: 'aisha.muhammadu@healthcareinfra.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-05-15',
        description: 'Surgical ward and ICU construction at 75% completion',
      },
      {
        date: '2024-02-20',
        description: 'Foundation and structural framework completed',
      },
    ],
  },
  {
    id: '10',
    name: 'Maigatari Youth Development Centre',
    description: 'Construction of multi-purpose youth centre with sports facilities, digital skills training, and recreational amenities.',
    location: 'Maigatari, Jigawa State',
    coordinates: { lat: 12.65, lng: 10.0667 },
    status: 'ongoing',
    category: 'other',
    budget: {
      total: 95000000,
      spent: 38000000,
      currency: 'NGN',
    },
    timeline: {
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      completionPercentage: 40,
    },
    contractor: 'Youth Solutions Builders',
    contact: 'Mr. Lawal Hassan',
    email: 'lawal.hassan@youthsol.com.ng',
    photos: [],
    updates: [
      {
        date: '2024-05-02',
        description: 'Main sports complex structure erected, interior work ongoing',
      },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter((p) => p.status === status);
}

export const statusLabels: Record<Project['status'], string> = {
  planning: 'Planning',
  ongoing: 'Ongoing',
  completed: 'Completed',
  paused: 'Paused',
};

export const categoryLabels: Record<Project['category'], string> = {
  infrastructure: 'Infrastructure',
  education: 'Education',
  health: 'Health',
  water: 'Water & Sanitation',
  energy: 'Energy',
  other: 'Other',
};

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'infographic-1',
    title: 'Project Impact Dashboard',
    description: 'Visual summary of project milestones, budgets, and citizen insights.',
    image: '/infographic-1.svg',
  },
  {
    id: 'infographic-2',
    title: 'Funding Allocation Overview',
    description: 'Clear breakdown of budget, spend and planned allocations.',
    image: '/infographic-2.svg',
  },
  {
    id: 'infographic-3',
    title: 'Project Timeline Summary',
    description: 'Timeline visualization for deadlines and progress stages.',
    image: '/infographic-3.svg',
  },
  {
    id: 'infographic-4',
    title: 'Community Impact Report',
    description: 'Infographic highlighting the local benefits of each project.',
    image: '/infographic-4.svg',
  },
];

export interface Feedback {
  id: string;
  projectId: string;
  projectName: string;
  rating: number;
  comment: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'resolved';
  email: string;
}

export const feedbacks: Feedback[] = [
  {
    id: '1',
    projectId: 'proj-001',
    projectName: 'Jigawa-Kano Highway Rehabilitation',
    rating: 4,
    comment: 'Good progress on the road construction. Looking forward to completion.',
    submittedAt: '2024-05-08',
    status: 'reviewed',
    email: 'citizen1@example.com',
  },
  {
    id: '2',
    projectId: 'proj-003',
    projectName: 'Jigawa Teaching Hospital Upgrade',
    rating: 3,
    comment: 'Hospital equipment installation is slow. Need to speed up.',
    submittedAt: '2024-05-07',
    status: 'pending',
    email: 'citizen2@example.com',
  },
  {
    id: '3',
    projectId: 'proj-005',
    projectName: 'Water Supply to Rural Communities',
    rating: 5,
    comment: 'Excellent work! The water system is functioning perfectly.',
    submittedAt: '2024-05-06',
    status: 'resolved',
    email: 'citizen3@example.com',
  },
  {
    id: '4',
    projectId: 'proj-002',
    projectName: 'Maiduguri-Damaturu Road Expansion',
    rating: 2,
    comment: 'Project seems to be stalled. No progress in the last month.',
    submittedAt: '2024-05-05',
    status: 'pending',
    email: 'citizen4@example.com',
  },
  {
    id: '5',
    projectId: 'proj-007',
    projectName: 'Solar Power Installation - Dutse',
    rating: 4,
    comment: 'Solar panels installation is on track. Great initiative!',
    submittedAt: '2024-05-04',
    status: 'reviewed',
    email: 'citizen5@example.com',
  },
];
