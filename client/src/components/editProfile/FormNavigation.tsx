import React from "react";
import { FormikValues } from "formik";
import { Button } from "@material-ui/core";

interface Props {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const FormNavigation = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "space-between",
      }}
    >
      {props.hasPrevious && (
        <Button variant="contained" type="button" onClick={props.onBackClick}>
          Back
        </Button>
      )}

      <Button type="submit" color="primary" variant="contained">
        {props.isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

export default FormNavigation;
