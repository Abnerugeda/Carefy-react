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
import axios from "axios";
import DragDropTag from "./DragDropTag";

export function DialogCreatePacientes() {
  const [open, setOpen] = useState(false);
  const [cepPaciente, setCepPaciente] = useState("");

  const handleOpen = () => setOpen((cur) => !cur);

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
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input color="blue" label="Nome" />
              <Input color="blue" label="Código Paciente" />
            </div>
            <div className="flex gap-2">
              <Input color="blue" label="Telefone" />
              <Input color="blue" label="Data de nascimento" />
            </div>
            <Typography className="-mb-2" variant="h6">
              Informações residencial
            </Typography>
            <div className="flex gap-2">
              <Input
                onChange={(e) => setCepPaciente(e.target.value)}
                color="blue"
                label="CEP"
              />
              <Input color="blue" label="Logradouro" />
            </div>
            <div className="flex gap-2">
              <Input color="blue" label="Bairro" />
              <Input color="blue" label="Numero da casa" />
            </div>
            <div className="flex gap-2">
              <Input color="blue" label="Complemento" />
              <Input color="blue" label="UF" />
            </div>
          </div>
          <DragDropTag/>
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
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
