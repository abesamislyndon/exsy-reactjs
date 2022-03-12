import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@chakra-ui/react";

function Fileupload() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState("");
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div>
      <Input  type="file" {...register("image")} onChange={changeHandler}  />
    </div>
  );
}

export default Fileupload;
