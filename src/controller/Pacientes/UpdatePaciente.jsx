import axios from "axios";
import { format, parse } from "date-fns";
import React from "react";
import Swal from "sweetalert2";
const urlApi = import.meta.env.VITE_URL_API;

export default async function UpdatePaciente(
  nome,
  codigoPaciente,
  newCodigoPaciente,
  telefone,
  cep,
  logradouro,
  bairro,
  uf,
  numeroCasa,
  complemento,
  dataNascimento,
  conjTag
) {
  const dataOriginal = parse(dataNascimento, 'dd/MM/yyyy', new Date());
  const dataFormatada = format(dataOriginal, 'yyyy-MM-dd');
  conjTag.forEach(obj => {
    obj.Codigo_Paciente = newCodigoPaciente;
    delete obj.Nome;
    delete obj.Cor;
    delete obj.Descricao;
  });
  
    const data = {
      Nome: nome,
      Codigo_Paciente: newCodigoPaciente,
      Telefone: telefone,
      Logradouro: logradouro,
      CEP: cep,
      numero_casa: numeroCasa,
      complemento: complemento,
      Data_Nascimento: dataFormatada,
      UF: uf,
      Bairro: bairro,
      Tags: conjTag
    };


  try {
    const response = await axios.put(`${urlApi}/pacientes/${codigoPaciente}`, data);
    if (response.status === 200) {
      Swal.fire("Paciente atualizado com sucesso!", "bom trabalho 😎", "success");
      return 200;
    } else if (response.status === 203 || response.status === 202) {
      Swal.fire(
        "Ops!",
         response.data.message + "🫡",
        "success"
      );
    }
  } catch (error) {
    Swal.fire("Ocorreu algum erro😢!", error.message, "error");
    console.error(error)
  }
}
