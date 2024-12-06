import { TextField, List, ListItem, ListItemText } from "@mui/material";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import { client } from "../../client";
import { Suburb } from "../../typings/instructorTypings";
import "./SuburbSelector.scss";

interface Props {
  setValue: any;
  error: String | any;
}
const SuburbSelector = forwardRef((props: Props, ref) => {
  const [suburbs, setSuburbs] = useState<Suburb[]>([]);
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb>();
  const [filteredSuburbs, setFilteredSuburbs] = useState<Suburb[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [listHidden, setListHidden] = useState(true);

  const handleFieldChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value.toLowerCase();

    if (!userInput) {
      // If the user input is empty, show all suburbs
      setFilteredSuburbs(suburbs);
      return;
    }

    try {
      setListHidden(false);
      const { data } = await client.get(`/search-suburbs/${userInput}`);
      setFilteredSuburbs(data.suburbs);
    } catch (error) {
      console.error(error);
      setFilteredSuburbs([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setListHidden(true);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelectSuburb = (suburb: Suburb) => {
    props.setValue("suburb", suburb._id);
    // changing the inner value of the text field
    if (textFieldRef.current) textFieldRef.current.value = suburb.suburb;
    setListHidden(true);
  };
  return (
    <div style={{ position: "relative" }}>
      <p className="fieldLabel">
        {"Suburb"} <span>*</span>
      </p>
      <input
        ref={textFieldRef}
        onChange={handleFieldChange}
        style={{ width: "100%" }}
        type={"text"}
        placeholder={"Suburb"}
        className="form-control input__element login"
      />
      {filteredSuburbs.length === 0 && (
        <div
          className="not_suburb_found"
          style={{ display: listHidden ? "none" : "block" }}
        >
          No Suburb Found
        </div>
      )}
      {filteredSuburbs.length > 0 && (
        <List
          className="suburb__list"
          ref={listRef}
          sx={{
            position: "absolute",
            width: "100%",
            margintop: 0,
            maxHeight: 150,
            overflow: "scroll",
            background: "white",
            display: listHidden ? "none" : "block",
          }}
        >
          {filteredSuburbs.map((suburb) => (
            <ListItem
              sx={{ cursor: "pointer" }}
              key={suburb._id}
              onClick={() => handleSelectSuburb(suburb)}
            >
              <ListItemText primary={suburb.suburb} />
            </ListItem>
          ))}
        </List>
      )}
      {props.error && <div className="not_suburb_found">{props.error}</div>}
    </div>
  );
});

export default SuburbSelector;
