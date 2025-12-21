import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo inválido. Use JPG, PNG ou WEBP' },
        { status: 400 }
      )
    }

    // Validar tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 5MB' },
        { status: 400 }
      )
    }

    // Converter para base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    // Upload para Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'restaurants', // Organizar em pasta
      transformation: [
        { width: 1200, height: 800, crop: 'fill' }, // Redimensionar
        { quality: 'auto' }, // Qualidade automática
        { fetch_format: 'auto' } // Formato otimizado
      ]
    })

    return NextResponse.json({
      success: true,
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id
    })

  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload da imagem' },
      { status: 500 }
    )
  }
}