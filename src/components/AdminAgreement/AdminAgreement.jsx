import React, { useState, useMemo, useRef, useEffect } from "react";

import JoditEditor from "jodit-react";
import AdminPageWrapper from "../AdminPageWrapper/AdminPageWrapper";
import { client } from "../../client.js";
import { Button } from "@mui/material";

export default function AdminAgreement() {
  const editor = useRef(null);
  const [agreement, setAgreement] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    client.get("/agreement/get-agreement").then((res) => {
      console.log(res.data.agreement.agreement);
      setAgreement(res.data.agreement.agreement);
    });
  }, []);

  const saveAgreement = () => {
    client
      .put("/agreement/edit-agreement", { agreement: content })
      .then((res) => {
        alert("Agreement Updated");
      })
      .catch((err) => {
        alert("Agreement Edit Failed");
      });
  };
  return (
    <AdminPageWrapper>
      <div className="App">
        <JoditEditor
          ref={editor}
          value={agreement}
          // config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={saveAgreement}>
          Save Agreement
        </Button>
        <div
          style={{ marginTop: "50px" }}
          dangerouslySetInnerHTML={{ __html: agreement }}
        />
      </div>
    </AdminPageWrapper>
  );
}
