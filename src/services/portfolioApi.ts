import axios from 'axios';

const API_BASE_URL = 'https://dsagredo-ms-production.up.railway.app/portfolio-ms';

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

const portfolioApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPortfolioProjects = async (): Promise<PortfolioProject[]> => {
  const response = await portfolioApi.get<PortfolioProject[]>('');
  return response.data;
};

export const getPortfolioProjectById = async (id: string): Promise<PortfolioProject> => {
  const response = await portfolioApi.get<PortfolioProject>(`/${id}`);
  return response.data;
};

export default portfolioApi;
