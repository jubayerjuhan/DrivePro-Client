import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import image from "../../assets/apply-instructor.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { applyInstructorSchema } from "../../utils/validation_schemas/apply_schema";
import { applyInstructorFields } from "../../utils/InputFieldsDetail/InputFieldsDetail";
import "./ApplyInstructor.scss";
import Button from "../../components/core/Button/Button";
import { applyAsInstructor } from "../../api_calls/apply_api";
import { toast } from "material-react-toastify";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import TextField from "@mui/material/TextField";
import { AllLanguages } from "../../json_data/languages";
import { Autocomplete } from "@mui/material";
import { client } from "../../client";
import MaterialFileSelect from "../../components/MaterialFileSelect/MaterialFileSelect";
import InstructorAgreement from "../../components/InstructorAgreement/InstructorAgreement";
import { useForm } from "react-hook-form";

interface PhotoPreview {
  licensePhotos?: File | any;
  avater?: File | any;
}
const ApplyInstructor = () => {
  const [suburbs, setSuburbs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextpage, setNextpage] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState({});
  const [photo, setPhoto] = useState<PhotoPreview>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applyInstructorSchema),
  });

  // handle submit
  const onSubmit = (data: any) => {
    console.log(data, "data...");
    setInputValues(data);
    setNextpage(!nextpage);
  };

  // handleSuburbSearch
  const handleSuburbSearch = async (e: any) => {
    if (e.target.value.length === 0) setSuburbs([]);
    if (e.target.value.length < 2) return;
    setTimeout(async function () {
      setLoading(true);
      const { data } = await client.get(`/search-suburbs/${e.target.value}`);
      setLoading(false);
      setSuburbs(data.suburbs);
    }, 1000);
  };

  // handle profile avater change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, multiple: boolean | undefined) => {
    if (!multiple && e.target.files) {
      setPhoto({ ...photo, [e.target.name]: e.target.files[0] });
      console.log(photo, e.target.files, "photo...");
      // setValue(e.target.name, e.target.files[0]);
    }

    // if it is multiple input element
    setPhoto({ ...photo, [e.target.name]: e.target.files });
    setValue(e.target.name, e.target.files);
  };

  return (
    <>
      <HelmetTitle title={"Apply As Instructor"} />
      <Navbar />
      <div className="apply__instructor-main sectionPadding">
        <div className="apply__image">
          <img src={image} alt="apply as instructor hero img" />
        </div>
        {!nextpage ? (
          <div className="apply__instructor">
            <p className="title">Apply As Instructor</p>
            <div className="apply__instructor-fields">
              {applyInstructorFields.map((field, key) => {
                if (field.type === "textarea")
                  return (
                    <div className="input__wrapper_w-header" key={key}>
                      <p className="title">{field.label}</p>
                      <textarea
                        style={{
                          height: 100,
                          width: "100%",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                        className="input__element"
                        id=""
                        rows={5}
                        {...register(field.name)}
                      ></textarea>
                    </div>
                  );

                // if field type us autocomplete
                if (field.type === "autocomplete") {
                  return (
                    <div>
                      <Autocomplete
                        multiple={true}
                        id="tags-standard"
                        loading={loading}
                        onChange={(event, value) => {
                          console.log(value, "changed...");
                          if (value.length === 0) return setValue(field.name, "");
                          setValue(field.name, value);
                        }}
                        options={field.name === "languages" ? AllLanguages : suburbs}
                        getOptionLabel={(option: any) => (field.name === "languages" ? option.name : option.suburb)}
                        renderInput={(params) => (
                          <>
                            <TextField
                              {...params}
                              InputLabelProps={{
                                shrink: field.type === "date" ? true : true,
                              }}
                              onChange={handleSuburbSearch}
                              variant="outlined"
                              label={field.label + " *"}
                              placeholder={field.label}
                            />
                          </>
                        )}
                      />

                      {errors[field.name] && (
                        <p className="input__errorMessage">
                          <>{errors[field.name as keyof typeof errors]?.message}</>
                        </p>
                      )}
                    </div>
                  );
                }

                // if field type is select
                if (field.type === "select")
                  return (
                    <div style={{ width: "100%" }}>
                      <select style={{ width: "100%" }} className="select__field" {...register(field.name)}>
                        <option value={""}>{field.placeholder}</option>
                        {field.options?.map((opt: string | any) => (
                          <option value={field.name === "languages" ? opt?.name : opt}>
                            {field.name === "languages" ? opt?.name : opt}
                          </option>
                        ))}
                      </select>
                      {errors[field.name] && (
                        <p className="input__errorMessage">
                          <>{errors[field.name as keyof typeof errors]?.message}</>
                        </p>
                      )}
                    </div>
                  );

                // if input type is files
                if (field.type === "file") {
                  return (
                    <div>
                      <MaterialFileSelect
                        name={field.name}
                        multiple
                        handleFileChange={(e: any) => handleFileChange(e, field?.multiple)}
                        title={field.multiple ? "Select Photos" : "Select Photo"}
                        label={field.label}
                        placeholder={field.placeholder}
                      />

                      {photo && photo[field.name as keyof typeof photo] && (
                        <>
                          {[...photo[field.name as keyof typeof photo]].map((picture) => (
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                flexDirection: "column",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(picture)}
                                alt="avater"
                                style={{
                                  height: 200,
                                  width: 200,
                                  marginTop: 20,
                                  borderRadius: 10,
                                }}
                              />
                            </div>
                          ))}
                        </>
                      )}
                      {errors[field.name] && (
                        <p className="input__errorMessage">
                          <>{errors[field.name as keyof typeof errors]?.message}</>
                        </p>
                      )}
                    </div>
                  );
                }
                return (
                  <div className="input__wrapper">
                    <TextField
                      error={errors[field.name] ? true : false}
                      {...register(field.name)}
                      type={field.type}
                      id="outlined-basic"
                      label={field.label + " *"}
                      placeholder={field.placeholder}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: field.type === "date" ? true : true,
                      }}
                      sx={{ width: "100%" }}
                    />
                    {errors[field.name] && (
                      <p className="input__errorMessage">
                        <>{errors[field.name as keyof typeof errors]?.message}</>
                      </p>
                    )}
                  </div>
                );
              })}
              <Button title="Submit" width={"100%"} loading={loading} onClick={handleSubmit(onSubmit)} />
            </div>
          </div>
        ) : (
          <InstructorAgreement applyInputs={inputValues} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ApplyInstructor;
