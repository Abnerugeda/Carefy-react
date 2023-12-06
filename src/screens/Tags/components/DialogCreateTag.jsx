import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Textarea,
} from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { SliderPicker } from "react-color";
import CadastrarTags from "../../../controller/Tags/CadastrarTags";

export function DialogCreateTag({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [corSelecionada, setCorSelecionada] = useState("#ff2f2f");
  const [nomeTag, setNomeTag] = useState("");
  const [codigoTag, setCodigoTag] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleNomeTag = (e) => setNomeTag(e.target.value);
  const handleCodigoTag = (e) => setCodigoTag(e.target.value);
  const handleDescricao = (e) => setDescricao(e.target.value);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleChangeCor = (cor) => {
    setCorSelecionada(cor.hex);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex items-center gap-3"
        color="blue"
        size="sm"
      >
        <Plus strokeWidth={2} className="h-4 w-4" /> Cadastrar Tag
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Cadastrar Tag
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Entre com as informações solicitadas
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nome da Tag
            </Typography>
            <Input onChange={handleNomeTag} label="Nome" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Código da Tag
            </Typography>
            <Input onChange={handleCodigoTag} label="Código" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Descrição
            </Typography>
            <Textarea onChange={handleDescricao} label="Descrição" size="lg" />

            <SliderPicker color={corSelecionada} onChange={handleChangeCor} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="blue"
              onClick={async () => {
                if (
                  (await CadastrarTags(
                    nomeTag,
                    descricao,
                    codigoTag,
                    corSelecionada
                  )) === 201
                ) {
                  fetchData();
                }
                handleOpen();
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
