import { useState, useEffect, useRef } from "react";
import "./styles.css";

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const Infinite = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const data = await response.json();
      setProducts([...products, ...data.products]);
      setTotalPage(data.total);
    };
    fetchData();
  }, [page]);

  const infiniteScroll = () => {
    if (Infinite.current) {
      const { clientHeight, scrollTop, scrollHeight } = Infinite.current;

      if (clientHeight + scrollTop + 1 >= scrollHeight) {
        if (page < totalPage) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="header">Infinite Scroll</h1>
        <div className="container" ref={Infinite} onScroll={infiniteScroll}>
          {products?.map((item) => {
            const { id, title, thumbnail } = item;
            return (
              <div className="prod-img" key={id}>
                <img className="img" src={thumbnail} alt={title} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
