import React, { useState, useEffect } from "react";
import { makeStyles, Container, Button } from "@material-ui/core";
import Cookies from "js-cookie";
import { DropzoneArea } from "material-ui-dropzone";
import { Formik } from "formik";
import { IState as Props } from "./Edit";
interface IProps {
  carinfo: Props["carinfo"];
}
const useStyles = makeStyles({
  form: {
    marginTop: 20,
    textAlign: "center",
  },
  field: {
    marginTop: 10,
  },
  image: {
    height: "280px",
  },
});

interface FormValues {
  images_id: number | undefined;
  cloudinary_id: string | undefined;
  secure_url: string | undefined;
  cars_id: number | undefined;
}

interface currentCarImage {
  images_id: number;
  cloudinary_id: string;
  secure_url: string;
  cars_id: number;
}

const UploadCars: React.FC<IProps> = ({ carinfo }) => {
  const classes = useStyles();
  const [image, setImage] = useState<any>();
  //const [car, setCar] = useState<number>(0);
  const [previewSource, setPreviewSource] = useState("");
  const [carImage, setCarImage] = useState<currentCarImage>();
  const [initialValues, setinitialValues] = useState<FormValues>({
    images_id: undefined,
    cloudinary_id: undefined,
    secure_url: undefined,
    cars_id: undefined,
  });

  console.log("Upload car", carinfo);
  const car = carinfo.cars_id;

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`/images/image/${car}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const imageData = await res.json();
      console.log("image front", imageData[0]);

      setinitialValues({
        images_id: imageData[0]?.images_id,
        cloudinary_id: imageData[0]?.cloudinary_id,
        secure_url: imageData[0]?.secure_url,
        cars_id: imageData[0]?.cars_id,
      });

      console.log("initialValues: ", initialValues);

      if (imageData.length > 0) {
        setCarImage(imageData[0]);
        console.log("this is carImage: ", imageData[0]);
      } else {
        console.log("there was nothing in array");
      }
    };
    fetchImages();
    // eslint-disable-next-line
  }, [initialValues?.images_id]);

  const handleSubmit = async (formValue: FormValues) => {
    const reader: any = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        console.log("base64",reader.result);
      };
      if (!previewSource) return;
    } else {
      setPreviewSource("");
    }

    const ImageURL = { avatar: previewSource };
    let merge = { ...initialValues, ...ImageURL };
    console.log("this is merge: ", merge);

    const updateUserAccount = async () => {
      try {
        const res = await fetch("/images/image/" + initialValues.images_id, {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        alert("Image updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    updateUserAccount();
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            ...initialValues,
          }}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Container>
              <form onSubmit={formik.handleSubmit} className={classes.form}>
                <div className={classes.image}>
                  {carImage !== undefined ? (
                    <img
                      src={carImage.secure_url}
                      alt=""
                      style={{ maxHeight: "280px" }}
                    />
                  ) : (
                    <h1>Nothing was found</h1>
                  )}
                </div>
                <div className={classes.field}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an avatar here or click"}
                    filesLimit={1}
                    onChange={(files) => {
                      setImage(files[0]);
                    }}
                  />
                </div>
                <Button
                  className={classes.form}
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{ marginTop: 20 }}
                >
                  Submit
                </Button>
              </form>
            </Container>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UploadCars;
