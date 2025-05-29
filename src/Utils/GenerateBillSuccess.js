import moment from "moment-timezone";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function GenerateBillSuccess({ orderInfo, paymentMethodName }) {
  const generatePDF = () => {
    const docDefinition = {
      pageSize: "A5",
      content: [
        {
          text: "Hóa Đơn Mua Hàng",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          text: `Cảm ơn bạn vì đã tin dùng và mua sắm sản phẩm của chúng tôi.\n\n`,
          style: "subheader",
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          text: `Thông tin đơn hàng`,
          style: "sectionHeader",
        },
        {
          columns: [
            { text: `Mã đơn hàng: ${orderInfo._id}` },
            {
              text: `Thời gian đặt hàng: ${moment(orderInfo.order_date).format(
                "hh:mm DD/MM/YYYY"
              )}`,
            },
          ],
        },
        {
          text: `Hình thức thanh toán: ${paymentMethodName}`,
          margin: [0, 5, 0, 5],
        },
        paymentMethodName === "Thanh toán bằng tiền mặt"
          ? {
              text: `Số tiền cần thanh toán: ${orderInfo.total}`,
            }
          : {
              text: `Số tiền đã thanh toán: ${orderInfo.total}`,
            },

        {
          text: "Sản phẩm đã đặt:",
          style: "sectionHeader",
          margin: [0, 15, 0, 5],
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                { text: "Tên sản phẩm", style: "tableHeader" },
                { text: "Số lượng", style: "tableHeader" },
                { text: "Giá", style: "tableHeader" },
              ],
              ...orderInfo.orders.map((product) => [
                product.name,
                product.quantity,
                `${product.price.toLocaleString()} VND`,
              ]),
            ],
          },
          layout: "lightHorizontalLines",
          margin: [0, 5, 0, 15],
        },

        { text: "Thông tin giao hàng", style: "sectionHeader" },
        { text: `Tên người nhận: ${orderInfo.name}` },
        { text: `Địa chỉ: ${orderInfo.address}` },
        {
          text:
            `Hộ kinh doanh: 12/8, đường 30 tháng 4, phường Xuân Khánh, Ninh Kiều, Cần Thơ\n` +
            `Địa chỉ sản xuất: 268 Ấp Kinh Hãng A, Khánh Hưng, Trần Văn Thời, Cà Mau\n` +
            `Điện thoại: 0123456789\n` +
            `Thứ 2-6: 8h - 20h; Thứ 7-CN: 9h - 17h`,
          style: "footer",
          alignment: "center",
          margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          margin: [0, 10, 0, 10],
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
        footer: {
          fontSize: 10,
          color: "gray",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(`Order_${orderInfo._id}.pdf`);
  };

  return { generatePDF };
}
