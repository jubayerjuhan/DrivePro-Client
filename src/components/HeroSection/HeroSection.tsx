/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./HeroSection.scss";
import { client } from "../../client";
import Button from "../core/Button/Button";
import { toast } from "material-react-toastify";
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { SET_SUBURBS } from "../../redux/reducer/reduxNamings";
export interface Suburb {
  suburb: string;
  state: string;
  postcode: number;
  price: number;
}

interface Props {
  title?: string;
}
const HeroSection = ({ title }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [suburbs, setSuburbs] = useState<Suburb[]>([]);
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb>();
  const [keyWord, setkeyWord] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const transmissions = [
    { name: "Auto", value: "auto" },
    { name: "Manual", value: "manual" },
  ];
  const [transmission, setTransmission] = useState({
    name: "",
    value: "",
  });

  useEffect(() => {
    setTransmission(transmissions[0]);
  }, []);

  useEffect(() => {
    getSuburbs();
  }, [keyWord]);

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setkeyWord(e.target.value);
    setInputValue(e.target.value);
  };

  const getSuburbs = async () => {
    if (keyWord.length === 0) setSuburbs([]);
    if (keyWord.length < 2) return;
    setLoading(true);
    const { data } = await client.get(`/search-suburbs/${keyWord}`);
    setLoading(false);
    setSuburbs(data.suburbs);
  };

  const handleSubmit = () => {
    if (!selectedSuburb) return console.log("No Suburb Selected");
    if (!selectedSuburb.state) return toast.warn("Please Select A Suburb");
    window.location.href = `/instructors-list/${selectedSuburb.postcode}/${transmission.value}/${selectedSuburb.suburb}`;
  };

  return (
    <section className="heroSection sectionPadding">
      <div className="heroSection__textContainer">
        <p className="heroSection__title">
          {title ? title : "Find Which Area You Need a Driving Instructor"}
        </p>
        <ul className="heroSection__bullets">
          <li>
            from a huge quantity of credible instructors and a wide range of new
            students every year 24/7 online scheduling & booking,You may swap
            instructors at any moment
          </li>
          {/* <li>100,000+ new learners per year</li>
          <li>24/7 online booking & rescheduling</li>
          <li>Change your instructor anytime</li> */}
        </ul>
      </div>
      <div className="heroSection__selector">
        <div className="heroSection__transmission">
          {transmissions.map((trans, key) => (
            <div
              className={`transmission__name ${
                transmission?.name === trans.name ? "selected" : ""
              }`}
              key={key}
              onClick={() => setTransmission(trans)}
            >
              <p>{trans.name}</p>
            </div>
          ))}
        </div>
        <div className="heroSection__subrub-selector">
          <input
            onChange={handleInputChange}
            value={inputValue}
            onFocus={() => setListOpen(true)}
            onBlur={() => {
              setTimeout(function () {
                setListOpen(false);
              }, 500);
            }}
            type="text"
            className="subrub__input input__element"
            placeholder="Enter Your Suburb"
          />
          {listOpen && (
            <div
              className="subrubs__list"
              onFocus={() => setListOpen(true)}
              onClick={() => console.log("first")}
            >
              {suburbs.length === 0 && keyWord.length === 0 && (
                <>
                  <p className="suburb__list-name-title">
                    Enter Suburb Name or Postcode
                  </p>
                </>
              )}
              {loading && (
                <div className="spinner__container">
                  <Spinner size={40} />
                </div>
              )}
              {!loading &&
                suburbs.map((suburb, key) => (
                  <p
                    onClick={() => {
                      setInputValue(
                        `${suburb.suburb} ${suburb.state} ${suburb.postcode}`
                      );

                      setSelectedSuburb(suburb);
                      dispatch({ type: SET_SUBURBS, payload: suburb });
                    }}
                    className="suburb__list-name"
                    key={key}
                  >{`${suburb.suburb} ${suburb.state} ${suburb.postcode}`}</p>
                ))}
            </div>
          )}
        </div>
        <div className="suburb__submit-btn">
          <Button
            onClick={handleSubmit}
            className="submit__suburb"
            title="Submit"
            width="100%"
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
