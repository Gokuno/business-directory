import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import RNPickerSelect from 'react-native-picker-select'
import { collection, doc, getDocs, query, addDoc } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AddBusiness() {
  const navigation = useNavigation()

  const { user } = useUser();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    contacto: '',
    correo: '',
    descripcion: '',
    category: ''
  })
  const [image, setImage] = useState(null)
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Agrega Nuevo Negocio',
      headerShown: true,
    })
    getCategoryList()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida'
    }
    if (!formData.contacto.trim()) {
      newErrors.contacto = 'El número de contacto es requerido'
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo electrónico es requerido'
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida'
    }
    if (!formData.category) {
      newErrors.category = 'La categoría es requerida'
    }
    if (!image) {
      newErrors.image = 'La imagen es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (!permissionResult.granted) {
        Alert.alert('Error', 'Se necesita permiso para acceder a la galería')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1]
      })

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri)
        // Clear image error if exists
        setErrors(prev => ({...prev, image: null}))
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la imagen')
      console.error('Image picker error:', error)
    }
  }

  const getCategoryList = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'Category'))
      const snapShot = await getDocs(q)
      
      const categories = []
      snapShot.forEach((doc) => {
        const data = doc.data()
        categories.push({
          label: data.name,
          value: data.name
        })
      })
      
      setCategoryList(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      Alert.alert('Error', 'No se pudieron cargar las categorías')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos')
      return
    }

    setLoading(true)
    try {
      // Here you would typically:
      // 1. Upload the image to storage
      // 2. Get the image URL
      // 3. Save the business data to Firestore
      
      const businessData = {
        ...formData,
        imageUrl: image, // This should be the uploaded image URL in production
        createdAt: new Date(),
        userEmail: user?.primaryEmailAddress?.emailAddress, // Make sure to import useUser from clerk
      }

      await addDoc(collection(db, 'BusinessList'), businessData)
      
      Alert.alert('Éxito', 'Negocio agregado exitosamente', [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ])
    } catch (error) {
      console.error('Error saving business:', error)
      Alert.alert('Error', 'No se pudo guardar el negocio')
    } finally {
      setLoading(false)
    }
  }

  const renderTextInput = (placeholder, field, props = {}) => (
    <View style={{ marginTop: 10 }}>
      <TextInput
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 16,
          borderColor: errors[field] ? 'red' : Colors.light.icon,
          color: Colors.light.icon,
          ...props.style
        }}
        {...props}
      />
      {errors[field] && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
          {errors[field]}
        </Text>
      )}
    </View>
  )

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.light.icon} />
      </View>
    )
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
        Agrega tu negocio
      </Text>
      <Text style={{ color: Colors.light.icon }}>
        Llena todos los detalles para agregar tu negocio
      </Text>
      
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={onImagePick}
      >
        {!image ? (
          <Image
            source={require('./../../assets/images/placeholder.png')}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
        )}
      </TouchableOpacity>
      {errors.image && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
          {errors.image}
        </Text>
      )}

      <View style={{ marginTop: 20, marginBottom: 200}}>
        {renderTextInput('Nombre', 'nombre')}
        {renderTextInput('Direccion', 'direccion')}
        {renderTextInput('Numero de contacto', 'contacto', {
          keyboardType: 'phone-pad'
        })}
        {renderTextInput('Correo electronico', 'correo', {
          keyboardType: 'email-address',
          autoCapitalize: 'none'
        })}
        {renderTextInput('Descripcion del negocio', 'descripcion', {
          multiline: true,
          numberOfLines: 5,
          style: {
            height: 100,
            textAlignVertical: 'top'
          }
        })}

        <View style={{ marginTop: 10 }}>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('category', value)}
            items={categoryList}
            value={formData.category}
            style={{
              inputIOS: {
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 16,
                borderColor: errors.category ? 'red' : Colors.light.icon,
                color: Colors.light.icon
              },
              inputAndroid: {
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 16,
                borderColor: errors.category ? 'red' : Colors.light.icon,
                color: Colors.light.icon
              }
            }}
            placeholder={{ label: 'Selecciona una categoria', value: null }}
          />
          {errors.category && (
            <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
              {errors.category}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: Colors.light.icon,
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
            alignItems: 'center'
          }}
          disabled={loading}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {loading ? 'Guardando...' : 'Guardar Negocio'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}