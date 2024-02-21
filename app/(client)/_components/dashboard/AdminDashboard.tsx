'use client'
import { useState } from "react";
import CompanyInfo from './CompanyInfo';
import AdminDashboardForm from './AdminDashboardForm';

const AdminDashboard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  return (
    <section className="flex flex-col w-full">
      {isEditMode ? (
      <div className='flex flex-col mx-auto w-full'>
        <AdminDashboardForm  setFormData={setFormData} setIsEditMode={setIsEditMode} />
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
