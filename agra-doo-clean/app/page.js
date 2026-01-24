'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar'
import HomePage from '@/components/HomePage'
import CategoryPage from '@/components/CategoryPage'
import TypePage from '@/components/TypePage'
import ModelPage from '@/components/ModelPage'
import AdminPage from '@/components/AdminPage'

export default function Home() {
  // Stanja
  const [currentView, setCurrentView] = useState('home')
  const [categories, setCategories] = useState([])
  const [types, setTypes] = useState([])
  const [models, setModels] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Naloži podatke ob zagonu
  useEffect(() => {
    fetchCategories()
  }, [])

  // Funkcije za nalaganje podatkov
  const fetchCategories = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    
    if (data) setCategories(data)
    setLoading(false)
  }

  const fetchTypes = async (categoryId) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('types')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order')
    
    if (data) setTypes(data)
    setLoading(false)
  }

  const fetchModels = async (typeId) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .eq('type_id', typeId)
      .eq('is_active', true)
      .order('sort_order')
    
    if (data) setModels(data)
    setLoading(false)
  }

  // Navigacija
  const navigateToCategory = async (category) => {
    setSelectedCategory(category)
    await fetchTypes(category.id)
    setCurrentView('category')
    setSidebarOpen(false)
  }

  const navigateToType = async (type) => {
    setSelectedType(type)
    await fetchModels(type.id)
    setCurrentView('type')
  }

  const navigateToModel = (model) => {
    setSelectedModel(model)
    setCurrentView('model')
  }

  const navigateHome = () => {
    setCurrentView('home')
    setSelectedCategory(null)
    setSelectedType(null)
    setSelectedModel(null)
  }

  const navigateBack = () => {
    if (currentView === 'model') {
      setCurrentView('type')
      setSelectedModel(null)
    } else if (currentView === 'type') {
      setCurrentView('category')
      setSelectedType(null)
    } else if (currentView === 'category') {
      navigateHome()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <Navigation 
        currentView={currentView}
        navigateHome={navigateHome}
        navigateBack={navigateBack}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        setCurrentView={setCurrentView}
      />
      
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        navigateToCategory={navigateToCategory}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <main className="lg:ml-64 min-h-screen">
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
            category={selectedCategory}
            models={models}
            navigateToModel={navigateToModel}
            navigateBack={navigateBack}
            loading={loading}
          />
        )}
        
        {currentView === 'model' && selectedModel && (
          <ModelPage
            model={selectedModel}
            type={selectedType}
            category={selectedCategory}
            navigateBack={navigateBack}
          />
        )}
        
        {currentView === 'admin' && (
          <AdminPage
            categories={categories}
            fetchCategories={fetchCategories}
          />
        )}
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
