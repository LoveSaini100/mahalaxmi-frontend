import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPropertyBySlugThunk } from '../../store/slices/propertySlice';
import PropertyForm from '../../components/admin/PropertyForm';
import SEO from '../../components/common/SEO';
import { PropertyDetailsSkeleton } from '../../components/common/Skeleton';

const AdminPropertyEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProperty: property, detailLoading } = useSelector((state) => state.properties);

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyBySlugThunk(id));
    }
  }, [dispatch, id]);

  if (detailLoading || !property) {
    return <PropertyDetailsSkeleton />;
  }

  return (
    <>
      <SEO title={`Edit ${property.title} - Mahalaxmi Admin`} />
      <PropertyForm initialData={property} isEdit={true} />
    </>
  );
};

export default AdminPropertyEditPage;
