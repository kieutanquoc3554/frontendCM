import React, { useState } from "react";
import "./CSS/Q&A.css";

const faqData = [
  {
    question: "Làm thế nào để đăng ký tài khoản?",
    answer:
      "Để đăng ký tài khoản, bạn chỉ cần nhấp vào nút 'Đăng nhập' ở góc trên bên phải và chọn 'Đăng ký' điền thông tin theo yêu cầu.",
  },
  {
    question: "Tôi có thể thanh toán bằng những phương thức nào?",
    answer: "Chúng tôi chấp nhận thanh toán bằng tiền mặt, Paypal, và ZaloPay",
  },
  {
    question: "Làm thế nào để theo dõi đơn hàng của tôi?",
    answer:
      "Sau khi đặt hàng, bạn có thể theo dõi đơn hàng trong mục 'Quản lý đơn hàng' hoặc qua email xác nhận.",
  },
  {
    question: "Có thể hủy đơn hàng không?",
    answer:
      "Bạn có thể hủy đơn hàng trong vòng 24 giờ sau khi đặt hàng bằng cách liên hệ với bộ phận chăm sóc khách hàng.",
  },
  {
    question: "Thời gian giao hàng mất bao lâu?",
    answer:
      "Thời gian giao hàng thường từ 3 đến 5 ngày làm việc, tùy thuộc vào vị trí của bạn.",
  },
  {
    question: "Tôi có thể đổi hoặc trả hàng không?",
    answer:
      "Có, bạn có thể đổi hoặc trả hàng trong vòng 7 ngày kể từ ngày nhận hàng, xin vui lòng kiểm tra chính sách hoàn trả của chúng tôi. Lưu ý, sẽ không được hoàn tiền đối với các giao dịch PAYPAL và ZALOPAY",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Những câu hỏi thường gặp</h1>
      <div>
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 onClick={() => toggleFAQ(index)} className="faq-question">
              {faq.question}
            </h3>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
