import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Carrosel = () => {
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [groupSize, setGroupSize] = useState(3); // Valor inicial

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const divideProductsIntoGroups = () => {
      const groups = [];
      const totalProducts = products.length;
      let startIndex = 1;

      while (startIndex < totalProducts) {
        const endIndex = startIndex + groupSize;
        const group = products.slice(startIndex, endIndex);
        groups.push(group);
        startIndex = endIndex;
      }

      setProductGroups(groups);
    };

    divideProductsIntoGroups();
  }, [products, groupSize]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        setGroupSize(1);
      } else if (window.matchMedia("(max-width: 800px)").matches) {
        setGroupSize(2);
      } else {
        setGroupSize(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="container-2" title="container-2">
      <div className="highLightsBoxs" id="highlightsBoxs">
        <Carousel showArrows infiniteLoop showThumbs={false}>
          {productGroups.map((group, index) => (
            <div key={index}>
              {group.map(({ id, ...product }) => (
                <ProductCard key={id} id={id} {...product} />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Carrosel;


const CarroselAds = () => {
  return (
    <Carousel
      className="carouselAds"
      showArrows
      infiniteLoop
      autoPlay
      slidesToShow={3}
      showThumbs={false}
    >
      <div key={""}>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fprocessador-amd-ryzen-5-5700x.jpg?alt=media&token=7bdc8166-999a-4e30-a107-0f764178b3e2"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fintel-core-i5-10400.jpg?alt=media&token=5fba487b-5c9b-4c6b-8da6-dddb4322c9c9"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgeforce-rtx.jpg?alt=media&token=6ecb2a40-a47f-44f0-ad23-f83131bdee5a"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fintel-core-i9-10900kf.jpg?alt=media&token=2fa2bb15-eeb5-400f-88c0-9b6f039d4533"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fprocessador-amd-ryzen-5-5600.jpg?alt=media&token=60df218d-0ae3-412a-9165-8ddf09af925a"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2F331008700_3455033461479559_8862723695959120508_n.jpg?alt=media&token=0a815323-4737-4362-8e7e-92419b9c70fd"
          alt=""
        />
      </div>
    </Carousel>
  );
};

export { CarroselAds, Carrosel };
