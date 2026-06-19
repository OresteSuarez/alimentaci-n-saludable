document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const infoTitle = document.getElementById('info-title');
    const infoDesc = document.getElementById('info-desc');
    const panel = document.getElementById('info-panel');

    const defaultTitle = '🍽️ El Plato Ideal';
    const defaultDesc = 'Haz clic sobre una porción para fijar la información, o pasa el cursor para explorarla.';

    // Esta variable guardará el elemento que está fijado actualmente
    let lockedElement = null; 

    // Función auxiliar para imprimir los datos en el panel
    const renderPanel = (title, desc, isHighlighted) => {
        infoTitle.textContent = title;
        infoDesc.textContent = desc;
        panel.style.backgroundColor = isHighlighted ? '#e8f5e9' : 'var(--panel-bg)';
    };

    sections.forEach(section => {
        const title = section.getAttribute('data-title');
        const desc = section.getAttribute('data-desc');

        // Evento 1: Hacer Clic (Fija o suelta la información)
        section.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al documento

            if (lockedElement === section) {
                // Si el elemento ya estaba fijado y le damos clic, lo soltamos
                lockedElement.classList.remove('active');
                lockedElement = null;
                renderPanel(defaultTitle, defaultDesc, false);
            } else {
                // Si había otro elemento fijado antes, le quitamos el estado activo
                if (lockedElement) {
                    lockedElement.classList.remove('active');
                }
                // Fijamos el nuevo elemento
                lockedElement = section;
                lockedElement.classList.add('active');
                renderPanel(title, desc, true);
            }
        });

        // Evento 2: Pasar el cursor por encima (Hover in)
        section.addEventListener('mouseenter', () => {
            // Solo cambia la info temporalmente si no hay nada fijado
            if (!lockedElement) {
                renderPanel(title, desc, true);
            }
        });

        // Evento 3: Quitar el cursor (Hover out)
        section.addEventListener('mouseleave', () => {
            if (!lockedElement) {
                // Si no hay nada fijado, vuelve al texto por defecto
                renderPanel(defaultTitle, defaultDesc, false);
            } else if (lockedElement !== section) {
                // Si quitamos el cursor de un elemento que NO es el fijado, 
                // volvemos a mostrar la información del elemento que sí está fijado
                const lockedTitle = lockedElement.getAttribute('data-title');
                const lockedDesc = lockedElement.getAttribute('data-desc');
                renderPanel(lockedTitle, lockedDesc, true);
            }
        });
    });

    // Evento extra: Hacer clic en cualquier lugar fuera del plato para reiniciar todo
    document.addEventListener('click', (e) => {
        if (lockedElement && !e.target.closest('.section')) {
            lockedElement.classList.remove('active');
            lockedElement = null;
            renderPanel(defaultTitle, defaultDesc, false);
        }
    });
});