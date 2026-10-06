import React from 'react';
import PropertyForm from '../../components/admin/PropertyForm';
import SEO from '../../components/common/SEO';

const AdminPropertyCreatePage = () => {
  return (
    <>
      <SEO title="Add New Property - Shree Mahalaxmi Properties & Construction (SMPC)" />
      <PropertyForm isEdit={false} />
    </>
  );
};

export default AdminPropertyCreatePage;
