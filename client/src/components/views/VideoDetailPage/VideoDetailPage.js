import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const videoVariable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", videoVariable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오기 실패하였습니다.");
      }
    });
  }, []);

  if (VideoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        {/* 비디오 템플릿 */}
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />
            <List.Item
              avatar={<Avatar src={VideoDetail.writer.image} />}
              title={VideoDetail.writer.name}
              description={VideoDetail.description}
            >
              <List.Item.Meta />
            </List.Item>
          </div>
        </Col>
        {/* 사이드 비디오 템플릿 */}
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...Loading</div>;
  }
}

export default VideoDetailPage;