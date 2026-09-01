# Proyecto Web – OficiosYA

## 👥 Integrantes

* Integrante 1: Medina Lourdes Natalí
* Integrante 2: Cura, Rocío Julieta
* Integrante 3: Galván, Rocío Julieta
* Integrante 4: Sánchez Cano, Sebastián

---

## 📌 Descripción breve

Este proyecto consiste en el desarrollo de una página web orientada a la búsqueda y visualización de oficios.

La interfaz permite presentar profesionales, categorías, pedidos, estados y diferentes secciones informativas. Se buscó crear un diseño moderno, ordenado, intuitivo y adaptable a diferentes dispositivos.

El diseño utiliza una combinación de colores azul y terracota, tarjetas, botones, formularios y diferentes componentes visuales para mejorar la experiencia del usuario.

---

## 🛠️ Tecnologías utilizadas

* *HTML5* – Para la estructura y organización del contenido.
* *CSS3* – Para los estilos, diseño y adaptación a diferentes tamaños de pantalla.
* *Flexbox* – Para organizar elementos en filas y columnas de manera flexible.
* *CSS Grid* – Para crear distribuciones mediante grillas.
* *Media Queries* – Para implementar el Responsive Design.
* *Google Fonts – Inter* – Para la tipografía utilizada en el proyecto.

---

## 📐 ¿Dónde utilizamos Flexbox?

Utilizamos *Flexbox* en diferentes partes del proyecto para organizar los elementos de manera flexible.

Algunos ejemplos son:

* La barra superior (.topbar), para distribuir la marca y el menú de navegación.
* Los elementos del menú (.topbar nav).
* Los botones y acciones del encabezado.
* El buscador principal (.buscador-hero), para colocar el campo de búsqueda y el botón.
* Las tarjetas de profesionales.
* La información de cada profesional.
* Los filtros y categorías.
* La navegación inferior (.bottom-nav).
* La sección "Cómo funciona".

Por ejemplo, en la barra superior se utiliza:

css
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


Esto permite distribuir los elementos horizontalmente y mantenerlos correctamente alineados.

---

## 🔲 ¿Dónde utilizamos Grid?

Utilizamos *CSS Grid* principalmente para organizar contenidos en forma de columnas.

Algunos ejemplos son:

### Categorías

La clase .grid-categorias utiliza Grid para distribuir las categorías:

css
.grid-categorias {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}


### Accesos

La clase .grid-accesos utiliza una grilla adaptable:

css
.grid-accesos {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(220px, 1fr)
  );
  gap: 16px;
}


### Contenido principal

También utilizamos Grid para dividir el contenido principal en diferentes columnas mediante .home-content-grid.

### Sección "Cómo funciona"

En pantallas grandes, la sección se organiza en cuatro columnas utilizando Grid.

---

## 🎨 Variables CSS

Creamos variables CSS dentro de :root para centralizar los colores, sombras y otros valores utilizados en el diseño.

Entre ellas se encuentran:

css
:root {
  --azul: #17324d;
  --azul-claro: #28577a;
  --azul-tinta: #0f2233;
  --terracota: #ff6b3d;
  --terracota-oscuro: #dd4f25;
  --fondo: #f5f7fb;
  --fondo-calido: #fff7f1;
  --papel: #ffffff;
  --texto: #18212f;
  --texto-suave: #667085;
  --verde: #16875d;
  --rojo: #d94646;
  --borde: #dde5ee;
  --borde-fuerte: #c7d2df;
  --sombra: 0 10px 30px rgba(20, 45, 75, 0.08);
  --sombra-fuerte: 0 18px 50px rgba(20, 45, 75, 0.16);
  --radio: 18px;
}


El uso de variables permite mantener una identidad visual consistente y facilita modificar los colores o valores generales del proyecto.

---

## 📱 Responsive Design

Implementamos *Responsive Design* mediante @media queries, permitiendo que la página se adapte a computadoras, tablets y celulares.

Se utilizaron diferentes puntos de corte:

* *Hasta 920px:* adaptación para tablets y pantallas medianas.
* *Hasta 700px:* adaptación para celulares.
* *Hasta 560px:* ajustes para celulares pequeños.
* *Hasta 480px:* ajustes adicionales para pantallas muy pequeñas.
* *Desde 1000px:* optimizaciones para pantallas grandes.

Por ejemplo:

css
@media (max-width: 700px) {
  .topbar {
    flex-direction: column;
  }

  .grid-categorias {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .buscador-hero {
    flex-direction: column;
  }
}


De esta manera, los elementos cambian su distribución según el tamaño de la pantalla, mejorando la navegación y la visualización en dispositivos móviles.

---

## 💡 Conclusión

El proyecto combina *HTML5 y CSS3*, utilizando Flexbox y Grid para organizar los componentes, variables CSS para mantener una identidad visual coherente y Media Queries para lograr una interfaz responsive.

El objetivo fue desarrollar una página moderna, funcional y adaptable a diferentes dispositivos, priorizando la organización del contenido y la experiencia del usuario.
