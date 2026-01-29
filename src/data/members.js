// Integrantes de BTS y Stray Kids con imágenes desde CDN
// Usando UI Avatars para generar avatares con colores únicos para cada miembro
// Puedes reemplazar estas URLs con imágenes reales de los integrantes
const getAvatarUrl = (name, color) => {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=400&bold=true&font-size=0.5`
}

export const members = [
  // BTS (7 integrantes)
  {
    name: 'RM',
    group: 'BTS',
    image: getAvatarUrl('RM', 'FF6B6B')
  },
  {
    name: 'Jin',
    group: 'BTS',
    image: getAvatarUrl('Jin', '4ECDC4')
  },
  {
    name: 'Suga',
    group: 'BTS',
    image: getAvatarUrl('Suga', '45B7D1')
  },
  {
    name: 'J-Hope',
    group: 'BTS',
    image: getAvatarUrl('J-Hope', 'FFA07A')
  },
  {
    name: 'Jimin',
    group: 'BTS',
    image: getAvatarUrl('Jimin', '98D8C8')
  },
  {
    name: 'V',
    group: 'BTS',
    image: getAvatarUrl('V', 'F7DC6F')
  },
  {
    name: 'Jungkook',
    group: 'BTS',
    image: getAvatarUrl('Jungkook', 'BB8FCE')
  },
  // Stray Kids (8 integrantes)
  {
    name: 'Bang Chan',
    group: 'Stray Kids',
    image: getAvatarUrl('Bang Chan', 'FF6B9D')
  },
  {
    name: 'Lee Know',
    group: 'Stray Kids',
    image: getAvatarUrl('Lee Know', 'C44569')
  },
  {
    name: 'Changbin',
    group: 'Stray Kids',
    image: getAvatarUrl('Changbin', '6C5CE7')
  },
  {
    name: 'Hyunjin',
    group: 'Stray Kids',
    image: getAvatarUrl('Hyunjin', '00D2D3')
  },
  {
    name: 'Han',
    group: 'Stray Kids',
    image: getAvatarUrl('Han', 'FF9FF3')
  },
  {
    name: 'Felix',
    group: 'Stray Kids',
    image: getAvatarUrl('Felix', '54A0FF')
  },
  {
    name: 'Seungmin',
    group: 'Stray Kids',
    image: getAvatarUrl('Seungmin', '5F27CD')
  },
  {
    name: 'I.N',
    group: 'Stray Kids',
    image: getAvatarUrl('I.N', '00D2D3')
  }
]
