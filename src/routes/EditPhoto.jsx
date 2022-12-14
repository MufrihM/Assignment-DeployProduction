import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = async (e) => {
    e.preventDefault()
      const response = await fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "imageUrl": imageUrl,
          "captions": captions,
          "createdAt": data.createdAt,
          "updatedAt": data.updatedAt,
          "secret": data.secret,
          "id": id
        })
      })
      navigate("/photos")
  };

  const detailPhoto = async (id) => {
    try{
      const url = `https://gallery-app-server.vercel.app/photos/${id}`
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      setImageUrl(data.imageUrl)
      setCaptions(data.captions)
    }catch(e){
      setError(e)
    }
  }


  useEffect(() => {
    setLoading(true);
    detailPhoto(id)
    // editPhoto(id)
    setLoading(false)
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit"/>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
