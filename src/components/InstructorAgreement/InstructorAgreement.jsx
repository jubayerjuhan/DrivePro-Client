import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, InputLabel, TextField } from "@mui/material";
import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AgreementForm from "../../AgreementForm/AgreementForm";
import { uploadFileToCloud } from "../../api_calls/user_api";
import { client } from "../../client.js";
import { instructorAgreementFields } from "../../utils/InputFieldsDetail/InputFieldsDetail";
import { instructorAgreementSchema } from "../../utils/validation_schemas/apply_schema";
import Button from "../core/Button/Button";
import MaterialFileSelect from "../MaterialFileSelect/MaterialFileSelect";
import "./InstructorAgreement.scss";

const InstructorAgreement = ({ applyInputs }) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [signature, setSignature] = useState();
  const handleSignatureChange = (e) => {
    setSignature(e.target.files[0]);
    setValue("signature", e.target?.files[0]);
  };

  // implement react hook form here for account details and signature
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(instructorAgreementSchema),
  });

  // on form submit
  const onSubmit = async (data) => {
    if (!agreed)
      return toast.error("You Must Need To Agree Our Terms And Conditions");
    //  loading started
    setLoading(true);
    let instructorData = { ...data, ...applyInputs };
    console.log(instructorData, "applicant instructor...");

    //  uploading signature and avater Image
    const licensePhotos = [...instructorData.licensePhotos];

    let licensePhotoLinks = [];
    for (const photo in licensePhotos) {
      const uploadedPhotoLink = await uploadFileToCloud(licensePhotos[photo]);
      licensePhotoLinks.push(uploadedPhotoLink?.file);
    }

    console.log(licensePhotoLinks, "License Photo Links...");

    const signature = await uploadFileToCloud(instructorData.signature);
    const avater = await uploadFileToCloud(instructorData.avater[0]);

    // setting singanture and avater url
    instructorData.signature = signature.file;
    instructorData.avater = avater.file;
    instructorData.licensePhotos = licensePhotoLinks;

    client
      .post("/apply-instructor", instructorData)
      .then((res) => {
        window.location.href = `/application-success/${res.data.applicant?._id}`;
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("There Was an Error Submitting Your Application");
      });
  };

  return (
    <div className="apply__instructor-agreement">
      <AgreementForm
        date={Date.now()}
        instructorName={`${applyInputs?.firstName} ${applyInputs.lastName}`}
        address={applyInputs?.address}
        email={applyInputs?.email}
        phone={applyInputs?.phone}
      />
      <div className="signature">
        <MaterialFileSelect
          handleFileChange={handleSignatureChange}
          title={"Signature"}
          label={"Signature"}
          {...register("signature")}
          placeholder={"Please Upload a Clear Image of Your Signature"}
        />
        <p style={{ color: "red", marginTop: "10px", fontSize: "12px" }}>
          {errors.signature?.message}
        </p>
      </div>
      {signature && (
        <img
          src={URL.createObjectURL(signature)}
          alt="signature"
          style={{ height: 200, width: 200, marginTop: 20 }}
        />
      )}
      <div className="instructor__agreement-inputs">
        {instructorAgreementFields.map((field, key) => {
          return (
            <>
              <InputLabel>{field.label}</InputLabel>
              <TextField
                error={errors[field.name]}
                helperText={errors[field.name]?.message}
                {...register(field.name)}
                key={key}
                id="outlined-basic"
                label={field.label}
                variant="outlined"
              />
            </>
          );
        })}
      </div>
      <div className="checkbox__agreement">
        <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />
        <p className="description">
          By clicking this you will agree to My Instructor's{" "}
          <a href="/terms/instructor" target={"_blank"}>
            Instructor Terms And Conditions
          </a>
        </p>
      </div>
      <Button
        loading={loading}
        width={"100%"}
        title={"Apply Now"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default InstructorAgreement;
