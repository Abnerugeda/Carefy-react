import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const urlApi = import.meta.env.VITE_URL_API;

export default async function EditarTags(
  nomeTag,
  descricao,
  newCodigoTag,
  codigoTag,
  cor
) {
  const data = {
    Nome: nomeTag,
    Descricao: descricao,
    Codigo_Tag: newCodigoTag,
    Cor: cor,
  };
  try {
    const response = await axios.put(`${urlApi}/tags/${codigoTag}`, data);
    console.log(response.data)
    if (response.status === 200) {
      Swal.fire("Tag Editada!", "bom trabalho 😎", "success");
      return 200;
    } else if (response.status === 203) {
      Swal.fire(
        "Código já cadastrado em outra tag!",
        "Altere o código e tente novamente 🫡",
        "success"
      );
    }
  } catch (error) {
    Swal.fire("Ocorreu algum erro😢!", error.message, "error");
  }
}
