class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      writable: false,
      value: cpfEnviado.replace(/\D+/g, ""),
    });

    Object.defineProperty(this, "valid", {
      writable: false,
      value: this.valida(),
    });

    Object.defineProperty(this, "value", {
      writable: false,
      value: cpfEnviado,
    });
  }

  valida() {
    if (typeof this.cpfLimpo === "undefined") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    // Remove os dois ultimos elementos do cpf e cria o parcial
    const cpfParcial = this.cpfLimpo.slice(0, -2);

    // Recupera o primeiro e segundo digito
    const digito1 = ValidaCPF.criaDigito(cpfParcial);
    const digito2 = ValidaCPF.criaDigito(cpfParcial + digito1);

    // Gera o novo CPF
    const novoCPF = cpfParcial + digito1 + digito2;

    // Verifica se e semelhante ao cpf limpo para validar
    return novoCPF === this.cpfLimpo;
  }

  // Cria o digito para o validador do CPF
  static criaDigito(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    const multiplicador = cpfArray.length + 1;
    const total = cpfArray.reduce(
      (ac, val, i) => ac + Number(val) * (multiplicador - i),
      0
    );
    const digito = 11 - (total % 11);

    return digito > 9 ? 0 : digito;
  }

  // Verifica se o CPF não é sequencia
  isSequencia() {
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
  }
}

// Novo CPF
const cpfValido = new ValidaCPF("111.111.111-11");

console.log(cpfValido);