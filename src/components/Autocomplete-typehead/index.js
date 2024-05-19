import { useEffect, useState, useRef, useCallback } from "react";
import "./style.css";

function AutoCompleteTypeHead() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const autocompleteRef = useRef();
  const selectRef = useRef(null);

  useEffect(() => {
    const closeList = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", closeList);
    return () => document.removeEventListener("click", closeList);
  }, []);

  const getTheData = (search = "") => {
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((items) => setData(items.products));
  };

  useEffect(() => {
    // getTheData();
  }, []);

  const handleClick = (title) => {
    setValue(title);
    setShow(false);
    getTheData(title);
  };

  function inputDebounce(fn) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      // setValue(args[0].target.value);
      timer = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  }

  function handleInputChange(event) {
    getTheData(event);
  }

  const optimisedCall = useCallback(inputDebounce(handleInputChange), []);

  const handleKeyUp = (event) => {
    const keyCode = event.keyCode;
    // setTimeout(() => {
    setChange();
    // }, [100]);

    if (keyCode === 13) {
      // enter
      setValue(data[activeIndex].title);
      setActiveIndex(null);
      setShow(false);
      return;
    }

    if (keyCode === 40) {
      // key move down
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
        return;
      }
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else if (keyCode === 38) {
      // move up
      if (activeIndex === 0) setActiveIndex(data.length - 1);
      else setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const setChange = () => {
    const selected = selectRef?.current?.querySelector(".active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  function handleChange(event) {
    setValue(event.target.value);
    optimisedCall(event.target.value);
  }

  return (
    <>
      <h3 className="header">Auto Complete Type Head</h3>
      <div className="autocomplete" ref={autocompleteRef}>
        <input
          value={value}
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Type to Search"
          onFocus={() => setShow(true)}
          onKeyUp={handleKeyUp}
        />

        {show && (
          <ul ref={selectRef}>
            {data.map((item, index) => {
              return (
                <li
                  className={index === activeIndex && "active"}
                  onClick={() => handleClick(item.title)}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default AutoCompleteTypeHead;
