/**
 * Base de datos de conocimientos basada en el Syllabus RA1 - INTEP
 * Incluye: Definición, Relación (Comparativa) y Categoría.
 */
const datosRA1 = [
    {
        id: 1,
        termino: "Servicios Web (Web Services)",
        definicion: "Tecnología que permite a diferentes aplicaciones comunicarse entre sí a través de una red, independientemente del lenguaje de programación o la plataforma en la que estén desarrolladas.",
        relacion: "🧩 Concepto Global: Engloba a SOAP y REST.",
        ejemplo: "Una app de viajes (móvil) consultando el clima a un servidor (Java).",
        categoria: "Fundamentos"
    },
    {
        id: 2,
        termino: "SOA (Service Oriented Architecture)",
        definicion: "Enfoque arquitectónico donde el software se diseña como un conjunto de servicios interoperables y reutilizables.",
        relacion: "🏗️ Arquitectura Base: Es la filosofía de diseño detrás de SOAP y WSDL.",
        ejemplo: "Sistema bancario donde 'Consultar Saldo' es un servicio usado por cajeros, web y app.",
        categoria: "Arquitectura"
    },
    {
        id: 3,
        termino: "SOAP (Simple Object Access Protocol)",
        definicion: "Protocolo estándar basado estrictamente en XML para intercambiar información estructurada. Es conocido por su robustez y seguridad (WS-Security).",
        relacion: "🆚 vs REST: SOAP es más rígido, pesado y seguro. REST es flexible y ligero.",
        ejemplo: "Transacciones financieras, sistemas gubernamentales.",
        categoria: "Protocolos (Estricto)"
    },
    {
        id: 4,
        termino: "REST (Representational State Transfer)",
        definicion: "Estilo de arquitectura de software que utiliza los métodos estándar de HTTP (GET, POST, PUT, DELETE). No guarda estado (Stateless).",
        relacion: "🚀 Tendencia Actual: Prefiere JSON sobre XML por ser más ligero.",
        ejemplo: "API de Twitter, Netflix, Google Maps.",
        categoria: "Estilo Arquitectónico"
    },
    {
        id: 5,
        termino: "WSDL (Web Services Description Language)",
        definicion: "Documento basado en XML que actúa como un 'contrato'. Describe qué hace el servicio, cómo se llama y dónde está ubicado.",
        relacion: "📄 Pareja de SOAP: Es obligatorio en SOAP para que el cliente sepa cómo conectarse.",
        ejemplo: "Archivo .wsdl que importas en Visual Studio para consumir un servicio.",
        categoria: "Estándares XML"
    },
    {
        id: 6,
        termino: "UDDI (Universal Description, Discovery, and Integration)",
        definicion: "Estándar para publicar y descubrir servicios web. Funciona como un directorio telefónico (Páginas Amarillas) de servicios.",
        relacion: "🔍 Descubrimiento: Permite encontrar el WSDL de un servicio.",
        ejemplo: "Registro interno de una multinacional para listar sus APIs disponibles.",
        categoria: "Estándares"
    },
    {
        id: 7,
        termino: "XML vs JSON",
        definicion: "Formatos de intercambio de datos. XML es un lenguaje de marcado (etiquetas) y JSON es notación de objetos (clave-valor).",
        relacion: "⚖️ Comparativa: XML es verboso y estricto (SOAP). JSON es ligero y rápido (REST).",
        ejemplo: "<nombre>Jose</nombre> vs { 'nombre': 'Jose' }",
        categoria: "Formatos de Datos"
    },
    {
        id: 8,
        termino: "Métodos HTTP",
        definicion: "Verbos utilizados en la comunicación web: GET (Consultar), POST (Crear), PUT (Actualizar), DELETE (Borrar).",
        relacion: "🛠️ Motor de REST: REST se basa completamente en el uso correcto de estos verbos.",
        ejemplo: "Usar GET para ver tu perfil y POST para subir una foto.",
        categoria: "Protocolos Web"
    }
];

// Referencias al DOM (Document Object Model)
const contenedor = document.getElementById('contenedor-glosario');
const inputBuscador = document.getElementById('buscador');
const labelContador = document.getElementById('contador-resultados');

/**
 * Función para renderizar las tarjetas en el HTML
 * @param {Array} lista - Array de objetos a mostrar
 */
function renderizarGlosario(lista) {
    contenedor.innerHTML = ''; // Limpiar contenido previo

    if (lista.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; width:100%;">No se encontraron términos con esa búsqueda.</p>';
        return;
    }

    lista.forEach(item => {
        // Determinamos color del borde según categoría (Lógica visual)
        let colorBorde = 'var(--accent-color)';
        if (item.categoria.includes('Protocolos')) colorBorde = 'var(--soap-color)';
        if (item.categoria.includes('Estilo')) colorBorde = 'var(--rest-color)';

        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta';
        tarjeta.style.borderTopColor = colorBorde;

        tarjeta.innerHTML = `
            <h3>${item.termino}</h3>
            <p class="definicion">${item.definicion}</p>
            
            <div class="seccion-extra">
                <span class="relacion">${item.relacion}</span>
                <small>Ej: ${item.ejemplo}</small>
            </div>

            <span class="tag" style="background:${colorBorde}">${item.categoria}</span>
        `;
        contenedor.appendChild(tarjeta);
    });

    // Actualizar contador
    labelContador.innerText = `Mostrando ${lista.length} conceptos`;
}

/**
 * Lógica de Filtrado (Buscador en tiempo real)
 */
inputBuscador.addEventListener('input', (e) => {
    const textoBusqueda = e.target.value.toLowerCase();
    
    const resultadosFiltrados = datosRA1.filter(item => 
        item.termino.toLowerCase().includes(textoBusqueda) || 
        item.definicion.toLowerCase().includes(textoBusqueda) ||
        item.categoria.toLowerCase().includes(textoBusqueda)
    );

    renderizarGlosario(resultadosFiltrados);
});

// Carga inicial de todos los términos
document.addEventListener('DOMContentLoaded', () => {
    renderizarGlosario(datosRA1);
});