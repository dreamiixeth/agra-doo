'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const ADMIN_PASSWORD = 'agra2024'

export default function AdminPage({ categories, fetchCategories }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('types')
  const [types, setTypes] = useState([])
  const [models, setModels] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [message, setMessage] = useState(null)

  // Naloži podatke
  useEffect(() => {
    if (isAuthenticated && selectedCategory) {
      fetchTypes()
    }
  }, [isAuthenticated, selectedCategory])

  useEffect(() => {
    if (isAuthenticated && selectedType) {
      fetchModels()
    }
  }, [isAuthenticated, selectedType])

  const fetchTypes = async () => {
    const { data } = await supabase
      .from('types')
      .select('*')
      .eq('category_id', selectedCategory.id)
      .order('sort_order')
    if (data) setTypes(data)
  }

  const fetchModels = async () => {
    const { data } = await supabase
      .from('models')
      .select('*')
      .eq('type_id', selectedType.id)
      .order('sort_order')
    if (data) setModels(data)
  }

  // Login
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setMessage({ type: 'success', text: 'Uspešna prijava!' })
    } else {
      setMessage({ type: 'error', text: 'Napačno geslo!' })
    }
  }

  // Shrani vrsto
  const saveType = async (typeData) => {
    const slug = typeData.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    if (typeData.id) {
      // Update
      const { error } = await supabase
        .from('types')
        .update({ ...typeData, slug })
        .eq('id', typeData.id)
      
      if (error) {
        setMessage({ type: 'error', text: 'Napaka: ' + error.message })
      } else {
        setMessage({ type: 'success', text: 'Vrsta posodobljena!' })
        fetchTypes()
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('types')
        .insert({ ...typeData, slug, category_id: selectedCategory.id })
      
      if (error) {
        setMessage({ type: 'error', text: 'Napaka: ' + error.message })
      } else {
        setMessage({ type: 'success', text: 'Vrsta dodana!' })
        fetchTypes()
      }
    }
    setEditingItem(null)
  }

  // Shrani model
  const saveModel = async (modelData) => {
    const slug = modelData.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // Parse specifications from JSON string if needed
    let specs = modelData.specifications
    if (typeof specs === 'string') {
      try {
        specs = JSON.parse(specs)
      } catch {
        specs = {}
      }
    }

    // Parse optional equipment from comma-separated string
    let equipment = modelData.optional_equipment
    if (typeof equipment === 'string') {
      equipment = equipment.split(',').map(s => s.trim()).filter(Boolean)
    }

    const dataToSave = {
      ...modelData,
      slug,
      specifications: specs,
      optional_equipment: equipment,
      price: modelData.price ? parseFloat(modelData.price) : null,
      price_with_vat: modelData.price_with_vat ? parseFloat(modelData.price_with_vat) : null,
    }

    if (modelData.id) {
      const { error } = await supabase
        .from('models')
        .update(dataToSave)
        .eq('id', modelData.id)
      
      if (error) {
        setMessage({ type: 'error', text: 'Napaka: ' + error.message })
      } else {
        setMessage({ type: 'success', text: 'Model posodobljen!' })
        fetchModels()
      }
    } else {
      const { error } = await supabase
        .from('models')
        .insert({ ...dataToSave, type_id: selectedType.id })
      
      if (error) {
        setMessage({ type: 'error', text: 'Napaka: ' + error.message })
      } else {
        setMessage({ type: 'success', text: 'Model dodan!' })
        fetchModels()
      }
    }
    setEditingItem(null)
  }

  // Delete
  const deleteItem = async (table, id) => {
    if (!confirm('Ali ste prepričani?')) return
    
    const { error } = await supabase.from(table).delete().eq('id', id)
    
    if (error) {
      setMessage({ type: 'error', text: 'Napaka: ' + error.message })
    } else {
      setMessage({ type: 'success', text: 'Izbrisano!' })
      if (table === 'types') fetchTypes()
      else fetchModels()
    }
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-zinc-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-center">Admin prijava</h2>
          
          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message.text}
            </div>
          )}
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Geslo"
            className="w-full p-3 border border-zinc-300 rounded-lg mb-4"
          />
          
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            Prijava
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-800 mb-6">Admin panel</h1>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Kategorija izbira */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Izberi kategorijo:
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat)
                  setSelectedType(null)
                  setTypes([])
                  setModels([])
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory?.id === cat.id
                    ? 'bg-green-700 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('types')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'types' ? 'bg-green-700 text-white' : 'bg-white text-zinc-700'
                }`}
              >
                Vrste ({types.length})
              </button>
              <button
                onClick={() => setActiveTab('models')}
                disabled={!selectedType}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'models' ? 'bg-green-700 text-white' : 'bg-white text-zinc-700'
                } ${!selectedType ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Modeli ({models.length})
              </button>
            </div>

            {/* Types tab */}
            {activeTab === 'types' && (
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Vrste - {selectedCategory.name}</h2>
                  <button
                    onClick={() => setEditingItem({ name: '', description: '', image_url: '', sort_order: types.length })}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                  >
                    + Nova vrsta
                  </button>
                </div>

                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                      <div 
                        className="flex-1 cursor-pointer hover:text-green-700"
                        onClick={() => {
                          setSelectedType(type)
                          setActiveTab('models')
                        }}
                      >
                        <p className="font-medium">{type.name}</p>
                        <p className="text-sm text-zinc-500">{type.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingItem(type)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteItem('types', type.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Models tab */}
            {activeTab === 'models' && selectedType && (
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Modeli - {selectedType.name}</h2>
                  <button
                    onClick={() => setEditingItem({ 
                      name: '', 
                      description: '', 
                      specifications: '{}',
                      optional_equipment: '',
                      image_url: '', 
                      price: '',
                      price_with_vat: '',
                      sort_order: models.length,
                      is_active: true
                    })}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                  >
                    + Nov model
                  </button>
                </div>

                <div className="space-y-2">
                  {models.map((model) => (
                    <div key={model.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{model.name}</p>
                        <p className="text-sm text-zinc-500">
                          {model.price_with_vat && `€${model.price_with_vat}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingItem({
                            ...model,
                            specifications: JSON.stringify(model.specifications || {}, null, 2),
                            optional_equipment: (model.optional_equipment || []).join(', ')
                          })}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteItem('models', model.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Edit modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingItem.id ? 'Uredi' : 'Dodaj'} {activeTab === 'types' ? 'vrsto' : 'model'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                if (activeTab === 'types') {
                  saveType(editingItem)
                } else {
                  saveModel(editingItem)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ime *</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Opis</label>
                    <textarea
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">URL slike</label>
                    <input
                      type="url"
                      value={editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({...editingItem, image_url: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  {activeTab === 'models' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Specifikacije (JSON)
                        </label>
                        <textarea
                          value={editingItem.specifications || '{}'}
                          onChange={(e) => setEditingItem({...editingItem, specifications: e.target.value})}
                          className="w-full p-2 border rounded-lg font-mono text-sm"
                          rows={5}
                          placeholder='{"dolzina": "2500 mm", "sirina": "1300 mm"}'
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Opcijska oprema (ločeno z vejico)
                        </label>
                        <textarea
                          value={editingItem.optional_equipment || ''}
                          onChange={(e) => setEditingItem({...editingItem, optional_equipment: e.target.value})}
                          className="w-full p-2 border rounded-lg"
                          rows={2}
                          placeholder="Klimatska naprava, Bluetooth radio, LED luči"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Cena brez DDV (€)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={editingItem.price || ''}
                            onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Cena z DDV (€)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={editingItem.price_with_vat || ''}
                            onChange={(e) => setEditingItem({...editingItem, price_with_vat: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Vrstni red</label>
                    <input
                      type="number"
                      value={editingItem.sort_order || 0}
                      onChange={(e) => setEditingItem({...editingItem, sort_order: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
                  >
                    Shrani
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="flex-1 bg-zinc-200 text-zinc-700 py-2 rounded-lg hover:bg-zinc-300"
                  >
                    Prekliči
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
