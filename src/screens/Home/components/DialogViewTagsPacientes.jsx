import React, { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { TagIcon } from "lucide-react";

export function DialogViewTagsPacientes({ cor, tags }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <TagIcon
        onClick={handleOpen}
        width={15}
        className="hover:w-5"
        color={cor}
      />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] max-h-[500px] overflow-scroll">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Tags vinculadas
            </Typography>

            {tags.map((tag) => {
              return (
                <>
                  <div className="flex gap-4 overflow-hidden overflow-elipses">
                    <TagIcon width={25} className="hover:w-5" color={tag.Cor} />
                    <div>
                      <Typography variant="h6">{tag.Nome}</Typography>
                      <Typography variant="h6">{tag.Descricao}</Typography>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 h-[1px]"/>

                </>
              );
            })}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
