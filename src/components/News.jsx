import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified = false }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Business",
    count: simplified ? 6 : 24,
  });

  if (isFetching) return <Loader />;

  console.log(cryptoNews.data[0].date);

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news.thumbnail || demoImage}
                  alt={news.title}
                  className=""
                />
              </div>
              <p>
                {news.excerpt > 100
                  ? `${news.excerpt.substring(0, 100)} ...`
                  : news.excerpt}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.publisher?.favicon || demoImage} />
                  <Text className="provider-name">{news.publisher.name}</Text>
                </div>
                <Text>{moment(news.date).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
