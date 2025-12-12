import React, { useEffect, useState } from "react";
import jwtAxios from "../../../../apis/util/jwtUtil";
import { useNavigate } from "react-router-dom";
import { BACK_BASIC_URL, IMAGES_S3_URL } from "../../../../apis/commonApis";

import "../../../../css/admin/container/AdminPaymentListContainer.css";
import { useSelector } from "react-redux";
import { formatDate } from "../../../../js/formatDate";
import AdminPagingComponent from "../../../../components/common/AdminPagingComponent"


const AdminPaymentListContainer = () => {
  const [payments, setPayments] = useState([]);
  const [pageData, setPageData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.jwtSlice.accessToken);

  // ✔ page 파라미터 추가한 fetchData
  const fetchData = async (page = 1) => {
    try {
      const res = await jwtAxios.get(
        `${BACK_BASIC_URL}/api/admin/payments?page=${page - 1}&size=10`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setPageData(res.data);
      setPayments(res.data.content);
    } catch (err) {
      console.log("결제 리스트 불러오기 실패", err);
    }
  };

  // ✔ 페이지 클릭 핸들러 추가
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleChangeStatus = async (paymentId, newStatus) => {
    try {
      await jwtAxios.put(
        `${BACK_BASIC_URL}/api/admin/payments/updateStatus/${paymentId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      alert("결제 상태가 변경되었습니다");
      fetchData(currentPage);
    } catch (error) {
      console.log("결제상태 변경 실패", error)
      alert("상태변경 실패");
    }
  };

  // ✔ 최초 1페이지 호출
  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="admin-paymentList">
      <div className="admin-paymentList-con">

        <div className="admin-paymentList-header">
          <h2>결제 리스트</h2>
        </div>

        <div className="admin-paymentList-tableWrapper">
          <table className="admin-paymentList-table">
            <thead>...</thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.paymentId}>
                  <td>{pay.paymentId}</td>
                  <td>{pay.memberId}</td>
                  <td>{pay.paymentReceiver}</td>
                  <td>{pay.paymentType}</td>
                  <td>{formatDate(pay.createTime)}</td>
                  <td>{pay.productPrice.toLocaleString()}원</td>
                  <td>
                    <select
                      value={pay.paymentStatus}
                      onChange={(e) => handleChangeStatus(pay.paymentId, e.target.value)}
                    >
                      <option value="PENDING">결제대기중</option>
                      <option value="DELIVERING">배송중</option>
                      <option value="COMPLETED">배송완료</option>
                      <option value="FAILED">결제실패</option>
                      <option value="CANCELED">결제취소</option>
                      <option value="REFUNDED">환불완료</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/paymentDetail/${pay.paymentId}`)}
                      className="view-btn"
                    >
                      보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✔ 너가 원하는 AdminPagingComponent 그대로 사용 */}
        <AdminPagingComponent
          pageData={pageData}
          onPageChange={handlePageChange}
        />

      </div>
    </div>
  );
};

export default AdminPaymentListContainer;
