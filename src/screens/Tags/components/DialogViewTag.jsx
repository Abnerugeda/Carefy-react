import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import CardTag from "./CardTag";
import { SliderPicker } from "react-color";
import EditarTags from "../../../controller/Tags/EditarTags";
import { Trash2Icon } from "lucide-react";
import DeleteTags from "../../../controller/Tags/DeleteTags";
import ReactLoading from 'react-loading';

export function DialogViewTag({ nome, codigoTag, descricao, cor, fetchData }) {
  const [open, setOpen] = useState(false);
  const [newCorSelecionada, setCorSelecionada] = useState(cor);
  const [newNomeTag, setNomeTag] = useState(nome);
  const [newCodigoTag, setCodigoTag] = useState(codigoTag);
  const [newDescricao, setDescricao] = useState(descricao);
  const [atualizar, setAtualizar] = useState(false);

  const handleNomeTag = (e) => setNomeTag(e.target.value);
  const handleCodigoTag = (e) => setCodigoTag(e.target.value);
  const handleDescricao = (e) => setDescricao(e.target.value);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleChangeCor = (cor) => {
    setCorSelecionada(cor.hex);
  };

  return (
    <>
      <CardTag
        onClick={handleOpen}
        key={codigoTag}
        nome={nome}
        cor={cor}
        codigoTag={codigoTag}
      />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Typography variant="h4" color="blue-gray">
                Editar Tag
              </Typography>
              {atualizar ? (
                <ReactLoading
                  type={"cylon"}
                  color={"#379CF0"}
                  height={"50px"}
                  width={"50px"}
                />
              ) : (
                <IconButton
                  onClick={async () => {
                    setAtualizar(true);
                    if ((await DeleteTags(codigoTag)) === 200) {
                      fetchData();
                    }
                    handleOpen();
                  }}
                  color="white"
                >
                  <Trash2Icon color="red" />
                </IconButton>
              )}
            </div>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Aqui você poderá visualizar e editar suas tags.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nome da Tag
            </Typography>
            <Input
              value={newNomeTag}
              onChange={handleNomeTag}
              label="Nome"
              size="lg"
            />
            <Typography className="-mb-2" variant="h6">
              Código da Tag
            </Typography>
            <Input
              value={newCodigoTag}
              onChange={handleCodigoTag}
              label="Código"
              size="lg"
            />
            <Typography className="-mb-2" variant="h6">
              Descrição
            </Typography>
            <Textarea
              value={newDescricao}
              onChange={handleDescricao}
              label="Descrição"
              size="lg"
            />

            <SliderPicker
              color={newCorSelecionada}
              onChange={handleChangeCor}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="blue"
              onClick={async () => {
                handleOpen();

                if (
                  (await EditarTags(
                    newNomeTag,
                    newDescricao,
                    newCodigoTag,
                    codigoTag,
                    newCorSelecionada
                  )) === 200
                ) {
                  fetchData();
                }
              }}
              fullWidth
            >
              Cadastrar Tag
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
