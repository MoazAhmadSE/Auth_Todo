import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { Loading2 } from "./Loading2";
import { db } from "../firebase/FirebaseConfig";
import { doc, runTransaction } from "firebase/firestore";

export const AddTasks = ({ userId }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (task) {
      setLoading(true);
      const userTaskDoc = doc(db, "tasks", userId);
      try {
        await runTransaction(db, async (transaction) => {
          const taskDoc = await transaction.get(userTaskDoc);
          if (!taskDoc.exists()) {
            throw new Error("Document does not exist");
          }
          const currentTasks = taskDoc.data().todo || [];
          currentTasks.push(task);
          // currentTasks.unshift(task);
          

          transaction.update(userTaskDoc, { todo: currentTasks });
        });
        console.log("Task added successfully!");
      } catch (error) {
        console.error("Error adding task:", error);
      }
      setTask("");
      setLoading(false);
    }
  };

  return (
    <div className="tw-flex tw-items-center tw-w-[100%] tw-mt-5">
      <Input
        className="tw-w-[80%] tw-text-slate-200 tw-bg-transparent tw-border tw-border-slate-600 tw-p-2 focus:tw-border-myYellow tw-rounded-xl tw-my-2 tw-outline-none tw-rounded-r-none"
        type={"text"}
        placeholder={"Enter Task Here"}
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <Button
        className={
          "tw-w-[20%] tw-h-[40px] tw-flex tw-items-center tw-justify-center tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-2xl tw-font-bold hover:tw-underline tw-duration-500 tw-rounded-l-none"
        }
        text={loading ? <Loading2 /> : "Add"}
        onClick={handleSubmit}
      />
    </div>
  );
};
