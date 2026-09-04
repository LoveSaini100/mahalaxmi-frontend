import React from 'react';
import PropertyForm from '../../components/admin/PropertyForm';
import SEO from '../../components/common/SEO';

const AdminPropertyCreatePage = () => {
  return (
    <>
      <SEO title="Add New Property - Mahalaxmi Admin" />
      <PropertyForm isEdit={false} />
    </>
  );
};

export default AdminPropertyCreatePage;
