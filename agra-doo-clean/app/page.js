'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar'
import HomePage from '@/components/HomePage'
import CategoryPage from '@/components/CategoryPage'
import ModelPage from '@/components/ModelPage'
import AdminPage from '@/components/AdminPage'
import TypePage from '@/components/TypePage'

export default function Home() {
  const [currentView, setCurrentView] = useState('home')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [types, setTypes] = useState([])
  const [models, setModels] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchTypesForCategory(selectedCategory)
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedType) {
      fetchModelsForType(selectedType.id)
    }
  }, [selectedType])

  const fetchCategories = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('categories')
      .select('*, brands(name, logo_url)')
      .order('sort_order')
    
    if (data) {
      // Dodaj brand info v kategorijo
      const categoriesWithBrand = data.map(cat => ({
        ...cat,
        brand_name: cat.brands?.name || '',
        brand_logo: cat.brands?.logo_url || ''
      }))
      setCategories(categoriesWithBrand)
      if (categoriesWithBrand.length > 0 && !selectedCategory) {
        setSelectedCategory(categoriesWithBrand[0].id)
      }
    }
    setLoading(false)
  }

  const fetchTypesForCategory = async (categoryId) => {
    setLoading(true)
    const { data } = await supabase
      .from('types')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order')
    
    if (data) {
      // Dodaj število modelov za vsak tip
      const typesWithCount = await Promise.all(
        data.map(async (type) => {
          const { count } = await supabase
            .from('models')
            .select('*', { count: 'exact', head: true })
            .eq('type_id', type.id)
          return { ...type, model_count: count || 0 }
        })
      )
      setTypes(typesWithCount)
    }
    setLoading(false)
  }

  const fetchModelsForType = async (typeId) => {
    setLoading(true)
    const { data } = await supabase
      .from('models')
      .select('*')
      .eq('type_id', typeId)
      .order('sort_order')
    
    if (data) setModels(data)
    setLoading(false)
  }

  const getCategoryCount = (catId) => {
    return '→'
  }

  const getSelectedCategoryData = () => {
    return categories.find(c => c.id === selectedCategory)
  }

  const navigateToType = (type) => {
    setSelectedType(type)
    setCurrentView('type')
  }

  const navigateToCategory = () => {
    setSelectedType(null)
    setCurrentView('category')
  }

  return (
    <div className="min-h-screen bg-zinc-300">
      <Navigation 
        setCurrentView={setCurrentView}
        navigateToCategory={navigateToCategory}
        selectedCategory={getSelectedCategoryData()}
        selectedType={selectedType}
        currentView={currentView}
      />
      
      {currentView !== 'admin' && (
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(catId) => {
            setSelectedCategory(catId)
            setSelectedType(null)
            setCurrentView('category')
          }}
          currentView={currentView}
          setCurrentView={setCurrentView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          getCategoryCount={getCategoryCount}
        />
      )}
      
      {currentView === 'home' && (
        <HomePage setCurrentView={setCurrentView} />
      )}
      
      {currentView === 'category' && (
        <CategoryPage
          category={getSelectedCategoryData()}
          types={types}
          navigateToType={navigateToType}
          loading={loading}
        />
      )}

      {currentView === 'type' && (
        <TypePage
          type={selectedType}
          models={models}
          navigateToCategory={navigateToCategory}
          loading={loading}
        />
      )}
      
      {currentView === 'admin' && (
        <AdminPage
          categories={categories}
          fetchData={fetchCategories}
          setCurrentView={setCurrentView}
        />
      )}
    </div>
  )
}
