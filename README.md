# 🎵 K-Pop Memorama y Trivia

Una aplicación web interactiva con dos juegos sobre K-Pop: un memorama con los integrantes de BTS y Stray Kids, y una trivia con preguntas sobre estos grupos.

## 🎮 Características

- **Memorama**: Encuentra las parejas de los 15 integrantes (7 de BTS + 8 de Stray Kids)
  - Gana 1 punto por cada pareja encontrada
  
- **Trivia**: Responde preguntas sobre BTS y Stray Kids
  - Cada respuesta correcta vale 10 puntos
  
- **Sistema de Puntos**: Los puntos se acumulan entre ambos juegos

## 🚀 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## 📝 Notas sobre las Imágenes

Las imágenes de los integrantes actualmente usan placeholders. Para usar imágenes reales:

1. Busca imágenes oficiales de los integrantes de BTS y Stray Kids
2. Sube las imágenes a un servicio de hosting (como Imgur, Cloudinary, o tu propio servidor)
3. Reemplaza las URLs en `src/data/members.js` con las URLs de las imágenes reales

### Integrantes incluidos:

**BTS (7):**
- RM
- Jin
- Suga
- J-Hope
- Jimin
- V
- Jungkook

**Stray Kids (8):**
- Bang Chan
- Lee Know
- Changbin
- Hyunjin
- Han
- Felix
- Seungmin
- I.N

## 🛠️ Tecnologías

- React 18
- Vite
- CSS3

## 📦 Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.
