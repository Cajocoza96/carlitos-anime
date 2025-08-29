const miMenu = document.querySelector('.menu');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');

const btnTodas = document.querySelector('.todas');
const btnPrimeraTemporada = document.querySelector('.primeraTemporada');
const btnSegundaTemporada = document.querySelector('.segundaTemporada');

const contenedorTemporadas = document.querySelector('.temporadas');

document.addEventListener('DOMContentLoaded', ()=>{
    eventos();
    temporadas();
});

const eventos = () =>{
    miMenu.addEventListener('click', abrirMenu);
}

/* Da el mismo resultado de lo que esta abajo, no importa si se quitan las llaves
const abrirMenu = () => navegacion.classList.remove('ocultar');
*/

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length>0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-Cerrar');

    /*while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }*/
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const temporadas = () =>{
    let temporadasArreglo = [];
    const temporadas = document.querySelectorAll('.temporada');
    
    temporadas.forEach(temporada=> temporadasArreglo =[...temporadasArreglo, temporada]);

    const primeraTemporadas = temporadasArreglo.filter(primeraTemporada=>primeraTemporada.getAttribute('data-temporada') === 'temporada-1');
    
    const segundaTemporadas = temporadasArreglo.filter(segundaTemporada=>segundaTemporada.getAttribute('data-temporada') === 'temporada-2');
    
    mostrarTemporadas(primeraTemporadas, segundaTemporadas, temporadasArreglo);
}

const mostrarTemporadas = (primeraTemporadas, segundaTemporadas, todas) =>{
    btnPrimeraTemporada.addEventListener('click', ()=>{
        limpiarHtml(contenedorTemporadas);
        primeraTemporadas.forEach(primeraTemporada=>contenedorTemporadas.appendChild(primeraTemporada));
    });
    btnSegundaTemporada.addEventListener('click', ()=>{
        limpiarHtml(contenedorTemporadas);
        segundaTemporadas.forEach(segundaTemporada=>contenedorTemporadas.appendChild(segundaTemporada));
    });
    btnTodas.addEventListener('click', ()=>{
        limpiarHtml(contenedorTemporadas);
        todas.forEach(toda=> contenedorTemporadas.appendChild(toda));
    });
  
}

const limpiarHtml = (contenedorTemporadas)=>{
    while(contenedorTemporadas.firstChild){
        contenedorTemporadas.removeChild(contenedorTemporadas.firstChild);
    }
}



