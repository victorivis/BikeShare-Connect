function confirmarOperacao(codigoCorreto) {
    const codigoParaMostrar = codigoCorreto;
    
    return Swal.fire({
        title: 'Confirmar deleção',
        html: `Digite o ID abaixo para confirmar:<br><span style="font-size: 20px; color: #000000; font-weight: bold;">${codigoParaMostrar}</span>`,
        input: 'text',
        inputPlaceholder: 'Digite o código',
        showCancelButton: true,
        confirmButtonText: 'Deletar',
        cancelButtonText: 'Cancelar',
        preConfirm: (codigoDigitado) => {
            if (codigoDigitado != codigoCorreto) {
                Swal.showValidationMessage('Código incorreto');
                return false;
            }
            return true;
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            return true;
        } else {
            return false; 
        }
    });
}

export default confirmarOperacao;