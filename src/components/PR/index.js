import { useCallback, useEffect, useRef, useState } from "react";

const AutoComppleteType = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);
  const autoCompleteRef = useRef();
  const selectRef = useRef(null);

  const getTheData = async (search) => {
    fetch("url" + search)
      .then((res) => res.json())
      .then((items) => setData(items.products));
  };

  useEffect(() => {
    getTheData();
  });

  function inputDebounce(fn) {
    let timer;

    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  }

  const productsSearch = (myData) => {
    getTheData(myData);
  };

  const optimisedCall = useCallback(inputDebounce(productsSearch));

  const handleChange = (event) => {
    setValue(event.target.value);
    optimisedCall(event.target.value);
  };

  useEffect(() => {
    const closeList = (event) => {
      if (
        autoCompleteRef.current &&
        !autoCompleteRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", closeList);

    return () => {
      return document.removeEventListener("click", closeList);
    };
  }, []);

  const handlekeyUp = (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 40) {
      // move down
      if (active === data.length - 1) {
        setActive(0);
        return;
      }
      setActive((prev) => prev + 1);
    }

    if (keyCode === 38) {
      // move up

      if (active === 0) {
        setActive(data.length - 1);
      }
      setActive((prev) => prev - 1);
    }

    if (keyCode === 13) {
      // Enter
      setValue(data[active].title);
      setActive(null);
      setShow(false);
    }
  };

  return (
    <div ref={autoCompleteRef}>
      <input
        type="text"
        placeholder="search products"
        onChange={handleChange}
        onFocus={setShow(true)}
        onKeyUp={handlekeyUp}
      />

      {show && (
        <ul ref={selectRef}>
          {data.map((item) => {
            const { title, id } = item;
            return <li key={id}>{title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
