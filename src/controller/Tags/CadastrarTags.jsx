import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const urlApi = import.meta.env.VITE_URL_API;

export default async function CadastrarTags(
  nomeTag,
  descricao,
  codigoTag,
  cor
) {
  const data = {
    Nome: nomeTag,
    Descricao: descricao,
    Codigo_Tag: codigoTag,
    Cor: cor,
  };
  try {
    const response = await axios.post(`${urlApi}/tags`, data);
    console.log(response.data)
    if (response.status === 201) {
      Swal.fire("Tag cadastrada!", "bom trabalho 😎", "success");
      return 201;
    } else if (response.status === 200) {
      Swal.fire(
        "Tag já cadastrada!",
        "Altere o código e tente novamente 🫡",
        "success"
      );
    }
  } catch (error) {
    Swal.fire("Ocorreu algum erro😢!", error.message, "error");
  }
}
