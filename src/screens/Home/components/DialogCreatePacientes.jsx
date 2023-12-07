import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Plus } from "lucide-react";
import CadastrarPaciente from "../../../controller/Pacientes/CadastrarPaciente";
import DragDropTag from "./DragDropTag";
import ReactInputMask from "react-input-mask";

export function DialogCreatePacientes({fetchData}) {
  const [open, setOpen] = useState(false);
  const [cepPaciente, setCepPaciente] = useState("");
  const [nome, setNome] = useState("");
  const [codigoPaciente, setCodigoPaciente] = useState();
  const [telefone, setTelefone] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [logradouro, setLogradouro] = useState();
  const [bairro, setBairro] = useState();
  const [numeroCasa, setNumeroCasa] = useState();
  const [uf, setUf] = useState();
  const [complemento, setComplemento] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleCepPaciente = (e) => setCepPaciente(e.target.value);
  const handleNome = (e) => setNome(e.target.value);
  const handleCodigoPaciente = (e) => setCodigoPaciente(e.target.value);
  const handleTelefone = (e) => setTelefone(e.target.value);
  const handleDataNascimento = (e) => setDataNascimento(e.target.value);
  const handleLogradouro = (e) => setLogradouro(e.target.value);
  const handleBairro = (e) => setBairro(e.target.value);
  const handleNumeroCasa = (e) => setNumeroCasa(e.target.value);
  const handleUf = (e) => setUf(e.target.value);
  const handleComplemento = (e) => setComplemento(e.target.value);

  const classInput =
    "peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500";
  const labelInput =
    "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500";

  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button
          onClick={handleOpen}
          className="flex items-center gap-3"
          color="blue"
          size="sm"
        >
          <Plus strokeWidth={2} className="h-4 w-4" /> Cadastrar paciente
        </Button>
      </div>
      <Dialog open={open} size={"lg"} handler={handleOpen}>
        <DialogHeader>Cadastrar Paciente.</DialogHeader>
        <DialogBody className="flex justify-between">
          <div className="flex flex-col gap-3 w-1/2">
            <Input onChange={handleNome} color="blue" label="Nome" />

            <Input
              onChange={handleCodigoPaciente}
              color="blue"
              label="Código Paciente"
            />

            <div className="flex gap-2">
              <div className="relative w-full min-w-[200px]  h-10">
                <ReactInputMask
                  mask="(99) 99999-9999"
                  className={classInput}
                  onChange={handleTelefone}
                  color="blue"
                  label="Telefone"
                />
                <label className={labelInput}>Telefone</label>
              </div>
              <div className="relative w-full min-w-[200px]  h-10">
                <ReactInputMask
                  mask="99/99/9999"
                  className={classInput}
                  onChange={handleDataNascimento}
                  color="blue"
                  label="Data de nascimento"
                />
                <label className={labelInput}>Data de nascimento</label>
              </div>
            </div>
            <Typography className="-mb-2" variant="h6">
              Informações residencial
            </Typography>
            <div className="flex gap-2">
              <div className="relative w-full min-w-[200px] h-10">
                <ReactInputMask
                  mask={"99999-999"}
                  className={classInput}
                  onChange={handleCepPaciente}
                  color="blue"
                  label="CEP"
                />
                <label className={labelInput}>CEP</label>
              </div>
              <Input
                onChange={handleLogradouro}
                color="blue"
                label="Logradouro"
              />
            </div>
            <div className="flex gap-2">
              <Input onChange={handleBairro} color="blue" label="Bairro" />
              <Input
                type="number"
                onChange={handleNumeroCasa}
                color="blue"
                label="Numero da casa"
              />
            </div>
            <div className="relative w-20 h-10">
              <ReactInputMask
                mask="aa"
                className={classInput}
                onChange={handleUf}
                color="blue"
                label="UF"
              />
              <label className={labelInput}>UF</label>
            </div>
            <Input
              onChange={handleComplemento}
              color="blue"
              label="Complemento"
            />
          </div>
          <DragDropTag setSelectedTag={setSelectedTag}/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={async () => {
              if (
                (await CadastrarPaciente(
                  nome,
                  codigoPaciente,
                  telefone,
                  cepPaciente,
                  logradouro,
                  bairro,
                  uf,
                  numeroCasa,
                  complemento,
                  dataNascimento,
                  selectedTag
                )) === 201
              ) {
                 fetchData()
              }
               handleOpen();

            }}
          >
            <span>Cadastrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
