# 🛒 My online store

Una web hecha con **HTML, CSS y JavaScript** donde puedes **buscar productos**, **añadirlos al carrito** y **mantenerlos guardados** gracias al `localStorage`.

---

## ✨ Funcionalidades

- 🔍 Buscar productos por nombre  
- 🛍️ Añadir y quitar productos del carrito  
- 💾 Guardado automático en `localStorage`  
- ⚡ Carga rápida desde datos guardados  
- 🔁 Interfaz dinámica sin recargar la página  

---

## 🧠 Tecnologías

| 💡 Tecnología | 💬 Uso |

| **HTML5** | Estructura de la app |
| **CSS3** | Estilos y diseño |
| **JavaScript (ES6+)** | Lógica del carrito y eventos |
| **Fetch API** | Carga de productos desde la API de Adalab |
| **LocalStorage** | Guardado de datos entre sesiones |

---

## ⚙️ Cómo funciona

1. Al abrir la página, los productos se cargan desde la **API de Adalab** (o desde `localStorage`).  
2. Escribir en el buscador para **filtrar productos** por nombre.  
3. Pulsar **Buy** para añadir al carrito (el botón cambia a **Remove** y cambia también el color de fondo del producto).  
4. Pulsar **Remove** para eliminarlo (el botón cambia a **Buy** y el fondo del producto vuelve a su estado original).  
5. El carrito y los productos quedan **guardados automáticamente** en `localStorage`.  

---

## 📁 Estructura del proyecto

📁 proyecto-vuelta-al-cole
│
└── /src/    
   ├── index.html        # Página principal
   ├── /partials/        # Carpeta del contenido de las partes del index.html
      ├──header.html 
      ├──main.html
      ├──footer.html
   ├──/scss/
      ├── reset.scss     # Estilos CSS
      ├── variables.scss 
      ├── footer.scss 
      ├── header.scss 
      ├── page.scss 
      ├── index.scss 
      ├── main.scss 
└── /public/             # Carpeta de iconos e imágenes adicionales (usada en el HTML y CSS)

## 👩‍💻 Autor/a

Creado con 💜 en JavaScript por **susdiaz-sudo**