function ValidaCPF(CPF) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function() {
      return CPF.replace(/\D+/g, '');
    }
  });
}

ValidaCPF.prototype.valida = function () {
  if(typeof this.cpfLimpo === 'undefined') return false;
  if(this.cpfLimpo.length !== 11) return false;
  if (this.isSequencia()) return false;

  // Remove os dois ultimos elementos do cpf e cria o parcial
  const cpfParcial = this.cpfLimpo.slice(0, -2);

  // Recupera o primeiro e segundo digito
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);

  // Gera o novo CPF
  const novoCPF = cpfParcial + digito1 + digito2;

  // Verifica se e semelhante ao cpf limpo para validar
  return novoCPF === this.cpfLimpo;
}

// Cria o digito para o validador do CPF
ValidaCPF.prototype.criaDigito = function(cpfParcial) {
  const cpfArray = Array.from(cpfParcial);
  const multiplicador = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val, i) => ac + (Number(val) * (multiplicador - i)) ,0); 
  const digito = 11 - (total % 11);

  return digito > 9 ? 0 : digito;
}

// Verifica se o CPF não é sequencia
ValidaCPF.prototype.isSequencia = function () {
  return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
};

const cpfValido = new ValidaCPF('111.111.111-11');

console.log(cpfValido.valida());
// console.log(cpfNulo.cpfLimpo);
// console.log(cpfNulo.valida());