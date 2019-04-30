$(function () {
    //evento disparado digitar algo em milhas
    $('#milhas').keyup(function () {
        let milhas = $(this).val()
        if (milhas !== "") {
            $('.form-control-milhas').removeClass('error')
            if (!isNaN(milhas)) {
                //caso digite o valor correto
                milhas = parseFloat(milhas)
                metros = converte(milhas)//realiza a conversão
                $('#metros').val(metros.toFixed(2))
            }
            else {
                //caso digite letras, exibe a mensagem de erro
                $('.form-control-milhas').addClass('error')
                $('.invalid-feedback').html('Insira somente numeros')
            }
        }
        else {
            //caso o input esteja vazio, remove a classe de erro e metros recebe 0
            $('.form-control-milhas').removeClass('error')
            $('#metros').val("")
        }
    })
})

// recebe milhas int, e retona o valor em metros
function converte(milhas) {
    return 1609.344 * milhas
}