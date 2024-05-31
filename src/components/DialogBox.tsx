import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PropsType = {
  trigger: string;
  title: string;
  description1: string;
  description2: string;
};

export default function DialogBox(props: PropsType) {
  return (
    <Dialog>
      <DialogTrigger>P{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description1}</DialogDescription>
          <DialogDescription>{props.description2}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
