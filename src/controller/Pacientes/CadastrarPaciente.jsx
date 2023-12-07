import axios from "axios";
import { format, parse } from "date-fns";
import React from "react";
import Swal from "sweetalert2";
const urlApi = import.meta.env.VITE_URL_API;

export default async function CadastrarPaciente(
  nome,
  codigoPaciente,
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

  const data = {
    Nome: nome,
    Codigo_Paciente: codigoPaciente,
    Telefone: telefone,
    Logradouro: logradouro,
    CEP: cep,
    numero_casa: numeroCasa,
    complemento: complemento,
    Data_Nascimento: dataFormatada,
    UF: uf,
    Bairro: bairro,
  };

  try {
    const response = await axios.post(`${urlApi}/pacientes`, data);
    conjTag.map(async (tag) => {
      const dataTag = {
        Codigo_Tag: tag.Codigo_Tag,
        Codigo_Paciente: codigoPaciente
      }
      await axios.post(`${urlApi}/tagsPaciente`, dataTag)
    })
    if (response.status === 201) {
      Swal.fire("Paciente Cadastrado com sucesso!", "bom trabalho 😎", "success");
      return 201;
    } else if (response.status === 203) {
      Swal.fire(
        "Ops!",
         response.data.message + "🫡",
        "success"
      );
    }
  } catch (error) {
    Swal.fire("Ocorreu algum erro😢!", error.message, "error");
  }
}
