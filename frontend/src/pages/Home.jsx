import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Task from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTask } from "@/context/Reducers";
import { SkeletonCard } from "./Shimmer";

export default function Home() {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed,setCompleted] = useState([]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTask({ message: "" }));
    }
  }, [status, dispatch]);

  const filteredTasks = tasks.filter((task) =>
    task?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));
  };

  const handleDeleteAllTask = () => {
    dispatch(deleteTask());
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-16 flex flex-col items-center min-h-screen p-4">
      <h1 className="font-extrabold text-purple-950 text-3xl mb-6 mt-4 dark:text-white">
        TODO APP
      </h1>

      <div className="flex flex-col sm:flex-row w-full max-w-sm justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Eg. Going for a walk"
          className="min-w-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="w-full sm:w-auto flex items-center justify-center space-x-2"
            >
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="text-xl"
                style={{ color: "#a78bfa" }}
              />
              <span>Add Task</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Fill in the details of your new task. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={() =>
                handleAddTask({
                  title: title,
                  description: description,
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
                    placeholder="Enter task title"
                    className="col-span-3"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Enter task description"
                    className="col-span-3"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="selector" className="text-left">
                    Status
                  </Label>
                  <Select className="col-span-3">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Add status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="todo">To do</SelectItem>
                        <SelectItem value="doing">Doing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center space-x-2"
          onClick={handleDeleteAllTask}
        >
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#a78bfa" }}
            className="text-xl"
          />
          <span>Clear all</span>
        </Button>
      </div>

      <DndContext collisionDetection={closestCenter}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-6xl ">
          <div className="flex flex-col gap-4 w-full lg:w-1/3 items-center">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              🎯 To Do
            </h2>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Task
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  createdAt={task.createdAt}
                />
              ))
            ) : (
              <SkeletonCard />
            )}
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/3 items-center">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              🌟 Doing
            </h2>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Task
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  createdAt={task.createdAt}
                />
              ))
            ) : (
              <SkeletonCard />
            )}
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/3 items-center">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              ✅ Done
            </h2>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Task
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  createdAt={task.createdAt}
                />
              ))
            ) : (
              <SkeletonCard />
            )}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
