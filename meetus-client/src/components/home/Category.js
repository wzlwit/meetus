import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap/esm";
import { Link } from "react-router-dom";
import styled from "styled-components";
import themeList from "../header/themeList";

const CategoryStles = styled.div`
  .categoryName{
    color: ${(props) =>
    props.theme.theme === themeList.light
      ? "var(--mediumSlateBlue)"
      : "var(--lightBlue_1)"};
    font-size:0.9rem;
    font-weight:bold;
    margin-top:8px;
  }
`;

function Category() {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(url + "/categories", { method: "GET" })
      .then((data) => data.json())
      .then((c) => {
        setCategories(c);
      });
  }, []);

  return (
    <CategoryStles>
      <Container className="my-4 category-container">
        <Row className="col-10 offset-1">
          {categories.map((category) => {
            return (
              <Col className="col-md-3 col-6 my-1" key={category._id}>
                <img
                  src={category.photoURL}
                  alt="outdoors"
                  className="img-fluid"
                />
                <Link to='/event' state={{ category: category.categoryname }}>
                  <p style={{ textAlign: "left" }} className="categoryName">
                    {category.categoryname} &#160;
                    <i className="bi bi-arrow-right"></i>
                  </p>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </CategoryStles>

  );
}

export default Category;
