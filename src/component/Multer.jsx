import { useState } from "react";

const Multer = () => {
  const [form, setForm] = useState({});
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [res, setRes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    const images = Array.from(files);
    setSelectedImgs(images);
  };

  const handleImageRemove = (index) => {
    const updatedImgs = [...selectedImgs];
    updatedImgs.splice(index, 1);
    setSelectedImgs(updatedImgs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    selectedImgs?.length > 0 &&
      [...selectedImgs].forEach((img) => {
        return formData.append("images", img);
      });

    //read formdata
    // for (let pair of formData.entries()) {
    //   //   console.log(pair);
    //   //   console.log(`${pair[0]}:${pair[1]}`);
    // }

    try {
      const url = "http://localhost:8000/api/v1/upload-image";
      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      const data = await response.json();
      const { imgeUrls } = data;
      setRes(imgeUrls);

      // imgeUrls is an array of urls for multiple images
      // extract required url and display in jsx using following link
      // use http://localhost:8000/<imageUrl>
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromServer = async () => {
    console.log(res);
    try {
      const url = "http://localhost:8000/api/v1/delete-images";
      const result = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath: res }),
      });
      const data = result.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex gap-4 justify-content-center">
      <form
        className="d-flex flex-column gap-4"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder=" Your Name"
          name="name"
          required
          onChange={handleChange}
        />

        <label htmlFor="images">{selectedImgs?.length} files Selected</label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/jpg, image/png"
          placeholder="Images"
          name="images"
          required
          onChange={handleImageChange}
        />

        {selectedImgs.length > 0 && (
          <div className="d-flex gap-2">
            {selectedImgs?.map((img, i) => {
              return (
                <div
                  key={i}
                  className="d-flex flex-column gap-1 align-items-center"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                  <span
                    className="text-danger"
                    onClick={() => handleImageRemove(i)}
                  >
                    Remove
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      {res.length > 0 && (
        <button style={{ height: "40px" }} onClick={deleteFromServer}>
          Remove Images from server
        </button>
      )}
    </div>
  );
};

export default Multer;
