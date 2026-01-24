'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar'
import HomePage from '@/components/HomePage'
import CatalogPage from '@/components/CatalogPage'
import MachinePage from '@/components/MachinePage'
import AdminPage from '@/components/AdminPage'
import NewEquipmentCatalog from '@/components/NewEquipmentCatalog'

// Kategorije za nove stroje (Pöttinger katalog) - te uporabljajo types/models
const NEW_EQUIPMENT_SLUGS = ['kosilnice', 'zgrabljalniki', 'obracalniki', 'balirke', 'samonakladalne-prikolice']

export default function Home() {
  const [currentView, setCurrentView] = useState('home')
  const [machines, setMachines] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedMachine, setSelectedMachine] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [filterBrand, setFilterBrand] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    
    const { data: brandsData } = await supabase
      .from('brands')
      .select('*')
      .order('name')
    
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    
    const { data: machinesData } = await supabase
      .from('machines')
      .select(`
        *,
        brands(name),
        categories(name, icon)
      `)
      .order('created_at', { ascending: false })

    if (brandsData) setBrands(brandsData)
    if (categoriesData) {
      setCategories(categoriesData)
      if (categoriesData.length > 0 && !selectedCategory) {
        setSelectedCategory(categoriesData[0].id)
      }
    }
    if (machinesData) setMachines(machinesData)
    
    setLoading(false)
  }

  // Preveri ali je kategorija za nove stroje (Pöttinger katalog)
  const isNewEquipmentCategory = (catId) => {
    const category = categories.find(c => c.id === catId)
    return category && NEW_EQUIPMENT_SLUGS.includes(category.slug)
  }

  const getCategoryCount = (catId) => {
    if (isNewEquipmentCategory(catId)) {
      return '→' // Puščica za kategorije novih strojev
    }
    return machines.filter(m => m.category_id === catId && !m.sold).length
  }

  const getSelectedCategoryData = () => {
    return categories.find(c => c.id === selectedCategory)
  }

  return (
    <div className="min-h-screen bg-zinc-300">
      <Navigation 
        setCurrentView={setCurrentView} 
        mobileMenuOpen={false}
      />
      
      {currentView !== 'admin' && (
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          currentView={currentView}
          setCurrentView={setCurrentView}
          setFilterBrand={setFilterBrand}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          getCategoryCount={getCategoryCount}
        />
      )}
      
      {currentView === 'home' && (
        <HomePage setCurrentView={setCurrentView} />
      )}
      
      {/* Katalog za rabljene stroje */}
      {currentView === 'catalog' && !isNewEquipmentCategory(selectedCategory) && (
        <CatalogPage
          machines={machines}
          brands={brands}
          categories={categories}
          selectedCategory={selectedCategory}
          filterBrand={filterBrand}
          setFilterBrand={setFilterBrand}
          setSelectedMachine={setSelectedMachine}
          setCurrentView={setCurrentView}
          loading={loading}
        />
      )}

      {/* Katalog za nove stroje (Pöttinger) z navigacijo po skupinah */}
      {currentView === 'catalog' && isNewEquipmentCategory(selectedCategory) && (
        <NewEquipmentCatalog
          categoryId={selectedCategory}
          categoryName={getSelectedCategoryData()?.name || ''}
          categorySlug={getSelectedCategoryData()?.slug || ''}
          setCurrentView={setCurrentView}
        />
      )}
      
      {currentView === 'machine' && (
        <MachinePage
          machine={selectedMachine}
          setCurrentView={setCurrentView}
        />
      )}
      
      {currentView === 'admin' && (
        <AdminPage
          machines={machines}
          brands={brands}
          categories={categories}
          fetchData={fetchData}
          setCurrentView={setCurrentView}
        />
      )}
    </div>
  )
}
