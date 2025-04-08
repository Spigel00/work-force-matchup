
import { JobPosting, WorkerProfile, EmployerProfile, User } from "@/types/models";

interface StoredData {
  users: User[];
  workers: WorkerProfile[];
  employers: EmployerProfile[];
  jobs: JobPosting[];
}

// Function to save data to localStorage
export const saveDataToStorage = (data: StoredData): void => {
  try {
    localStorage.setItem('blueCollarData', JSON.stringify(data));
    console.log('Data saved to local storage');
    
    // Also download as JSON file
    downloadAsJsonFile(data);
  } catch (error) {
    console.error('Error saving data to storage:', error);
  }
};

// Function to load data from localStorage
export const loadDataFromStorage = (): StoredData | null => {
  try {
    const storedData = localStorage.getItem('blueCollarData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Error loading data from storage:', error);
    return null;
  }
};

// Function to download data as a JSON file
export const downloadAsJsonFile = (data: StoredData): void => {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blueCollarData.json';
    
    // Append to the document, click and remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Release the object URL
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON file:', error);
  }
};

// Function to manually download current data as JSON
export const exportDataAsJson = (
  users: User[],
  workers: WorkerProfile[],
  employers: EmployerProfile[],
  jobs: JobPosting[]
): void => {
  const data: StoredData = { users, workers, employers, jobs };
  downloadAsJsonFile(data);
};
