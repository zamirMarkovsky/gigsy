
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // New States for Filters
    const [selectedDateFilter, setSelectedDateFilter] = useState('all'); // 'all', 'today', 'weekend'
    const [selectedLocationFilter, setSelectedLocationFilter] = useState('all'); // 'all', 'center', 'north', 'south'

    return (
        <FilterContext.Provider value={{
            searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            selectedDateFilter,
            setSelectedDateFilter,
            selectedLocationFilter,
            setSelectedLocationFilter
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
