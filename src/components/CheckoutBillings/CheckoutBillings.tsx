import React from "react";
import states from "../../utils/supportedStates.json";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/core/Button/Button";
import { billingInfoSchema } from "../../utils/validation_schemas/billing_schema";
import { useDispatch } from "react-redux";
import { addBilling } from "../../redux/actions/cart_actions";
import { Action } from "../../redux/actions/actionTypings";

interface CheckoutBillingsProps {
  setBillings: React.Dispatch<React.SetStateAction<{}>>;
  setPaymentAvailable: any;
}
const CheckoutBillings = ({ setBillings, setPaymentAvailable }: CheckoutBillingsProps) => {
  const dispatch = useDispatch<any>();
  const billingFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "suburb", label: "Suburb", type: "text" },
    { name: "postCode", label: "Post Code", type: "text" },
    { name: "state", label: "State", type: "select", option: states },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(billingInfoSchema),
  });

  const onSubmit = (data: any) => {
    setBillings(data);
    window.scrollTo(0, 0);
    dispatch(addBilling(data));
    setPaymentAvailable(true);
  };
  return (
    <div className="checkout__billing">
      <p className="title">Billing Address</p>
      <form className="input__fields-main">
        {billingFields.map((field, key) => {
          if (field.type === "select")
            return (
              <select {...register(field.name)} className="form-control input__element login">
                <option value="">Select State</option>
                {field.option &&
                  field.option.map((selectOptions, key) => (
                    <option value={selectOptions.name} key={key}>
                      {selectOptions.name}
                    </option>
                  ))}
              </select>
            );
          return (
            <div>
              <input
                key={key}
                type={field.type}
                placeholder={`Enter ${field.label}`}
                {...register(field.name)}
                className="form-control input__element login"
              />
              <p className="input__errorMessage">
                <>{errors[field.name]?.message}</>
              </p>
            </div>
          );
        })}
        <Button title="Submit" width={"100%"} onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default CheckoutBillings;
