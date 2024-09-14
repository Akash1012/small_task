import { useState, useEffect } from "react";
import "./styles.css";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );

      const data = await response.json();
      setProducts(data.products);

      // setTotal(data.total / 10);
      let total = Math.round(data.total / 10);
      setTotal(total);

      console.log("totoa", total);
    };
    fetchData();
  }, [page]);

  const nextPage = (pg) => {
    setPage(pg);
  };

  const addToCart = (value) => {
    let id = value.id;
    let updateCartWithQty = {
      [id]: {
        ...value,
        qty: 1,
      },
    };

    setCart({
      ...cart,
      ...updateCartWithQty,
    });
  };

  const removeFromCart = (id) => {
    // debugger;
    let updateCart = cart;
    delete updateCart[id];
    console.log("delete", updateCart);
    setCart({
      ...cart,
      ...updateCart,
    });
  };

  const addQty = (id) => {
    let updateQty = cart;
    let getSingleProduct = updateQty[id];
    let newQty = getSingleProduct.qty + 1;
    getSingleProduct.qty = newQty;

    setCart({
      ...cart,
      [id]: getSingleProduct,
    });

    console.log("getSingleProduct", getSingleProduct, newQty);
  };

  const subQty = (id) => {
    let updateQty = cart;
    let getSingleProduct = updateQty[id];
    let newQty = getSingleProduct.qty - 1;

    // debugger;

    if (newQty === 0) {
      removeFromCart(id);
      return;
    }
    getSingleProduct.qty = newQty;

    setCart({
      ...cart,
      [id]: getSingleProduct,
    });

    console.log("getSingleProduct", getSingleProduct, newQty);
  };

  console.log("cart", cart);

  const [totalCartValue, setTotalCartValue] = useState("");

  useEffect(() => {
    let totalValue = 0;
    Object.keys(cart).map((id) => {
      totalValue += cart[id].price * cart[id].qty;
    });
    setTotalCartValue(totalValue);
  }, [cart]);

  return (
    <>
      <div>
        <h1 className="header">Pagination</h1>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className="main-container">
            {products?.map((item) => {
              const { id, title, thumbnail } = item;
              return (
                <div className="img-main" key={id}>
                  <img className="img" src={thumbnail} alt={title} />
                  {Object.keys(cart)?.some((ct) => cart[ct].id === item.id) ? (
                    <div
                      className="add"
                      style={{
                        display: "flex",
                      }}
                    >
                      <span className="number_">
                        <span onClick={() => addQty(item.id)}>+</span>
                      </span>
                      <span className="number_">
                        <span onClick={() => subQty(item.id)}>-</span>
                      </span>
                      <span className="qty">
                        {cart[item?.id]["qty"] ? cart[item?.id]["qty"] : "XXX"}
                      </span>
                    </div>
                  ) : (
                    <button
                      className="btn-cart"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  )}
                  {/* <button className="btn-cart" onClick={() => addToCart(item)}>
                  Add To Cart
                </button> */}
                </div>
              );
            })}
          </div>
          <div className="showCartItem">
            {Object.keys(cart).map((item) => {
              const { id, title, thumbnail, qty, price } = cart[item];
              const product_price = price * qty;
              return (
                <div className="cart_row">
                  <img className="cart_img" src={thumbnail} alt={title} />
                  <span className="cart_title">{title}</span>
                  <div className="price_qty">
                    {price} * {qty} = {product_price}
                  </div>
                </div>
              );
            })}

            {Object.keys(cart).length > 0 && (
              <div className="cart_totol_value">TOTAL :{totalCartValue}</div>
            )}
          </div>
        </div>
        <div className="list_number">
          {page !== 1 && (
            <div
              className="number"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              LEFT
            </div>
          )}
          {[...Array(total)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <div
                onClick={() => nextPage(pageNumber)}
                className={page == pageNumber ? "number page-select" : "number"}
              >
                <span>{pageNumber}</span>
              </div>
            );
          })}
          {page !== total && (
            <div
              className="number"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              RIGHT
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
