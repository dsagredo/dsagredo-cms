import axios from 'axios';

const API_BASE_URL = 'https://dsagredo-ms-production.up.railway.app/portfolio-ms';
const API_ADD_URL = 'https://dsagredo-ms-production.up.railway.app/portfolio-add-ms';
const API_DELETE_URL = 'https://dsagredo-ms-production.up.railway.app/portfolio-delete-ms';
const API_UPDATE_URL = 'https://dsagredo-ms-production.up.railway.app/portfolio-edit-ms';

export interface PortfolioProject {
  _id: string;
  title: string;
  description: string;
  imagen: string;
  published: boolean;
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  demo: string;
  github: string;
  updatedAt: string;
}

export interface CreatePortfolioProject {
  title: string;
  description: string;
  imagen: string;
  published: boolean;
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  demo: string;
  github: string;
}

const projectUrl = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = async (): Promise<PortfolioProject[]> => {
  const response = await axios.get<PortfolioProject[]>('');
  return response.data;
};

export const getProjectById = async (id: string): Promise<PortfolioProject> => {
  const response = await axios.get<PortfolioProject>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createProject = async (project: CreatePortfolioProject): Promise<PortfolioProject> => {
  const response = await axios.post<PortfolioProject>(API_ADD_URL, project, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateProject = async (id: string, project: Partial<CreatePortfolioProject>): Promise<PortfolioProject> => {
  const response = await axios.put<PortfolioProject>(`${API_UPDATE_URL}/${id}`, project, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete(`${API_DELETE_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default projectUrl;
