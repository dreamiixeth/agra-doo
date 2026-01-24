'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar'
import HomePage from '@/components/HomePage'
import CategoryPage from '@/components/CategoryPage'
import TypePage from '@/components/TypePage'
import AdminPage from '@/components/AdminPage'

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
      fetchTypesForCategory(selectedCategory.id)
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
      .select('*')
      .order('sort_order')
    
    if (data) {
      const categoriesWithBrand = data.map(cat => ({
        ...cat,
   if (data) {
  setCategories(data)
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

  // Navigacija na kategorijo
  const navigateToCategory = (category) => {
    setSelectedCategory(category)
    setSelectedType(null)
    setCurrentView('category')
    setSidebarOpen(false)
  }

  // Navigacija na tip
  const navigateToType = (type) => {
    setSelectedType(type)
    setCurrentView('type')
  }

  // Navigacija domov
  const navigateHome = () => {
    setSelectedCategory(null)
    setSelectedType(null)
    setCurrentView('home')
  }

  // Navigacija nazaj
  const navigateBack = () => {
    if (currentView === 'type') {
      setSelectedType(null)
      setCurrentView('category')
    } else if (currentView === 'category') {
      setSelectedCategory(null)
      setCurrentView('home')
    } else {
      navigateHome()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-300">
      <Navigation 
        currentView={currentView}
        navigateHome={navigateHome}
        navigateBack={navigateBack}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        setCurrentView={setCurrentView}
      />
      
      {currentView !== 'admin' && currentView !== 'home' && (
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          navigateToCategory={navigateToCategory}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}
      
      {currentView === 'home' && (
        <HomePage 
          categories={categories}
          navigateToCategory={navigateToCategory}
        />
      )}
      
      {currentView === 'category' && selectedCategory && (
        <CategoryPage
          category={selectedCategory}
          types={types}
          navigateToType={navigateToType}
          loading={loading}
        />
      )}

      {currentView === 'type' && selectedType && (
        <TypePage
          type={selectedType}
          models={models}
          navigateToCategory={() => {
            setSelectedType(null)
            setCurrentView('category')
          }}
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
