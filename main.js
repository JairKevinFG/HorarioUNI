//input
const inputCurso = document.querySelector('#inputCurso')
const listCursos = document.querySelector('#list-cursos')

//modal section
const modal  = document.querySelector('#modal');
const close = document.querySelector('#close');
const formSecciones = document.querySelector('#formSecciones');
const modalContent = document.querySelector('.modal-content');


window.onload = () => {
    inputCurso.addEventListener('keydown', listarCursos)
    close.addEventListener('click', closeModal )
    formSecciones.addEventListener('submit', agregarCurso );
};


class Horario {
    constructor() {

    }
    agregarHorario(){

    }
    eliminar

}

class UI {





}





function closeModal (){
    modal.removeAttribute('open')
}

async function obtenerCursos(){
    const url = 'horario.json'
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    return resultado
}

async function listarCursos(event) {
    listCursos.textContent = ""
    const cursos = await obtenerCursos()
    const text = event.target.value.trim()
    cursos.forEach( curso => {
        const nombreCurso = curso.nombre;
        if(nombreCurso.toLowerCase().includes(text)  && text.length > 0){
            const cursoitem = document.createElement('li')
            cursoitem.textContent = nombreCurso;
            cursoitem.href='#';
            listCursos.appendChild(cursoitem)
            cursoitem.onclick = () => {
                mostrarSecciones(curso)
            }
        }
    })

}

async function mostrarSecciones(curso){
    modalContent.textContent = '';

    const {codigo , nombre , secciones} = curso;
    const cursoTitulo = document.createElement('h2');
    cursoTitulo.classList.add('font-weight-bolder');
    cursoTitulo.textContent = nombre;

    const cursoParrafo = document.createElement('p')
    cursoParrafo.innerHTML = `<span class="font-weight-bolder">Codigo: </span> ${codigo}`;

    const divRow = document.createElement('div');
    divRow.classList.add('row');

    secciones.forEach((element) => {
        const divCol = document.createElement('div');
        divCol.classList.add(`col-md-${12/secciones.length}`)
        const {seccion , docente , documento , horarios } = element

        const docenteParrafo = document.createElement('p')
        docenteParrafo.innerHTML = `<span class="font-weight-bolder">Docente: </span> ${docente}`;

        const documentoParrafo = document.createElement('p')
        documentoParrafo.innerHTML = `<span class="font-weight-bolder">DNI: </span> ${documento}`;

        const seccionParrafo = document.createElement('div')
        seccionParrafo.innerHTML = `<input class="form-check-input" type="checkbox" name="seccion"  value=${seccion} >
        <label class="form-check-label">
        ${seccion}
        </label>`;

        divCol.appendChild(seccionParrafo);
        divCol.appendChild(docenteParrafo);
        divCol.appendChild(documentoParrafo);

        const divRow2 = document.createElement('div');
        divRow2.classList.add('row');

        horarios.forEach((horario) => {
            const {tipo , dia , inicio , final , aula} = horario

            const divHorario = document.createElement('div');
            divHorario.classList.add(`col-${12/horarios.length}`)

            const tipoParrafo = document.createElement('p')
            tipoParrafo.innerHTML = `<span class="font-weight-bolder">Tipo: </span> ${tipo}`;

            const diaParrafo = document.createElement('p')
            diaParrafo.innerHTML = `<span class="font-weight-bolder">Dia: </span> ${dia}`;

            const inicioParrafo = document.createElement('p')
            inicioParrafo.innerHTML = `<span class="font-weight-bolder">Inicio: </span> ${inicio}`;

            const finalParrafo = document.createElement('p')
            finalParrafo.innerHTML = `<span class="font-weight-bolder">Final: </span> ${final}`;

            const aulaParrafo = document.createElement('p')
            aulaParrafo.innerHTML = `<span class="font-weight-bolder">Aula: </span> ${aula}`;

            divHorario.appendChild(tipoParrafo);
            divHorario.appendChild(diaParrafo);
            divHorario.appendChild(inicioParrafo);
            divHorario.appendChild(finalParrafo);
            divHorario.appendChild(aulaParrafo);

            divRow2.appendChild(divHorario)

        })
        divCol.appendChild(divRow2)
        divRow.appendChild(divCol);
        //agregar el boton para enviar el curso

    })



    modalContent.appendChild(cursoTitulo)
    modalContent.appendChild(cursoParrafo)
    modalContent.appendChild(divRow)

    modal.showModal()

}

