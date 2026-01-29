# 🚀 Guía de Despliegue

Tu aplicación está lista para desplegarse. Aquí tienes varias opciones:

## Opción 1: Vercel (Recomendado - Más Fácil) ⚡

1. **Instala Vercel CLI** (si no lo tienes):
```bash
npm install -g vercel
```

2. **Despliega**:
```bash
vercel
```

3. Sigue las instrucciones en la terminal. Vercel detectará automáticamente que es un proyecto Vite.

**O usa la interfaz web:**
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub (si lo tienes)
3. O arrastra la carpeta `dist` directamente

## Opción 2: Netlify 🌐

1. **Instala Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Despliega**:
```bash
netlify deploy --prod --dir=dist
```

**O usa la interfaz web:**
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist` a su sitio
3. ¡Listo!

## Opción 3: GitHub Pages 📦

1. **Instala gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Agrega al package.json** en scripts:
```json
"deploy": "npm run build && gh-pages -d dist"
```

3. **Despliega**:
```bash
npm run deploy
```

4. Ve a Settings > Pages en tu repositorio de GitHub y configura la fuente como `gh-pages` branch.

## Opción 4: Surge.sh 🎯

1. **Instala Surge**:
```bash
npm install -g surge
```

2. **Despliega**:
```bash
npm run build
surge dist
```

3. Sigue las instrucciones para crear una cuenta y elegir un dominio.

## Opción 5: Firebase Hosting 🔥

1. **Instala Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Inicializa Firebase**:
```bash
firebase init hosting
```

3. Selecciona `dist` como directorio público

4. **Despliega**:
```bash
npm run build
firebase deploy
```

---

## 📝 Notas Importantes

- Asegúrate de ejecutar `npm run build` antes de desplegar
- Los archivos de producción están en la carpeta `dist/`
- Todas estas opciones tienen planes gratuitos generosos

## 🎯 Recomendación

**Vercel** es la opción más fácil y rápida. Solo necesitas:
1. Ejecutar `vercel` en la terminal
2. Seguir las instrucciones
3. ¡Tu app estará en línea en menos de 2 minutos!
