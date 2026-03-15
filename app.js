const botonesGit = document.querySelectorAll('.git-btn');
const comandoGenerado = document.getElementById('comandoGenerado');
const descripcionComando = document.getElementById('descripcionComando');
const avisoComando = document.getElementById('avisoComando');
const cajaAviso = document.getElementById('cajaAviso');
const btnCopiar = document.getElementById('btnCopiar');
const btnLimpiar = document.getElementById('btnLimpiar');

botonesGit.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesGit.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');

        const comando = boton.dataset.comando;
        const descripcion = boton.dataset.descripcion;
        const aviso = boton.dataset.aviso;

        comandoGenerado.value = comando;
        descripcionComando.textContent = descripcion || 'Sin descripción.';
        avisoComando.textContent = aviso || 'Sin avisos.';

        if (aviso.toLowerCase().includes('peligro')) {
            cajaAviso.classList.add('aviso-peligro');
        } else {
            cajaAviso.classList.remove('aviso-peligro');
        }

        document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
    });
});

btnCopiar.addEventListener('click', async () => {
    if (!comandoGenerado.value.trim()) {
        btnCopiar.textContent = '⚠ Selecciona un comando';
        btnCopiar.style.background = '#f59e0b';
        setTimeout(() => {
            btnCopiar.textContent = 'Copiar';
            btnCopiar.style.background = '';
        }, 2000);
        return;
    }

    try {
        await navigator.clipboard.writeText(comandoGenerado.value);
        btnCopiar.textContent = '✓ Copiado';
        btnCopiar.style.background = '#16a34a';
        setTimeout(() => {
            btnCopiar.textContent = 'Copiar';
            btnCopiar.style.background = '';
        }, 2000);
    } catch (error) {
        btnCopiar.textContent = '✗ Error al copiar';
        btnCopiar.style.background = '#dc2626';
        setTimeout(() => {
            btnCopiar.textContent = 'Copiar';
            btnCopiar.style.background = '';
        }, 2000);
        console.error(error);
    }
});

btnLimpiar.addEventListener('click', () => {
    comandoGenerado.value = '';
    descripcionComando.textContent = 'Aquí aparecerá la descripción del comando seleccionado.';
    avisoComando.textContent = 'Aquí aparecerán advertencias si el comando requiere precaución.';
    cajaAviso.classList.remove('aviso-peligro');
    botonesGit.forEach(b => b.classList.remove('activo'));
});

function actualizarAlturaHeader() {
    const header = document.getElementById('mainHeader');
    const altura = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${altura}px`);
}

window.addEventListener('load', actualizarAlturaHeader);
window.addEventListener('resize', actualizarAlturaHeader);
