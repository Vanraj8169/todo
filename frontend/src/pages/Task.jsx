/* eslint-disable react/prop-types */
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "@/context/Reducers";

const Task = ({ id, title, description, createdAt }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleUpdate = (updatedTask) => {
    dispatch(updateTask(updatedTask));
  };
  return (
    <div className="shadow-md w-80 rounded-lg p-3 bg-violet-300">
      <div className="flex justify-between items-center">
        <h1 className="text-black font-bold text-lg">{title}</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#3b0764" }}
              className="cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
              <DialogDescription>
                Make changes to your todo here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={() =>
                handleUpdate({
                  id: id,
                  title: editTitle,
                  description: editDescription,
                })
              }
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-left">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-between gap-5 items-center">
        <p className="text-slate-700 font-light">{description}</p>
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "#3b0764" }}
          className="cursor-pointer"
        />
      </div>
      <div className="text-white text-sm font-light ">
        <p>{new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Task;
