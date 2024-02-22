'use client'
import { useState, useEffect } from "react";
import CompanyInfo from './CompanyInfo';
import AdminDashboardForm from './AdminDashboardForm';
import { ClientFormData } from '@/lib/interfaces';

const AdminDashboard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>({} as ClientFormData);
  // const [mappedData, setMappedData] = useState({});

  // FTM-2 / FTM-20 9. Fetch client info
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('/api/client');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Set form data with fetched values
        setFormData(data)
        // console.log(data, 'Set form data with fetched values');
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    // Call fetchData when the component mounts
    fetchData();
  }, [setFormData]);

  // FTM-2 / FTM-20 10.
  return (
    <section className="flex flex-col w-full">
      {isEditMode ? (
      <div className='flex flex-col mx-auto w-full'>
        <AdminDashboardForm  setFormData={setFormData} formData={formData} setIsEditMode={setIsEditMode} />
      </div>
      ) : ( 
      <div className='w-full'>
        <div className="flex flex-row mx-auto w-full">
          <CompanyInfo formData={formData} setIsEditMode={setIsEditMode} />
        </div>
      </div>
      )}
    </section>
  )
}

export default AdminDashboard;
